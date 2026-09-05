"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = __importDefault(require("../lib/prisma"));
const register = async (req, res) => {
    try {
        // Step 1: Get data from request
        const { name, email, password } = req.body;
        // Step 2: Check if email already exists
        const existingUser = await prisma_1.default.user.findUnique({
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
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        // Step 5: Create user
        const user = await prisma_1.default.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });
        // Step 6: Create JWT
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "7d" });
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
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await prisma_1.default.user.findUnique({
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
        const passwordMatch = await bcrypt_1.default.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "7d" });
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
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
};
exports.login = login;
//# sourceMappingURL=auth.controller.js.map