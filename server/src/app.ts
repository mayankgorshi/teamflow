import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import projectRoutes from "./routes/project.routes";
import taskRoutes from "./routes/task.routes"
import projectMemberRoutes from "./routes/ProjectMember.routes";
import conversationRoutes from "./routes/conversation.routes";
import messageRoutes from "./routes/message.routes"

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/project-members", projectMemberRoutes);
app.use("/api/conversations", conversationRoutes);
app.use(
    "/api/messages",
    messageRoutes
);

export default app;