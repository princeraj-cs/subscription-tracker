import mongoose from "mongoose"
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/env.js";

//  Signup 
export const signUp = async (req, res, next) => {
    // Implement sign up logic here
    const session = await mongoose.startSession();
    session.startTransaction(); 

    try {
        // Login to create new user
        const { name, email, password } = req.body;

        // Checking if the user already exists
        const existingUser = await User.findOne( { email });
        
        if (existingUser) {
            const error = new Error("User already exists");
            error.statusCode = 409; // It means already exist
            throw error;
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt); 

        const newUsers = await User.create([{ name, email, password: hashedPassword }], { session });
        const token = jwt.sign({ userId: newUsers[0]._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({
            success: true,
            message: "User created successfully",
            data: {
                token,
                user: newUsers[0]
            }
        })

    } catch (error) {

        // If something gone worng dont to anything abort that transaction
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
}

// Signin
export const signIn = async (req, res, next) => {
    // Implement sign in logic here

    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email })

        if (!user) {
            const error = new Error("User not found")
            error.statusCode = 404; // Not found
            throw error
        }
        
        const isPasswordValid = await bcrypt.compare(password, user.password);
        
        if (!isPasswordValid) {
            const error = new Error("Invalid Password")
            error.statusCode = 401; // Unathorized
            throw error
        }

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

        res.status(200).json({
          success: true,
          message: "User signed in successfully",
          data: {
            token,
            user,
          },
        });

    } catch (error) {
        next(error);
    }
}

export const signOut = async (req, res, next) => {
    // Implement sign out logic here
}