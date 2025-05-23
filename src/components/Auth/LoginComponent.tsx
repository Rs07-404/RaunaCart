import { ShoppingBag } from "lucide-react";
import { Dialog } from "../ui/dialog";
import { Card, CardContent } from "../ui/card";
import cart from "@/assets/images/cart-light.png";
import { useForm } from "react-hook-form";
import { LoginFormSchema, type LoginFormData } from "@/config/schemas/loginForm";
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from "../ui/form";
import InputController from "../FormComponents/InputController";
import { Button } from "../ui/button";
import GoogleSignIn from "./GoogleSingInButton";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/config/firebase/config";
import { toast } from "sonner";
import { useState } from "react";
import Loader from "../ui/loader";
import { useNavigate } from "react-router-dom";
import { Separator } from "../ui/separator";
import { useDeviceType } from "@/hooks/useDeviceType";
import Brand from "../appComponents/brand";

const LoginComponent = () => {
    const [loginLoading, setLoginLoading] = useState<boolean>(false);
    const navigateTo = useNavigate();
    const deviceType = useDeviceType();

    const loginForm = useForm({
        resolver: zodResolver(LoginFormSchema),
        defaultValues: {
            email: "",
            password: ""
        },
        mode: "onChange"
    })

    const handleEmailLogin = async (data: LoginFormData) => {
        try {
            setLoginLoading(true);
            const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password)
            toast.success(`Welcome ${userCredential.user.displayName}`);
        } catch (error) {
            let errorCode = "unknown";
            if (typeof error === "object" && error !== null && "code" in error) {
                errorCode = (error as { code: string }).code;
            }
            console.log("Error logging in: ", errorCode);
            // Show toast based on error code
            if (errorCode === "auth/user-not-found") {
                toast.error("User not found");
            } else if (errorCode === "auth/invalid-credential") {
                toast.error("Invalid email or password");
            } else if (errorCode === "auth/invalid-email") {
                toast.error("Invalid email");
            } else if (errorCode === "auth/too-many-requests") {
                toast.error("Too many requests, please try again later");
            } else {
                toast.error("Error logging in");
            }
        } finally {
            setLoginLoading(false);
        }
    }

    const messages = [
        "Welcome Back!, Your Trusted Shopping Companion Awaits.",
        "Good to See You Again!, Let's Make Shopping Simple & Safe.",
        "Welcome Back!, Shop Securely, Every Time.",
        "Glad You're Back!, Your Reliable Store is Just a Click Away.",
        "Welcome Back!, Your Shopping Journey Starts Here.",
        "Welcome Back!, Your Shopping Adventure Awaits.",
        "Welcome Back!, Your Shopping Experience Just Got Better."
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
            <Card className={`${cardClass} overflow-clip shadow-2xl border-none`}>
                <CardContent className={cardContentClass}>
                    {/* Left Panel: Hide on mobile */}
                    {!isMobile && (
                        <div className={leftPanelClass}>
                            <Brand/>
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
                        <Form {...loginForm}>
                            <form onSubmit={loginForm.handleSubmit(handleEmailLogin)} className={formClass}>
                                {isMobile && <div className="sniglet w-full text-white text-[24px] flex gap-1 items-center"><ShoppingBag /> RaunaCart</div>}
                                <h1 className="text-2xl font-bold text-center">Login</h1>
                                <div className={formInnerClass}>
                                    {/* Login with Email Form */}
                                    <div className={inputGroupClass}>
                                        <InputController type="text" placeholder="Email" name="email" label="Email" className="py-6" />
                                        <InputController type="password" placeholder="Password" name="password" label="Password" className="py-6" />
                                    </div>
                                    <Button type="submit" className={buttonClass} disabled={loginLoading}>
                                        {loginLoading ? <Loader /> : "Login"}
                                    </Button>
                                    <div className={separatorClass}>
                                        <Separator className="flex-1" />
                                        <span className="text-muted-foreground">or</span>
                                        <Separator className="flex-1" />
                                    </div>
                                    {/* Sign in with google button */}
                                    <div className={googleClass}>
                                        <GoogleSignIn />
                                    </div>
                                    {/* Sign Up Page Link */}
                                    <div className="text-center mt-4 flex gap-1">
                                        <div>Don't have an account? </div>
                                        <div onClick={() => navigateTo("/signup")} className="text-primary cursor-pointer">Sign Up</div>
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

export default LoginComponent;