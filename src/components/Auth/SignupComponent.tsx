import { ShoppingBag } from "lucide-react";
import { Dialog } from "../ui/dialog";
import { Card, CardContent } from "../ui/card";
import cart from "@/assets/images/cart-light.png";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from "../ui/form";
import InputController from "../FormComponents/InputController";
import { Button } from "../ui/button";
import GoogleSignIn from "./GoogleSingInButton";
import { SignUpFormSchema, type SignUpFormData } from "@/config/schemas/signUpForm";
import { redirect, useNavigate } from "react-router-dom";
import { Separator } from "../ui/separator";
import { useDeviceType } from "@/hooks/useDeviceType";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/config/firebase/config";
import { toast } from "sonner";
import { APP_NAME } from "@/config/app/constants";
import type { JSX } from "react";


/**
 * SignupComponent renders the sign-up dialog for new users to create an account.
 * 
 * This component provides a responsive sign-up form with email/password registration,
 * Google sign-in, and real-time validation using react-hook-form and Zod schema validation.
 * It displays a visually appealing layout with a left panel for branding and messaging
 * (hidden on mobile) and a right panel for the form.
 * 
 * Features:
 * - Responsive design for mobile, tablet, and desktop.
 * - Email/password registration with Firebase authentication.
 * - Google sign-in integration.
 * - Real-time form validation and error handling.
 * - Toast notifications for success and error feedback.
 * - Navigation to login page after successful registration.
 * 
 * @component
 * @example
 * ```tsx
 * <SignupComponent />
 * ```
 * 
 * @returns {JSX.Element} The rendered sign-up dialog component.
 */
