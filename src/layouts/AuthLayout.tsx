import type { ReactNode } from "react";
import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";
import { motion } from "motion/react"

export default function AuthLayout({ children }: { children: ReactNode }) {
    const { user, loading } = useAuth();

    if (loading) return <div className="p-4">Loading...</div>;
    if (user) return <Navigate to="/" />;

    return (
        <div className="fixed top-0 left-0 min-h-screen w-full bg-gradient-to-br from-pink-50 via-indigo-50 via-yellow-50 to-green-50 flex items-center justify-center text-foreground">
            <motion.div
                // scale from 0 to 1
                className="w-full h-full flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{
                    opacity: 1,
                    transition: { duration: 1 }
                }}
            >{children}</motion.div>
        </div>
    );
}
