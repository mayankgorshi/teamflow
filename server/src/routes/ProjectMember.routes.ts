import { Router } from "express";

import {
    addMember,
    getMembers,
    removeMember,
} from "../controllers/ProjectMember.controller";

import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.post(
    "/:projectId/members",
    authenticate,
    addMember
);

router.get(
    "/:projectId/members",
    authenticate,
    getMembers
);

router.delete(
    "/:projectId/members/:userId",
    authenticate,
    removeMember
);
export default router;