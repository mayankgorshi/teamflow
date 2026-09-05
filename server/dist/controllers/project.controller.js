"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProjects = exports.createProject = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const createProject = async (req, res) => {
    try {
        const { name, description } = req.body;
        const userId = req.user.userId;
        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Project name is required",
            });
        }
        const project = await prisma_1.default.project.create({
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
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to create project",
        });
    }
};
exports.createProject = createProject;
const getProjects = async (req, res) => {
    try {
        const userId = req.user.userId;
        const projects = await prisma_1.default.project.findMany({
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
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch projects",
        });
    }
};
exports.getProjects = getProjects;
//# sourceMappingURL=project.controller.js.map