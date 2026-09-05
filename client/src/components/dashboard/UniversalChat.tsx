import {
    useEffect,
    useRef,
    useState,
} from "react";

import {
    useLocation,
    useNavigate,
} from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import {
    searchUsers,
    type User,
} from "../../api/userApi";

import {
    createConversation,
    getConversations,
} from "../../api/conversationApi";

import {
    getMessages,
    sendMessage,
} from "../../api/messageApi";


// ======================================================
// TYPES
// ======================================================

type Message = {
    id: string;
    content: string;
    senderId: string;
    createdAt: string;
    sender: User;
};

type Conversation = {
    id: string;
    user1Id: string;
    user2Id: string;
    user1: User;
    user2: User;
    messages: Message[];
    updatedAt: string;
};


// ======================================================
// ICONS
// ======================================================

function SearchIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
        >
            <circle cx="11" cy="11" r="7" />
            <path d="m21 21-4.3-4.3" />
        </svg>
    );
}

function ChatBubbleIcon({ className = "h-7 w-7" }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M5 5.5H19C19.83 5.5 20.5 6.17 20.5 7V15C20.5 15.83 19.83 16.5 19 16.5H11L7 19.5V16.5H5C4.17 16.5 3.5 15.83 3.5 15V7C3.5 6.17 4.17 5.5 5 5.5Z" />
        </svg>
    );
}

function BackIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
        >
            <path d="m15 18-6-6 6-6" />
        </svg>
    );
}

function PlusIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
        >
            <path d="M12 5v14" />
            <path d="M5 12h14" />
        </svg>
    );
}

function SendIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
        >
            <path d="m22 2-7 20-4-9-9-4Z" />
            <path d="M22 2 11 13" />
        </svg>
    );
}

function SpinnerIcon({ className = "h-4 w-4" }: { className?: string }) {
    return (
        <svg className={`animate-spin ${className}`} viewBox="0 0 24 24" fill="none">
            <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
            />
            <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
        </svg>
    );
}


// ======================================================
// COMPONENT
// ======================================================

