import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import LoaderPage from "@/pages/LoaderPage/page";
import Header from "@/components/appComponents/Header";
import Footer from "@/components/appComponents/Footer";

export default function MainLayout({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) return <LoaderPage />;
  if (!user) return <Navigate to="/login" />;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <Header />
      <div className="mt-17 p-4 border">{children}</div>
      <Footer />
    </div>
  );
}
