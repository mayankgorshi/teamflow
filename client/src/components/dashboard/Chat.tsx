import { useEffect, useState } from "react";
import { socket } from "../../socket/socket";
import { useAuth } from "../../context/AuthContext";

type Message = {
    id: string;
    message: string;
    user: {
        id: string;
        name: string;
    };
    createdAt: string;
};

type ChatProps = {
    projectId: string;
};

function Chat({ projectId }: ChatProps) {
    const { user } = useAuth();

    const [messages, setMessages] = useState<Message[]>([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (!projectId) return;

        if (!socket.connected) {
            socket.connect();
        }

        socket.emit("join-project", projectId);

        const handleMessage = (newMessage: Message) => {
            setMessages((previousMessages) => [
                ...previousMessages,
                newMessage,
            ]);
        };

        socket.on("receive-message", handleMessage);

        return () => {
            socket.off("receive-message", handleMessage);
        };
    }, [projectId]);

    const handleSendMessage = () => {
        if (!message.trim() || !user || !projectId) {
            return;
        }

        socket.emit("send-message", {
            projectId,
            message: message.trim(),
            user: {
                id: user.id,
                name: user.name,
            },
        });

        setMessage("");
    };

    const handleKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (e.key === "Enter") {
            handleSendMessage();
        }
    };

    return (
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">

            {/* Header */}
            <div className="border-b border-gray-200 p-5">
                <h2 className="text-lg font-semibold text-gray-900">
                    Team Chat 💬
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                    Communicate with your team in real time.
                </p>
            </div>

            {/* Messages */}
            <div className="h-80 space-y-3 overflow-y-auto p-5">

                {messages.length === 0 ? (
                    <div className="flex h-full items-center justify-center">
                        <p className="text-sm text-gray-400">
                            No messages yet. Start the conversation!
                        </p>
                    </div>
                ) : (
                    messages.map((item) => {
                        const isMine =
                            item.user.id === user?.id;

                        return (
                            <div
                                key={item.id}
                                className={`flex ${
                                    isMine
                                        ? "justify-end"
                                        : "justify-start"
                                }`}
                            >
                                <div
                                    className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                                        isMine
                                            ? "bg-blue-600 text-white"
                                            : "bg-gray-100 text-gray-900"
                                    }`}
                                >
                                    {!isMine && (
                                        <p className="mb-1 text-xs font-semibold">
                                            {item.user.name}
                                        </p>
                                    )}

                                    <p className="text-sm">
                                        {item.message}
                                    </p>

                                    <p
                                        className={`mt-1 text-[10px] ${
                                            isMine
                                                ? "text-blue-100"
                                                : "text-gray-400"
                                        }`}
                                    >
                                        {new Date(
                                            item.createdAt
                                        ).toLocaleTimeString([], {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </p>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {/* Input */}
            <div className="border-t border-gray-200 p-4">
                <div className="flex gap-3">
                    <input
                        type="text"
                        value={message}
                        onChange={(e) =>
                            setMessage(e.target.value)
                        }
                        onKeyDown={handleKeyDown}
                        placeholder="Type a message..."
                        className="min-w-0 flex-1 rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500"
                    />

                    <button
                        type="button"
                        onClick={handleSendMessage}
                        className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Chat;