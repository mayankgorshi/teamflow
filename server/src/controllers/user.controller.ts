import { Request, Response } from "express";
import prisma from "../lib/prisma";

export const getProfile = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.userId;

        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
            select: {
                id: true,
                name: true,
                email: true,
            },
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        return res.status(200).json({
            success: true,
            user,
        });
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
};

export const searchUsers = async (
    req: Request,
    res: Response
) => {
    try {
        const q = String(req.query.q || "").trim();

        if (!q) {
            return res.status(200).json([]);
        }

        const users = await prisma.user.findMany({
            where: {
                OR: [
                    {
                        name: {
                            contains: q,
                            mode: "insensitive",
                        },
                    },
                    {
                        email: {
                            contains: q,
                            mode: "insensitive",
                        },
                    },
                ],
            },

            select: {
                id: true,
                name: true,
                email: true,
            },

            take: 10,
        });

        return res.status(200).json(users);
    } catch (error) {
        console.error("Search users error:", error);

        return res.status(500).json({
            message: "Failed to search users",
        });
    }
};