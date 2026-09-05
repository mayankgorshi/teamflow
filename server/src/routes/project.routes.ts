import { Router } from "express";
import {
    createProject,
    getProjects,
} from "../controllers/project.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.post("/", authenticate, createProject);

router.get("/", authenticate, getProjects);

export default router;