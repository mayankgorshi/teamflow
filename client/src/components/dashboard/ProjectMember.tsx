import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    getProjectMembers,
    removeProjectMember,
} from "../../api/projectmemberApi";

import { useAuth } from "../../context/AuthContext";

type Member = {
    id: string;
    role: "OWNER" | "MEMBER";

    user: {
        id: string;
        name: string;
        email: string;
    };
};

type ProjectMembersProps = {
    projectId: string;
    refreshKey?: number;
    onMembersLoaded?: (count: number) => void;
};

function ProjectMembers({
    projectId,
    refreshKey,
    onMembersLoaded,
}: ProjectMembersProps) {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [members, setMembers] = useState<Member[]>([]);
    const [loading, setLoading] = useState(true);

    // ==========================================
    // FETCH MEMBERS
    // ==========================================

    const fetchMembers = async () => {
        if (!projectId) {
            setMembers([]);
            onMembersLoaded?.(0);
            setLoading(false);
            return;
        }

        try {
            setLoading(true);

            const data = await getProjectMembers(projectId);

            const loadedMembers = data.members || [];

            setMembers(loadedMembers);

            onMembersLoaded?.(loadedMembers.length);
        } catch (error) {
            console.error(
                "Failed to load project members:",
                error
            );

            setMembers([]);

            onMembersLoaded?.(0);
        } finally {
            setLoading(false);
        }
    };

    // ==========================================
    // LOAD MEMBERS
    // ==========================================

    useEffect(() => {
        fetchMembers();
    }, [projectId, refreshKey]);

    // ==========================================
    // REMOVE MEMBER
    // ==========================================

    const handleRemove = async (userId: string) => {
        const confirmed = window.confirm(
            "Are you sure you want to remove this member?"
        );

        if (!confirmed) {
            return;
        }

        try {
            await removeProjectMember(
                projectId,
                userId
            );

            await fetchMembers();
        } catch (error: any) {
            console.error(
                "Failed to remove member:",
                error
            );

            alert(
                error?.response?.data?.message ||
                    "Failed to remove member"
            );
        }
    };

    // ==========================================
    // OPEN PRIVATE CHAT
    // ==========================================

    const handleChat = (member: Member) => {
        // Do not allow chatting with yourself
        if (member.user.id === user?.id) {
            return;
        }

        navigate("/messages", {
            state: {
                openUser: member.user,
            },
        });
    };

    // ==========================================
    // UI
    // ==========================================

    if (loading) {
        return (
            <div className="py-6 text-center">
                <p className="text-sm text-gray-500">
                    Loading team members...
                </p>
            </div>
        );
    }

    if (members.length === 0) {
        return (
            <div className="rounded-xl border border-dashed border-gray-300 p-8 text-center">
                <p className="text-gray-500">
                    No team members yet.
                </p>

                <p className="mt-1 text-sm text-gray-400">
                    Add someone to start collaborating.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {members.map((member) => {
                const isCurrentUser =
                    member.user.id === user?.id;

                return (
                    <div
                        key={member.id}
                        className="flex items-center gap-4 rounded-xl border border-gray-100 p-4 transition hover:bg-gray-50"
                    >
                        {/* Avatar */}
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-600">
                            {member.user.name
                                .charAt(0)
                                .toUpperCase()}
                        </div>

                        {/* User information */}
                        <div className="min-w-0 flex-1">
                            <p className="font-medium text-gray-900">
                                {member.user.name}
                                {isCurrentUser && (
                                    <span className="ml-2 text-xs font-medium text-gray-400">
                                        You
                                    </span>
                                )}
                            </p>

                            <p className="truncate text-sm text-gray-500">
                                {member.user.email}
                            </p>

                            <span className="mt-1 inline-block text-xs font-medium text-blue-600">
                                {member.role === "OWNER"
                                    ? "Project Owner"
                                    : "Member"}
                            </span>
                        </div>

                        {/* Actions */}
                        <div className="flex shrink-0 items-center gap-2">
                            {/* Chat only for other users */}
                            {!isCurrentUser && (
                                <button
                                    type="button"
                                    onClick={() =>
                                        handleChat(member)
                                    }
                                    className="rounded-lg bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-100"
                                >
                                    Chat
                                </button>
                            )}

                            {/* Remove only members, never owner */}
                            {member.role === "MEMBER" && (
                                <button
                                    type="button"
                                    onClick={() =>
                                        handleRemove(
                                            member.user.id
                                        )
                                    }
                                    className="rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
                                >
                                    Remove
                                </button>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default ProjectMembers;