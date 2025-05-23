import { Routes, Route } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import AuthLayout from "@/layouts/AuthLayout";
import Login from "@/pages/Auth/login";
import Signup from "@/pages/Auth/signup";
import Home from "@/pages/AppPages/Home";
// import ForgotPassword from "@/pages/forgot-password";

// Conditionally Redirecting to login page if user is not authenticated
import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";
import LoaderPage from "@/pages/LoaderPage/page";
import CartPage from "@/pages/AppPages/Cart";

export default function AppRoutes() {
    const { user, loading } = useAuth();
    if (loading) return <LoaderPage />;
    return (
        <Routes>
            {/* Auth Pages show if user not authenticated */}
            <Route
                path="/login"
                element={
                    user ? (
                        <Navigate to="/" />
                    ) : (
                        <AuthLayout>
                            <Login />
                        </AuthLayout>
                    )
                }
            />
            <Route
                path="/signup"
                element={
                    user ? (
                        <Navigate to="/" />
                    ) : (
                        <AuthLayout>
                            <Signup />
                        </AuthLayout>
                    )
                }
            />

            {/* Main App Pages */}
            <Route
                path="/"
                element={
                    user ? (
                        <MainLayout>
                            <Home />
                        </MainLayout>
                    ) : (
                        <Navigate to="/signup" />
                    )
                }
            />


            <Route
                path="/clothing"
                element={
                    user ? (
                        <MainLayout>
                            <Home />
                        </MainLayout>
                    ) : (
                        <Navigate to="/signup" />
                    )
                }
            />
            <Route
                path="/electronics"
                element={
                    user ? (
                        <MainLayout>
                            <Home />
                        </MainLayout>
                    ) : (
                        <Navigate to="/signup" />
                    )
                }
            />
            <Route
                path="/furnitures"
                element={
                    user ? (
                        <MainLayout>
                            <Home />
                        </MainLayout>
                    ) : (
                        <Navigate to="/signup" />
                    )
                }
            />
            <Route
                path="/toys"
                element={
                    user ? (
                        <MainLayout>
                            <Home />
                        </MainLayout>
                    ) : (
                        <Navigate to="/signup" />
                    )
                }
            />
            <Route
                path="/jewelery"
                element={
                    user ? (
                        <MainLayout>
                            <Home />
                        </MainLayout>
                    ) : (
                        <Navigate to="/signup" />
                    )
                }
            />
            <Route
                path="/cart"
                element={
                    user ? (
                        <MainLayout>
                            <CartPage />
                        </MainLayout>
                    ) : (
                        <Navigate to="/signup" />
                    )
                }
            />
        </Routes>
    );
}
