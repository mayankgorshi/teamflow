import app from "./app";
import { createServer } from "http";
import { Server } from "socket.io";

const PORT = 5000;

const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:5173",
        credentials: true,
    },
});

io.on("connection", (socket) => {
    console.log("🟢 User connected:", socket.id);

    socket.on("join-project", (projectId: string) => {
        socket.join(`project:${projectId}`);

        console.log(
            `👥 ${socket.id} joined project:${projectId}`
        );
    });

    socket.on(
        "send-message",
        ({ projectId, message, user }) => {
            io.to(`project:${projectId}`).emit("receive-message", {
                id: Date.now().toString(),
                message,
                user,
                createdAt: new Date(),
            });
        }
    );

    socket.on("disconnect", () => {
        console.log("🔴 User disconnected:", socket.id);
    });
});

httpServer.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`🔌 Socket.IO running`);
});