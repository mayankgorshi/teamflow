import { Router } from "express";
import { getProfile } from "../controllers/user.controller";
import { authenticate } from "../middleware/auth.middleware";
import { searchUsers } from "../controllers/user.controller";

const router = Router();

router.get("/profile", authenticate, getProfile);
router.get("/search", authenticate, searchUsers);

export default router;