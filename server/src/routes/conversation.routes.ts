import { Router } from "express";

import {
    createConversation,
    getConversations,
} from "../controllers/conversation.controller";

import { authenticate } from "../middleware/auth.middleware";

const router = Router();


// Create or get conversation
router.post(
    "/",
    authenticate,
    createConversation
);


// Get my conversations
router.get(
    "/",
    authenticate,
    getConversations
);


export default router;