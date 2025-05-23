import { useAuth } from "@/context/AuthContext";
import { Gem, Home, ListOrdered, LogOut, Plug, Shapes, Shirt, ShoppingCart, Sofa } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { logout } from "@/actions/logout";
import Loader from "../ui/loader";
import { useDeviceType } from "@/hooks/useDeviceType";
import Brand from "./brand";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";

const Header = () => {
    const { user, loading } = useAuth();
    const navigateTo = useNavigate();


    // get current path
    const location = useLocation();
    const currentPath = location.pathname;

    const deviceType = useDeviceType();
    const {cart} = useSelector((state: RootState)=>state.cart);

    const isMobile = deviceType === "mobile";

    const paths = [
        {
            id:1,
            PathLabel: "Home",
            PathEndpoint: "/",
            PathIcon: Home,
        },
        {
            id:2,
            PathLabel: "Clothes",
            PathEndpoint: "/clothing",
            PathIcon: Shirt,
        },
        {
            id:3,
            PathLabel: "Electronics",
            PathEndpoint: "/electronics",
            PathIcon: Plug,
        },
        {
            id:4,
            PathLabel: "Furnitures",
            PathEndpoint: "/furnitures",
            PathIcon: Sofa,
        },
        {
            id:5,
            PathLabel: "Toys",
            PathEndpoint: "/toys",
            PathIcon: Shapes,
        },
        {
            id:6,
            PathLabel: "Jewelery",
            PathEndpoint: "/jewelery",
            PathIcon: Gem,
        },
    ]

    return (
        <header className="bg-header fixed w-full z-1000 left-0 top-0 border bg-card/80 backdrop-blur-2xl flex items-center gap-2 text-header-text p-2 py-4">
            {!isMobile && <Brand />}
            <nav className="flex gap-4 [&>*]:text-[16px] [&>a]:cursor-pointer [&>a]:hover:text-[18px] [&>a]:transition-all [&>a]:hover:underline">
                {paths.map((path)=>
                <a key={path.id} onClick={() => { navigateTo(path.PathEndpoint) }} className={`text-lg ${currentPath == path.PathEndpoint && "text-primary"}`}>{isMobile ? <path.PathIcon /> : path.PathLabel}</a>
                )}
            </nav>

            <nav className="flex gap-4 [&>*]:text-[16px] ml-auto [&>a]:cursor-pointer [&>a]:h-5 [&>a]:hover:h-6 [&>a]:transition-all">
                <a onClick={() => { navigateTo("/cart") }} className="text-lg relative px-2 py-4 flex justify-center items-center">
                    <ShoppingCart className="h-5 w-5" />
                    {cart && cart.products.length > 0 && <div className="bg-destructive absolute rounded-full flex justify-center w-4 h-4 right-0 top-0 text-sm text-white items-center">{cart.products.length}</div>}
                </a>
                <a onClick={() => { navigateTo("/orders") }} className="text-lg py-4 flex justify-center items-center"><ListOrdered className="h-5 w-5" /></a>
            </nav>
            {!isMobile && <nav className="[&>*]:text-[16px]">
                <div>{user?.email}</div>
            </nav>
            }
            <Avatar>
                <AvatarImage src={user?.photoURL ?? ""} alt="User Avatar" />
                <AvatarFallback className="bg-header-text text-foreground border">
                    {user?.displayName
                        ? (() => {
                            const words = user.displayName.trim().split(/\s+/);
                            if (words.length === 1) return words[0][0]?.toUpperCase() ?? "";
                            return (words[0][0] + words[words.length - 1][0]).toUpperCase();
                        })()
                        : ""}
                </AvatarFallback>
            </Avatar>
            {loading ? <Loader /> : <LogOut className="h-5 w-5 cursor-pointer" onClick={logout} />}
        </header>
    )
}

export default Header;