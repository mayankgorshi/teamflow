import { Request, Response } from "express";
import prisma from "../lib/prisma";

// Create Task
export const createTask = async (req: Request, res: Response) => {
    try {
        const { title, description, projectId } = req.body;

        const userId = (req as any).user.userId;

        if (!title || !projectId) {
            return res.status(400).json({
                success: false,
                message: "Title and projectId are required",
            });
        }

        // Make sure the project belongs to the logged-in user
        const project = await prisma.project.findFirst({
            where: {
                id: projectId,
                ownerId: userId,
            },
        });

        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found",
            });
        }

        const task = await prisma.task.create({
            data: {
                title,
                description,
                projectId,
            },
        });

        return res.status(201).json({
            success: true,
            message: "Task created successfully",
            task,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Failed to create task",
        });
    }
};


// Get Tasks for a Project
export const getTasks = async (req: Request, res: Response) => {
    try {
        const projectId = Array.isArray(req.params.projectId)
            ? req.params.projectId[0]
            : req.params.projectId;

        if (!projectId) {
            return res.status(400).json({
                success: false,
                message: "Project ID is required",
            });
        }

        const userId = (req as any).user.userId;

        // Make sure project belongs to logged-in user
        const project = await prisma.project.findFirst({
            where: {
                id: projectId,
                ownerId: userId,
            },
        });

        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found",
            });
        }

        const tasks = await prisma.task.findMany({
            where: {
                projectId,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return res.status(200).json({
            success: true,
            tasks,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch tasks",
        });
    }
};


// Toggle Task
export const toggleTask = async (req: Request, res: Response) => {
    try {
        const taskId = Array.isArray(req.params.taskId)
            ? req.params.taskId[0]
            : req.params.taskId;

        if (!taskId) {
            return res.status(400).json({
                success: false,
                message: "Task ID is required",
            });
        }

        const userId = (req as any).user.userId;

        const task = await prisma.task.findUnique({
            where: {
                id: taskId,
            },
            include: {
                project: true,
            },
        });

        if (!task || task.project.ownerId !== userId) {
            return res.status(404).json({
                success: false,
                message: "Task not found",
            });
        }

        const updatedTask = await prisma.task.update({
            where: {
                id: taskId,
            },
            data: {
                completed: !task.completed,
            },
        });

        return res.status(200).json({
            success: true,
            message: "Task updated successfully",
            task: updatedTask,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Failed to update task",
        });
    }
};


// Delete Task
export const deleteTask = async (req: Request, res: Response) => {
    try {
        const taskId = Array.isArray(req.params.taskId)
            ? req.params.taskId[0]
            : req.params.taskId;

        if (!taskId) {
            return res.status(400).json({
                success: false,
                message: "Task ID is required",
            });
        }
        const userId = (req as any).user.userId;

        const task = await prisma.task.findUnique({
            where: {
                id: taskId,
            },
            include: {
                project: true,
            },
        });

        if (!task || task.project.ownerId !== userId) {
            return res.status(404).json({
                success: false,
                message: "Task not found",
            });
        }

        await prisma.task.delete({
            where: {
                id: taskId,
            },
        });

        return res.status(200).json({
            success: true,
            message: "Task deleted successfully",
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Failed to delete task",
        });
    }
};