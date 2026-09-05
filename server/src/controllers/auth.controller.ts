import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import prisma from "../lib/prisma";

export const register = async (req: Request, res: Response) => {
    try {
        // Step 1: Get data from request
        const { name, email, password } = req.body;

        // Step 2: Check if email already exists
        const existingUser = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        // Step 3: If user exists, stop registration
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "Email already exists",
            });
        }

        // Step 4: Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Step 5: Create user
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });

        // Step 6: Create JWT
        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET as string,
            { expiresIn: "7d" }
        );

        // Step 7: Send user + token
        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
};


export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET as string,
            { expiresIn: "7d" }
        );

        return res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
};