const SignupComponent = ():JSX.Element => {
    const navigateTo = useNavigate();
    const deviceType = useDeviceType();

    const signupForm = useForm({
        resolver: zodResolver(SignUpFormSchema),
        defaultValues: {
            displayName: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
        mode: "onChange"
    })

    const handleEmailSigup = async (data: SignUpFormData) => {
        createUserWithEmailAndPassword(auth, data.email, data.password).then((userCredential) => {
            const user = userCredential.user;
            updateProfile(user, {
                displayName: data.displayName,
            }).then(() => {
                redirect('/login');
                toast.success("Sign Up successfull");
                return user;
            }).catch((error) => {
                const errorCode = error.code;
                // Show toast based on error code
                if (errorCode === "auth/invalid-display-name") {
                    toast.error("Invalid display name");
                } else if (errorCode === "auth/operation-not-allowed") {
                    toast.error("Operation not allowed");
                } else {
                    toast.error("Error updating profile: ");
                }
            });
        }).catch((error) => {
            const errorCode = error.code;
            // Show toast based on error code
            if (errorCode === "auth/email-already-in-use") {
                toast.error("Email already in use");
            } else if (errorCode === "auth/invalid-email") {
                toast.error("Invalid email");
            } else if (errorCode === "auth/weak-password") {
                toast.error("Weak password");
            } else if (errorCode === "auth/operation-not-allowed") {
                toast.error("Operation not allowed");
            } else {
                toast.error("Error signing up with email and password: ");
            }
        });
    }

    const messages = [
        "Welcome to RaunaCart!, Let's Create Your Shopping Account.",
        "Start Fresh!, Join the Smart Way to Shop Online.",
        "New Here?, Let's Get You Set Up for a Seamless Experience.",
        "Create Your Account!, Your Shopping Companion Awaits.",
        "Join Us Today!, Discover Secure & Effortless Shopping.",
        "First Time Here?, Let's Build Your Shopping Journey Together.",
        "Welcome Aboard!, Your Personalized Store Starts Now.",
        "Sign Up Now!, Enjoy Tailored Deals and Hassle-Free Checkout.",
        "Get Started!, A Better Way to Shop is Just One Step Away.",
        "Join the Family!, Shop Smarter with RaunaCart."
    ];

    // Responsive class strings
    const isMobile = deviceType === "mobile";
    const isTablet = deviceType === "tablet";

    const cardClass = isMobile
        ? "w-full p-0"
        : isTablet
            ? "w-[95%] p-0"
            : "w-[90%] p-0";

    const cardContentClass = `flex ${isMobile ? "flex-col p-2 bg-tansparant" : "flex-row p-6 bg-black fixed top-0 left-0 w-full h-screen overflow-auto !rounded-none"} poppins-regular rounded-2xl w-full h-full`;

    const leftPanelClass = isMobile ? "hidden" : "flex-4 h-full flex flex-col justify-between";
    const leftPanelTextClass = [
        isMobile ? "text-2xl p-2 m-2" : "text-[42px] p-4 m-10",
        "text-wrap sniglet-regular font-extrabold text-white"
    ].join(" ");
    const leftPanelImgClass = isMobile ? "hidden" : "flex justify-center items-center h-full m-10";

    const rightPanelClass = [
        "flex-3 h-full rounded-2xl flex flex-col justify-center items-center",
        isMobile ? "p-2 bg-transparent" : "p-6 bg-card"
    ].join(" ");

    const formClass = "w-full";
    const formInnerClass = [
        isMobile ? "p-2" : "p-6",
        "flex flex-col justify-center items-center"
    ].join(" ");

    const inputGroupClass = [
        "flex flex-col mx-auto",
        isMobile ? "gap-2 w-full" : "gap-4 w-[80%]"
    ].join(" ");

    const buttonClass = [
        "bg-black text-white mx-auto p-2 rounded",
        isMobile ? "mt-2 w-full" : "mt-4 w-[80%]"
    ].join(" ");

    const separatorClass = [
        "flex items-center gap-4 mx-auto",
        isMobile ? "mt-2 w-full" : "mt-4 w-[80%]"
    ].join(" ");

    const googleClass = isMobile ? "mt-2 w-full" : "mt-4 w-[80%]";

    return (
        <Dialog>
            <Card className={`${cardClass} overflow-clip h-full shadow-2xl border-none`}>
                <CardContent className={cardContentClass}>
                    {/* Left Panel: Hidden on mobile */}
                    {!isMobile && (
                        <div className={leftPanelClass}>
                            <div className="sniglet w-full text-white text-[24px] flex gap-1 items-center"><ShoppingBag /> {APP_NAME}</div>
                            <div className={leftPanelTextClass}>
                                {messages[Math.floor(Math.random() * messages.length)].split(",")[0]}
                                <br />
                                {messages[Math.floor(Math.random() * messages.length)].split(",")[1]}
                            </div>
                            <div className={leftPanelImgClass}>
                                <img src={cart} alt="cart" className="w-[142px] -rotate-10 object-cover" />
                            </div>
                        </div>
                    )}
                    {/* Right Panel: Always visible */}
                    <div className={rightPanelClass}>
                        <Form {...signupForm}>
                            <form onSubmit={signupForm.handleSubmit(handleEmailSigup)} className={formClass}>
                                {isMobile && <div className="sniglet w-full text-center text-[24px] flex gap-1 justify-center items-center"><ShoppingBag /> {APP_NAME}</div>}
                                <h1 className="text-2xl font-bold text-center">Sign Up</h1>
                                <div className={formInnerClass}>
                                    <div className={inputGroupClass}>
                                        <InputController type="text" placeholder="Full Name" name="displayName" label="Full Name" className="py-6" />
                                        <InputController type="text" placeholder="Email" name="email" label="Email" className="py-6" />
                                        <InputController type="password" placeholder="Password" name="password" label="Password" className="py-6" />
                                        <InputController type="password" placeholder="Re-type password" name="confirmPassword" label="Confirm Password" className="py-6" />
                                    </div>
                                    <Button type="submit" className={buttonClass}>Sign Up</Button>
                                    <div className={separatorClass}>
                                        <Separator className="flex-1" />
                                        <span className="text-muted-foreground">or</span>
                                        <Separator className="flex-1" />
                                    </div>
                                    {/* Sign in with google button */}
                                    <div className={googleClass}><GoogleSignIn /></div>
                                    <div className="text-center mt-4 flex gap-1">
                                        <div>Already have an account? </div>
                                        <div onClick={() => navigateTo("/login")} className="text-primary cursor-pointer">Login</div>
                                    </div>
                                </div>
                            </form>
                        </Form>
                    </div>
                </CardContent>
            </Card>
        </Dialog>
    );
}

export default SignupComponent;