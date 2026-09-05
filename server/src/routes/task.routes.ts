import { Router } from "express";

import {
    createTask,
    getTasks,
    toggleTask,
    deleteTask,
} from "../controllers/Task.Controller";

import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.post("/", authenticate, createTask);

router.get("/project/:projectId", authenticate, getTasks);

router.patch("/:taskId/toggle", authenticate, toggleTask);

router.delete("/:taskId", authenticate, deleteTask);

export default router;