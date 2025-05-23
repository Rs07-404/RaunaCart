import Brand from "@/components/appComponents/brand";
import Loader from "@/components/ui/loader"

const LoaderPage = () => {
    return (
        <div className="flex flex-col justify-center gap-1 items-center fixed top-0 left-0 h-full w-full bg-card">
            <Brand />
            <div className="flex items-center justify-center gap-1">
                <Loader /> Loading...
            </div>
        </div>
    )
}

export default LoaderPage;