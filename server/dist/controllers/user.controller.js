"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfile = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const getProfile = async (req, res) => {
    try {
        const userId = req.user.userId;
        const user = await prisma_1.default.user.findUnique({
            where: {
                id: userId,
            },
            select: {
                id: true,
                name: true,
                email: true,
            },
        });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        return res.status(200).json({
            success: true,
            user,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
};
exports.getProfile = getProfile;
//# sourceMappingURL=user.controller.js.map