import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Subscription name is required"],
      trim: true,
      minLength: 2,
      maxLength: 100,
    },
    price: {
      type: Number,
      required: [true, "Subscription price is required"],
      min: [0, "Subscription price must be a positive number"],
    },
    currency: {
      type: String,
      enum: ["USD", "EUR", "GBP", "JPY", "AUD"],
      default: "USD",
    },
    frequency: {
      type: String,
      enum: ["daily", "weekly", "monthly", "yearly"],
      required: [true, "Subscription frequency is required"],
    },
    category: {
      type: String,
      enum: ["entertainment", "productivity", "education", "health", "other"],
      required: [true, "Subscription category is required"],
    },
    paymentMethod: {
      type: String,
      required: [true, "Payment method is required"],
      trim: true,
    },
    status: {
      type: String,
      enum: ["active", "expired", "canceled"],
      default: "active",
    },
    startDate: {
      type: Date,
      required: [true, "Subscription start date is required"],
      validate: {
        validator: (value) => new Date(value) <= new Date(Date.now() + 86400000),
        message: "Subscription start date cannot be in the distant future",
      },
    },
    renewalDate: {
      type: Date,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Subscription must be associated with a user"],
      index: true,
    },
  },
  { timestamps: true },
);

// Auto-calculate the renewal date if missing based on the frequency and start date
subscriptionSchema.pre("save", function (next) {
  if (!this.renewalDate) {
    const renewalPeriod = {
      daily: 1,
      weekly: 7,
      monthly: 30,
      yearly: 365,
    };

    const daysToAdd = renewalPeriod[this.frequency] || 30;
    this.renewalDate = new Date(this.startDate);
    this.renewalDate.setDate(this.renewalDate.getDate() + daysToAdd);
  }

  // Auto-update the status if the renewal date has passed
  if (this.renewalDate < new Date()) {
    this.status = "expired";
  }

  if (typeof next === "function") next();
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;
