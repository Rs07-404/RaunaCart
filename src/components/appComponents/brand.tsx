
import { APP_NAME } from "@/config/app/constants"
import { ShoppingBag } from "lucide-react"
import type { JSX } from "react";

/**
 * Brand component displays the application name alongside a logo.
 *
 * @component
 * @example
 * return (
 *   <Brand />
 * )
 *
 * @returns {JSX.Element} The rendered brand section with icon and app name.
 */
const Brand = ():JSX.Element => {
    return (
        <div>
            <div className="sniglet text-center text-[24px] flex gap-1 justify-center items-center">
                <ShoppingBag /> {APP_NAME}
            </div>
        </div>
    )
}

export default Brand;