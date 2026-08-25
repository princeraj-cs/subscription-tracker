import { Timestamp } from "mongodb";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String, 
        require: [true, "Username is required"],
        trim: true,
        minLength: 2,
        maxLength: 50,
    },
    email: {
        type: String, 
        require: [true, "Username is required"],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, "Please use a valid email address"],
    },
    password: {
        type: String,
        require: [true, "User password is required"],
        minLength: 6,
    }
}, { timestamps: true })

const User = mongoose.model("User", userSchema)

export default User;