function UniversalChat() {

    const { user } = useAuth();

    const location = useLocation();
    const navigate = useNavigate();

    // ==================================================
    // SEARCH
    // ==================================================

    const [search, setSearch] = useState("");

    const [users, setUsers] =
        useState<User[]>([]);

    const [loadingUsers, setLoadingUsers] =
        useState(false);


    // ==================================================
    // CONVERSATIONS
    // ==================================================

    const [conversations, setConversations] =
        useState<Conversation[]>([]);

    const [loadingConversations, setLoadingConversations] =
        useState(true);


    // ==================================================
    // ACTIVE CHAT
    // ==================================================

    const [selectedUser, setSelectedUser] =
        useState<User | null>(null);

    const [conversationId, setConversationId] =
        useState<string | null>(null);

    const [messages, setMessages] =
        useState<Message[]>([]);

    const [loadingMessages, setLoadingMessages] =
        useState(false);


    // ==================================================
    // MESSAGE COMPOSER
    // ==================================================

    const [message, setMessage] =
        useState("");

    const [sending, setSending] =
        useState(false);


    // ==================================================
    // MOBILE CHAT STATE
    // ==================================================

    const [showChat, setShowChat] =
        useState(false);


    // ==================================================
    // MESSAGE SCROLL
    // ==================================================

    const messagesEndRef =
        useRef<HTMLDivElement | null>(null);


    // ==================================================
    // LOAD CONVERSATIONS
    // ==================================================

    const loadConversations = async () => {

        try {

            setLoadingConversations(true);

            const data =
                await getConversations();

            setConversations(
                data.conversations || []
            );

        } catch (error) {

            console.error(
                "Failed to load conversations:",
                error
            );

        } finally {

            setLoadingConversations(false);

        }

    };


    // ==================================================
    // INITIAL CONVERSATIONS
    // ==================================================

    useEffect(() => {

        if (!user) {
            return;
        }

        loadConversations();

    }, [user]);


    // ==================================================
    // SEARCH USERS
    // ==================================================

    useEffect(() => {

        if (!search.trim()) {

            setUsers([]);

            return;

        }


        const timer =
            setTimeout(async () => {

                try {

                    setLoadingUsers(true);

                    const results =
                        await searchUsers(
                            search.trim()
                        );


                    const filteredUsers =
                        results.filter(
                            (item) =>
                                item.id !== user?.id
                        );


                    setUsers(filteredUsers);

                } catch (error) {

                    console.error(
                        "Search users error:",
                        error
                    );

                    setUsers([]);

                } finally {

                    setLoadingUsers(false);

                }

            }, 400);


        return () =>
            clearTimeout(timer);

    }, [search, user?.id]);


    // ==================================================
    // AUTO SCROLL TO LATEST MESSAGE
    // ==================================================

    useEffect(() => {

        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth",
        });

    }, [messages]);


    // ==================================================
    // GET OTHER USER
    // ==================================================

    const getOtherUser = (
        conversation: Conversation
    ): User | null => {

        if (!user) {
            return null;
        }

        if (
            conversation.user1Id ===
            user.id
        ) {

            return conversation.user2;

        }

        return conversation.user1;

    };


    // ==================================================
    // GET INITIAL
    // ==================================================

    const getInitial = (
        name: string
    ) => {

        return (
            name
                ?.charAt(0)
                .toUpperCase() || "U"
        );

    };


    // ==================================================
    // OPEN CONVERSATION
    // ==================================================

    const openConversation = async (
        selected: User,
        existingConversationId?: string
    ) => {

        if (
            !user ||
            selected.id === user.id
        ) {

            return;

        }


        try {

            setSelectedUser(selected);

            setMessages([]);

            setMessage("");

            setLoadingMessages(true);

            setShowChat(true);


            let id =
                existingConversationId;


            // ------------------------------------------
            // CREATE CONVERSATION IF NEEDED
            // ------------------------------------------

            if (!id) {

                const data =
                    await createConversation(
                        selected.id
                    );

                id =
                    data.conversation.id;

                await loadConversations();

            }


            // ------------------------------------------
            // SAFETY CHECK
            // ------------------------------------------

            if (!id) {

                console.error(
                    "Conversation ID was not returned."
                );

                return;

            }


            setConversationId(id);


            // ------------------------------------------
            // LOAD MESSAGES
            // ------------------------------------------

            const data =
                await getMessages(id);


            setMessages(
                data.messages || []
            );

        } catch (error) {

            console.error(
                "Failed to open conversation:",
                error
            );

        } finally {

            setLoadingMessages(false);

        }

    };


    // ==================================================
    // OPEN USER FROM PROJECT TEAM
    // ==================================================

    useEffect(() => {

        const openUser =
            location.state?.openUser;


        if (!openUser || !user) {
            return;
        }


        if (openUser.id === user.id) {

            navigate(
                location.pathname,
                {
                    replace: true,
                    state: {},
                }
            );

            return;

        }


        openConversation(openUser);


        navigate(
            location.pathname,
            {
                replace: true,
                state: {},
            }
        );

    }, [
        location.state,
        user,
    ]);


    // ==================================================
    // EXISTING CONVERSATION CLICK
    // ==================================================

    const handleConversationClick = (
        conversation: Conversation
    ) => {

        const otherUser =
            getOtherUser(conversation);


        if (!otherUser) {
            return;
        }


        openConversation(
            otherUser,
            conversation.id
        );

    };


    // ==================================================
    // SEARCH USER CLICK
    // ==================================================

    const handleSearchUserClick = (
        selected: User
    ) => {

        setSearch("");

        setUsers([]);

        openConversation(selected);

    };


    // ==================================================
    // BACK TO CONVERSATIONS
    // ==================================================

    const handleBackToConversations = () => {

        setShowChat(false);

    };


    // ==================================================
    // SEND MESSAGE
    // ==================================================

    const handleSendMessage = async () => {

        if (
            !message.trim() ||
            !conversationId ||
            sending
        ) {

            return;

        }


        try {

            setSending(true);


            const data =
                await sendMessage(
                    conversationId,
                    message.trim()
                );


            setMessages((previous) => [

                ...previous,

                data.message,

            ]);


            setMessage("");


            await loadConversations();

        } catch (error) {

            console.error(
                "Failed to send message:",
                error
            );

        } finally {

            setSending(false);

        }

    };


    // ==================================================
    // ENTER TO SEND
    // ==================================================

    const handleKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement>
    ) => {

        if (e.key === "Enter") {

            e.preventDefault();

            handleSendMessage();

        }

    };


    // ==================================================
    // FORMAT TIME
    // ==================================================

    const formatTime = (
        date: string
    ) => {

        return new Date(
            date
        ).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        });

    };


    // ==================================================
    // UI
    // ==================================================

    return (

        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

            <div className="grid h-[calc(100vh-190px)] min-h-[620px] lg:grid-cols-[340px_1fr]">


                {/* ==================================================
                    CONVERSATION SIDEBAR
                ================================================== */}

                <aside
                    className={`flex min-h-0 flex-col border-r border-gray-200 ${showChat
                        ? "hidden lg:flex"
                        : "flex"
                        }`}
                >


                    {/* ==================================================
                        SIDEBAR HEADER
                    ================================================== */}

                    <div className="px-5 pb-4 pt-5">

                        <div className="flex items-center justify-between">

                            <h2 className="text-xl font-semibold tracking-tight text-gray-900">
                                Chats
                            </h2>

                        </div>


                        {/* Search */}

                        <div className="relative mt-5">

                            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                <SearchIcon />
                            </span>

                            <input
                                type="text"
                                value={search}
                                onChange={(e) =>
                                    setSearch(
                                        e.target.value
                                    )
                                }
                                placeholder="Search"
                                className="w-full rounded-xl bg-gray-100 py-2.5 pl-9 pr-4 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:bg-gray-50 focus:ring-1 focus:ring-gray-200"
                            />

                        </div>

                    </div>


                    {/* ==================================================
                        SEARCH RESULTS
                    ================================================== */}

                    {search.trim() && (

                        <div className="border-b border-gray-100 px-3 pb-3">

                            <p className="px-2 pb-2 text-xs font-semibold text-gray-400">
                                Search results
                            </p>


                            {loadingUsers ? (

                                <div className="px-3 py-4 text-sm text-gray-400">
                                    Searching...
                                </div>

                            ) : users.length === 0 ? (

                                <div className="px-3 py-4 text-sm text-gray-400">
                                    No users found.
                                </div>

                            ) : (

                                <div className="space-y-1">

                                    {users.map(
                                        (item) => (

                                            <button
                                                key={
                                                    item.id
                                                }
                                                type="button"
                                                onClick={() =>
                                                    handleSearchUserClick(
                                                        item
                                                    )
                                                }
                                                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition hover:bg-gray-50"
                                            >

                                                {/* Avatar */}

                                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-700 text-sm font-semibold text-white shadow-sm">

                                                    {getInitial(
                                                        item.name
                                                    )}

                                                </div>


                                                <div className="min-w-0">

                                                    <p className="truncate text-sm font-semibold text-gray-900">
                                                        {
                                                            item.name
                                                        }
                                                    </p>

                                                    <p className="truncate text-xs text-gray-400">
                                                        {
                                                            item.email
                                                        }
                                                    </p>

                                                </div>

                                            </button>

                                        )
                                    )}

                                </div>

                            )}

                        </div>

                    )}


                    {/* ==================================================
                        CONVERSATIONS
                    ================================================== */}

                    <div className="min-h-0 flex-1 overflow-y-auto px-2 pb-3">

                        {!search.trim() && (

                            <p className="px-3 pb-2 pt-2 text-xs font-semibold text-gray-400">
                                Messages
                            </p>

                        )}


                        {loadingConversations ? (

                            <div className="space-y-1">

                                {[1, 2, 3, 4].map(
                                    (item) => (

                                        <div
                                            key={item}
                                            className="flex items-center gap-3 rounded-xl px-3 py-3"
                                        >

                                            <div className="h-12 w-12 animate-pulse rounded-full bg-gray-100" />

                                            <div className="flex-1 space-y-2">

                                                <div className="h-3 w-28 animate-pulse rounded bg-gray-100" />

                                                <div className="h-3 w-40 animate-pulse rounded bg-gray-100" />

                                            </div>

                                        </div>

                                    )
                                )}

                            </div>

                        ) : conversations.length === 0 ? (

                            <div className="flex h-full flex-col items-center justify-center px-6 text-center">

                                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-blue-400">
                                    <ChatBubbleIcon />
                                </div>

                                <p className="text-sm font-semibold text-gray-800">
                                    No messages yet
                                </p>

                                <p className="mt-1 text-xs leading-5 text-gray-400">
                                    Search for someone to start a conversation.
                                </p>

                            </div>

                        ) : (

                            <div className="space-y-0.5">

                                {conversations.map(
                                    (conversation) => {

                                        const otherUser =
                                            getOtherUser(
                                                conversation
                                            );


                                        if (!otherUser) {
                                            return null;
                                        }


                                        const lastMessage =
                                            conversation
                                                .messages?.[0];


                                        const active =
                                            conversation.id ===
                                            conversationId;


                                        return (

                                            <button
                                                key={
                                                    conversation.id
                                                }
                                                type="button"
                                                onClick={() =>
                                                    handleConversationClick(
                                                        conversation
                                                    )
                                                }
                                                className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition ${active
                                                    ? "bg-gray-100"
                                                    : "hover:bg-gray-50"
                                                    }`}
                                            >

                                                {/* Avatar */}

                                                <div className="relative shrink-0">

                                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-700 text-sm font-semibold text-white shadow-sm">
                                                        {getInitial(otherUser.name)}
                                                    </div>

                                                    <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white bg-emerald-500" />

                                                </div>


                                                {/* Conversation */}

                                                <div className="min-w-0 flex-1">

                                                    <div className="flex items-center justify-between gap-2">

                                                        <p className="truncate text-sm font-semibold text-gray-900">
                                                            {
                                                                otherUser.name
                                                            }
                                                        </p>

                                                    </div>


                                                    <p
                                                        className={`mt-0.5 truncate text-xs ${active
                                                            ? "font-medium text-gray-600"
                                                            : "text-gray-400"
                                                            }`}
                                                    >

                                                        {lastMessage
                                                            ? lastMessage.content
                                                            : "Start a conversation"}

                                                    </p>

                                                </div>

                                            </button>

                                        );

                                    }
                                )}

                            </div>

                        )}

                    </div>

                </aside>


                {/* ==================================================
                    CHAT WINDOW
                ================================================== */}

                <section
                    className={`min-h-0 flex-col ${showChat
                        ? "flex"
                        : "hidden lg:flex"
                        }`}
                >

                    {!selectedUser ? (

                        /* ==================================================
                            EMPTY CHAT
                        ================================================== */

                        <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">

                            <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-blue-50 text-blue-400">
                                <ChatBubbleIcon className="h-9 w-9" />
                            </div>

                            <h3 className="text-lg font-semibold text-gray-900">
                                Your messages
                            </h3>

                            <p className="mt-2 max-w-sm text-sm leading-6 text-gray-400">
                                Search for someone and start a private conversation.
                            </p>

                        </div>

                    ) : (

                        <>

                            {/* ==================================================
                                CHAT HEADER
                            ================================================== */}

                            <div className="flex h-[73px] shrink-0 items-center gap-3 border-b border-gray-200 bg-white px-4">

                                {/* Mobile Back */}

                                <button
                                    type="button"
                                    onClick={
                                        handleBackToConversations
                                    }
                                    className="mr-1 flex h-9 w-9 items-center justify-center rounded-full text-gray-600 transition hover:bg-gray-100 lg:hidden"
                                    aria-label="Back"
                                >
                                    <BackIcon />
                                </button>


                                {/* Avatar */}

                                <div className="relative shrink-0">

                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-700 text-sm font-semibold text-white shadow-sm">
                                        {getInitial(selectedUser.name)}
                                    </div>

                                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-emerald-500" />

                                </div>

                                {/* User */}

                                <div className="min-w-0">

                                    <h3 className="truncate text-sm font-semibold text-gray-900">
                                        {
                                            selectedUser.name
                                        }
                                    </h3>
                                    <div className="mt-0.5 flex items-center gap-2 text-xs text-gray-400">

                                        <span className="flex items-center gap-1.5">
                                            <span className="h-2 w-2 rounded-full bg-emerald-500" />
                                            Active now
                                        </span>

                                        <span className="text-gray-300">•</span>

                                        <span className="truncate">
                                            {selectedUser.email}
                                        </span>

                                    </div>

                                </div>

                            </div>


                            {/* ==================================================
                                MESSAGES
                            ================================================== */}

                            <div className="chat-scrollbar min-h-0 flex-1 overflow-y-auto bg-white px-4 py-6 sm:px-6">

                                {loadingMessages ? (

                                    <div className="flex h-full items-center justify-center">

                                        <div className="text-center">

                                            <div className="mx-auto mb-3 h-7 w-7 animate-spin rounded-full border-2 border-gray-200 border-t-blue-600" />

                                            <p className="text-xs text-gray-400">
                                                Loading messages...
                                            </p>

                                        </div>

                                    </div>

                                ) : messages.length === 0 ? (

                                    /* ==================================================
                                        FIRST MESSAGE STATE
                                    ================================================== */

                                    <div className="flex h-full flex-col items-center justify-center text-center">

                                        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-700 text-2xl font-semibold text-white shadow-sm">

                                            {getInitial(
                                                selectedUser.name
                                            )}

                                        </div>

                                        <h3 className="text-base font-semibold text-gray-900">
                                            {
                                                selectedUser.name
                                            }
                                        </h3>

                                        <p className="mt-1 text-xs text-gray-400">
                                            {
                                                selectedUser.email
                                            }
                                        </p>

                                        <p className="mt-5 text-sm text-gray-500">
                                            Start a conversation
                                        </p>

                                    </div>

                                ) : (

                                    <div className="mx-auto flex max-w-3xl flex-col gap-2">

                                        {messages.map(
                                            (
                                                item,
                                                index
                                            ) => {

                                                const isMine =
                                                    item.senderId ===
                                                    user?.id;


                                                const previousMessage =
                                                    messages[
                                                    index - 1
                                                    ];


                                                const previousIsMine =
                                                    previousMessage?.senderId ===
                                                    user?.id;


                                                const showAvatar =
                                                    !isMine &&
                                                    (
                                                        !previousMessage ||
                                                        previousIsMine
                                                    );


                                                return (

                                                    <div
                                                        key={
                                                            item.id
                                                        }
                                                        className={`flex items-end gap-2 ${isMine
                                                            ? "justify-end"
                                                            : "justify-start"
                                                            }`}
                                                    >

                                                        {/* Other user's avatar */}

                                                        {!isMine && (

                                                            <div className="w-7 shrink-0">

                                                                {showAvatar ? (

                                                                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-700 text-[10px] font-semibold text-white">

                                                                        {getInitial(
                                                                            selectedUser.name
                                                                        )}

                                                                    </div>

                                                                ) : null}

                                                            </div>

                                                        )}


                                                        {/* Message */}

                                                        <div
                                                            className={`max-w-[78%] sm:max-w-[65%] ${isMine
                                                                ? "items-end"
                                                                : "items-start"
                                                                }`}
                                                        >

                                                            <div
                                                                className={`break-words px-4 py-2.5 text-sm leading-5 shadow-sm ${isMine
                                                                    ? "rounded-[22px] rounded-br-md bg-blue-600 text-white"
                                                                    : "rounded-[22px] rounded-bl-md bg-gray-100 text-gray-900"
                                                                    }`}
                                                            >

                                                                {
                                                                    item.content
                                                                }

                                                            </div>


                                                            {/* Time */}

                                                            <p
                                                                className={`mt-1 px-1 text-[10px] text-gray-400 ${isMine
                                                                    ? "text-right"
                                                                    : "text-left"
                                                                    }`}
                                                            >
                                                                {
                                                                    formatTime(
                                                                        item.createdAt
                                                                    )
                                                                }
                                                            </p>

                                                        </div>

                                                    </div>

                                                );

                                            }
                                        )}

                                        <div
                                            ref={
                                                messagesEndRef
                                            }
                                        />

                                    </div>

                                )}

                            </div>


                            {/* ==================================================
                                COMPOSER
                            ================================================== */}
                            <div className="shrink-0 border-t border-gray-100 bg-white px-4 py-3 sm:px-5">

                                <div className="flex items-center gap-2">

                                    <button
                                        type="button"
                                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
                                        aria-label="Add attachment"
                                    >
                                        <PlusIcon />
                                    </button>

                                    <div className="flex flex-1 items-center rounded-full border border-gray-200 bg-gray-50 px-3 py-1 focus-within:border-gray-300 focus-within:bg-white">

                                        <input
                                            type="text"
                                            value={message}
                                            onChange={(e) =>
                                                setMessage(e.target.value)
                                            }
                                            onKeyDown={handleKeyDown}
                                            disabled={sending}
                                            placeholder="Message..."
                                            className="min-w-0 flex-1 bg-transparent px-2 py-2 text-sm text-gray-900 outline-none placeholder:text-gray-400"
                                        />

                                    </div>

                                    <button
                                        type="button"
                                        onClick={handleSendMessage}
                                        disabled={!message.trim() || sending}
                                        className="flex h-10 shrink-0 items-center justify-center gap-1.5 rounded-full bg-blue-600 px-4 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
                                    >
                                        {sending ? (
                                            <SpinnerIcon />
                                        ) : (
                                            <SendIcon />
                                        )}
                                        <span className="hidden sm:inline">
                                            {sending ? "Sending" : "Send"}
                                        </span>
                                    </button>

                                </div>

                            </div>

                        </>

                    )}

                </section>

            </div>

        </div>

    );

}

export default UniversalChat;