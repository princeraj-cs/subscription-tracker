import mongoose from "mongoose";

import { DB_URI, NODE_ENV } from "../config/env.js";

if (!DB_URI) {
  throw new Error(
    "Please define the MONGODB_URI envoirnment variable inside .env<development/production>.local",
  );
}

const connectToDatabase = async () => {
  await mongoose.connect(DB_URI, {
    serverSelectionTimeoutMS: 10000,
  });
  console.log(`Connected to database in ${NODE_ENV} mode`);
};

export default connectToDatabase;
