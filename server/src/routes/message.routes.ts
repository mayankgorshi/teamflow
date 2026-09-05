import { Router } from "express";

import {
    sendMessage,
    getMessages,
} from "../controllers/message.controller";

import { authenticate } from "../middleware/auth.middleware";

const router = Router();


// Send message
router.post(
    "/:conversationId",
    authenticate,
    sendMessage
);


// Get messages
router.get(
    "/:conversationId",
    authenticate,
    getMessages
);


export default router;