import { Request, Response } from "express";
import prisma from "../lib/prisma";


// -----------------------------
// Types
// -----------------------------

type ProjectParams = {
    projectId: string;
    userId: string;
};

type AddMemberBody = {
    email: string;
};

type AuthenticatedRequest = Request<
    ProjectParams,
    any,
    AddMemberBody
> & {
    user?: {
        userId: string;
    };
};


// -----------------------------
// Add Member
// -----------------------------

export const addMember = async (
    req: AuthenticatedRequest,
    res: Response
) => {
    try {
        const { projectId } = req.params;
        const { email } = req.body;

        // Check authentication
        const userId = req.user?.userId;

        if (!userId) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }

        // Check email
        if (!email) {
            return res.status(400).json({
                message: "Email is required",
            });
        }


        // -----------------------------
        // Check project
        // -----------------------------

        const project = await prisma.project.findUnique({
            where: {
                id: projectId,
            },
        });

        if (!project) {
            return res.status(404).json({
                message: "Project not found",
            });
        }


        // -----------------------------
        // Only project owner can add members
        // -----------------------------

        if (project.ownerId !== userId) {
            return res.status(403).json({
                message: "Only the project owner can add members",
            });
        }


        // -----------------------------
        // Find user by email
        // -----------------------------

        const member = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (!member) {
            return res.status(404).json({
                message: "User not found",
            });
        }


        // -----------------------------
        // Don't add project owner
        // -----------------------------

        if (member.id === project.ownerId) {
            return res.status(400).json({
                message: "Project owner is already part of the project",
            });
        }


        // -----------------------------
        // Check existing membership
        // -----------------------------

        const existingMember = await prisma.projectMember.findFirst({
            where: {
                projectId: projectId,
                userId: member.id,
            },
        });

        if (existingMember) {
            return res.status(409).json({
                message: "User is already a member",
            });
        }


        // -----------------------------
        // Add member
        // -----------------------------

        const newMember = await prisma.projectMember.create({
            data: {
                projectId: projectId,
                userId: member.id,
            },
        });


        // -----------------------------
        // Response
        // -----------------------------

        return res.status(201).json({
            message: "Member added successfully",
            member: newMember,
        });

    } catch (error) {
        console.error("Add member error:", error);

        return res.status(500).json({
            message: "Something went wrong",
        });
    }
};
export const getMembers = async (
    req: Request<{ projectId: string }>,
    res: Response
) => {
    try {
        const { projectId } = req.params;

        const project = await prisma.project.findUnique({
            where: {
                id: projectId,
            },
            include: {
                owner: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
        });

        if (!project) {
            return res.status(404).json({
                message: "Project not found",
            });
        }

        const members = await prisma.projectMember.findMany({
            where: {
                projectId,
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
        });

        const team = [
            {
                id: `owner-${project.owner.id}`,
                user: project.owner,
                role: "OWNER",
            },
            ...members.map((member) => ({
                id: member.id,
                user: member.user,
                role: "MEMBER",
            })),
        ];

        return res.status(200).json({
            success: true,
            members: team,
        });

    } catch (error) {
        console.error("Get members error:", error);

        return res.status(500).json({
            message: "Something went wrong",
        });
    }
};
export const removeMember = async (
    req: AuthenticatedRequest,
    res: Response
) => {
    try {
        const { projectId, userId } = req.params;

        const ownerId = req.user?.userId;

        if (!ownerId) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }

        const project = await prisma.project.findUnique({
            where: {
                id: projectId,
            },
        });

        if (!project) {
            return res.status(404).json({
                message: "Project not found",
            });
        }

        // Only project owner can remove members
        if (project.ownerId !== ownerId) {
            return res.status(403).json({
                message: "Only the project owner can remove members",
            });
        }

        // Owner cannot remove themselves
        if (userId === project.ownerId) {
            return res.status(400).json({
                message: "Project owner cannot be removed",
            });
        }

        const member = await prisma.projectMember.findFirst({
            where: {
                projectId,
                userId,
            },
        });

        if (!member) {
            return res.status(404).json({
                message: "Member not found",
            });
        }

        await prisma.projectMember.delete({
            where: {
                id: member.id,
            },
        });

        return res.status(200).json({
            success: true,
            message: "Member removed successfully",
        });
    } catch (error) {
        console.error("Remove member error:", error);

        return res.status(500).json({
            message: "Something went wrong",
        });
    }
};