import { Request, Response } from "express";
import prisma from "../lib/prisma";


// ==========================================
// CREATE / GET CONVERSATION
// ==========================================

export const createConversation = async (
    req: Request,
    res: Response
) => {   try {
        const currentUserId = req.user?.userId;
        const { userId } = req.body;

        if (!currentUserId) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }

        if (!userId) {
            return res.status(400).json({
                message: "User ID is required",
            });
        }

        // Can't chat with yourself
        if (currentUserId === userId) {
            return res.status(400).json({
                message: "You cannot start a conversation with yourself",
            });
        }

        // Check target user exists
        const targetUser = await prisma.user.findUnique({
            where: {
                id: userId,
            },
            select: {
                id: true,
                name: true,
                email: true,
            },
        });

        if (!targetUser) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        // Normalize user IDs
        // This ensures:
        // Veer -> Rahul
        // Rahul -> Veer
        // become the same conversation.

        const [user1Id, user2Id] =
            currentUserId < userId
                ? [currentUserId, userId]
                : [userId, currentUserId];

        // Check if conversation already exists
        const existingConversation =
            await prisma.conversation.findUnique({
                where: {
                    user1Id_user2Id: {
                        user1Id,
                        user2Id,
                    },
                },

                include: {
                    user1: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                        },
                    },

                    user2: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                        },
                    },
                },
            });

        if (existingConversation) {
            return res.status(200).json({
                success: true,
                conversation: existingConversation,
            });
        }

        // Create new conversation
        const conversation =
            await prisma.conversation.create({
                data: {
                    user1Id,
                    user2Id,
                },

                include: {
                    user1: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                        },
                    },

                    user2: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                        },
                    },
                },
            });

        return res.status(201).json({
            success: true,
            conversation,
        });

    } catch (error) {
        console.error(
            "Create conversation error:",
            error
        );

        return res.status(500).json({
            message: "Failed to create conversation",
        });
    }
};


// ==========================================
// GET MY CONVERSATIONS
// ==========================================

export const getConversations = async (
    req: Request,
    res: Response
) => {
    try {
        const currentUserId = req.user?.userId;

        if (!currentUserId) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }

        const conversations =
            await prisma.conversation.findMany({
                where: {
                    OR: [
                        {
                            user1Id: currentUserId,
                        },
                        {
                            user2Id: currentUserId,
                        },
                    ],
                },

                include: {
                    user1: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                        },
                    },

                    user2: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                        },
                    },

                    messages: {
                        orderBy: {
                            createdAt: "desc",
                        },

                        take: 1,

                        select: {
                            id: true,
                            content: true,
                            senderId: true,
                            createdAt: true,
                        },
                    },
                },

                orderBy: {
                    updatedAt: "desc",
                },
            });

        return res.status(200).json({
            success: true,
            conversations,
        });

    } catch (error) {
        console.error(
            "Get conversations error:",
            error
        );

        return res.status(500).json({
            message: "Failed to fetch conversations",
        });
    }
};