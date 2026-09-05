import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

declare global {
    namespace Express {
        interface Request {
            user?: {
                userId: string;
            };
        }
    }
}

export const authenticate = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Access token required",
            });
        }

        const token = authHeader.slice(7);

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET as string
        ) as {
            userId: string;
        };

        req.user = decoded;

        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token",
        });
    }
};