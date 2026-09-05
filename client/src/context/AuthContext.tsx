import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import { getProfile } from "../api/authApi";

type User = {
    id: string;
    name: string;
    email: string;
};

type AuthContextType = {
    user: User | null;
    loading: boolean;
    login: (user: User, token: string) => void;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(
    undefined
);

export const AuthProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const savedUser = localStorage.getItem("user");

        // No token means user is logged out
        if (!token) {
            setLoading(false);
            return;
        }

        // Restore user immediately from localStorage
        if (savedUser) {
            try {
                setUser(JSON.parse(savedUser));
            } catch (error) {
                console.error(
                    "Failed to parse saved user:",
                    error
                );

                localStorage.removeItem("user");
            }
        }

        // Verify token with backend
        const loadUser = async () => {
            try {
                const data = await getProfile();

                console.log("PROFILE DATA:", data);

                setUser(data.user);

                // Keep localStorage updated
                localStorage.setItem(
                    "user",
                    JSON.stringify(data.user)
                );
            } catch (error) {
                console.error(
                    "Failed to restore user:",
                    error
                );

                localStorage.removeItem("token");
                localStorage.removeItem("user");

                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        loadUser();
    }, []);

    const login = (user: User, token: string) => {
        localStorage.setItem("token", token);

        localStorage.setItem(
            "user",
            JSON.stringify(user)
        );

        setUser(user);
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuth must be used inside AuthProvider"
        );
    }

    return context;
};