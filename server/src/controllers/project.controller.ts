import { Request, Response } from "express";
import prisma from "../lib/prisma";

// Create Project
export const createProject = async (req: Request, res: Response) => {
    try {
        const { name, description } = req.body;

        const userId = (req as any).user.userId;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Project name is required",
            });
        }

        const project = await prisma.project.create({
            data: {
                name,
                description,
                ownerId: userId,
            },
        });

        return res.status(201).json({
            success: true,
            message: "Project created successfully",
            project,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Failed to create project",
        });
    }
};

// Get My Projects
export const getProjects = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.userId;

        const projects = await prisma.project.findMany({
            where: {
                ownerId: userId,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return res.status(200).json({
            success: true,
            projects,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch projects",
        });
    }
};