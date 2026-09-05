import { useState } from "react";
import { addProjectMember } from "../../api/projectmemberApi";

type AddMemberProps = {
    projectId: string;
    onMemberAdded?: () => void;
};

function AddMember({
    projectId,
    onMemberAdded,
}: AddMemberProps) {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleAddMember = async (
        e: React.FormEvent
    ) => {
        e.preventDefault();

        if (!email.trim()) {
            alert("Please enter an email");
            return;
        }

        try {
            setLoading(true);

            await addProjectMember(
                projectId,
                email.trim()
            );

            alert("Member added successfully 🎉");

            setEmail("");

            onMemberAdded?.();

        } catch (error: any) {
            console.error("Failed to add member:", error);

            alert(
                error?.response?.data?.message ||
                "Failed to add member"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

            <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                    Add Team Member
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                    Add a TeamFlow user to this project using their email.
                </p>
            </div>

            <form
                onSubmit={handleAddMember}
                className="flex flex-col gap-3 sm:flex-row"
            >
                <input
                    type="email"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                    placeholder="Enter member email"
                    className="flex-1 rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {loading ? "Adding..." : "Add Member"}
                </button>
            </form>

        </div>
    );
}

export default AddMember;