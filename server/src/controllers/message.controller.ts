import { Request, Response } from "express";
import prisma from "../lib/prisma";

// ==========================================
// SEND MESSAGE
// ==========================================

export const sendMessage = async (
    req: Request,
    res: Response
) => {
    try {
        const currentUserId = req.user?.userId;

        // Express can type params as string | string[]
        // so we normalize it to a single string.
        const conversationIdParam = req.params.conversationId;

        const conversationId = Array.isArray(conversationIdParam)
            ? conversationIdParam[0]
            : conversationIdParam;

        const { content } = req.body;

        // ------------------------------------------
        // Check authentication
        // ------------------------------------------

        if (!currentUserId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }

        // ------------------------------------------
        // Check conversation ID
        // ------------------------------------------

        if (!conversationId) {
            return res.status(400).json({
                success: false,
                message: "Conversation ID is required",
            });
        }

        // ------------------------------------------
        // Check message content
        // ------------------------------------------

        if (
            typeof content !== "string" ||
            !content.trim()
        ) {
            return res.status(400).json({
                success: false,
                message: "Message cannot be empty",
            });
        }

        // ------------------------------------------
        // Find conversation
        // ------------------------------------------

        const conversation =
            await prisma.conversation.findUnique({
                where: {
                    id: conversationId,
                },
            });

        if (!conversation) {
            return res.status(404).json({
                success: false,
                message: "Conversation not found",
            });
        }

        // ------------------------------------------
        // Check if user belongs to conversation
        // ------------------------------------------

        if (
            conversation.user1Id !== currentUserId &&
            conversation.user2Id !== currentUserId
        ) {
            return res.status(403).json({
                success: false,
                message: "You are not part of this conversation",
            });
        }

        // ------------------------------------------
        // Create message
        // ------------------------------------------

        const message =
            await prisma.message.create({
                data: {
                    conversationId: conversationId,
                    senderId: currentUserId,
                    content: content.trim(),
                },

                include: {
                    sender: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                        },
                    },
                },
            });

        // ------------------------------------------
        // Update conversation timestamp
        // ------------------------------------------

        await prisma.conversation.update({
            where: {
                id: conversationId,
            },

            data: {
                updatedAt: new Date(),
            },
        });

        // ------------------------------------------
        // Response
        // ------------------------------------------

        return res.status(201).json({
            success: true,
            message,
        });

    } catch (error) {
        console.error(
            "Send message error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Failed to send message",
        });
    }
};


// ==========================================
// GET MESSAGES
// ==========================================

export const getMessages = async (
    req: Request,
    res: Response
) => {
    try {
        const currentUserId = req.user?.userId;

        // Express can type params as string | string[]
        // so we normalize it to a single string.
        const conversationIdParam = req.params.conversationId;

        const conversationId = Array.isArray(conversationIdParam)
            ? conversationIdParam[0]
            : conversationIdParam;

        // ------------------------------------------
        // Check authentication
        // ------------------------------------------

        if (!currentUserId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }

        // ------------------------------------------
        // Check conversation ID
        // ------------------------------------------

        if (!conversationId) {
            return res.status(400).json({
                success: false,
                message: "Conversation ID is required",
            });
        }

        // ------------------------------------------
        // Find conversation
        // ------------------------------------------

        const conversation =
            await prisma.conversation.findUnique({
                where: {
                    id: conversationId,
                },
            });

        if (!conversation) {
            return res.status(404).json({
                success: false,
                message: "Conversation not found",
            });
        }

        // ------------------------------------------
        // Check if user belongs to conversation
        // ------------------------------------------

        if (
            conversation.user1Id !== currentUserId &&
            conversation.user2Id !== currentUserId
        ) {
            return res.status(403).json({
                success: false,
                message: "You are not part of this conversation",
            });
        }

        // ------------------------------------------
        // Get messages
        // ------------------------------------------

        const messages =
            await prisma.message.findMany({
                where: {
                    conversationId: conversationId,
                },

                include: {
                    sender: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                        },
                    },
                },

                orderBy: {
                    createdAt: "asc",
                },
            });

        // ------------------------------------------
        // Response
        // ------------------------------------------

        return res.status(200).json({
            success: true,
            messages,
        });

    } catch (error) {
        console.error(
            "Get messages error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Failed to fetch messages",
        });
    }
};