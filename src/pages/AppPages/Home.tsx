import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { PlusSquare, Search, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "sonner";
import type { Product } from "@/types/IProduct";
import useCart from "@/hooks/useCart";
import { useDeviceType } from "@/hooks/useDeviceType";

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const { cart, addToCart, prodcutSendingToCart, increaseQuantity, decreaseQuantity } = useCart();

    // Get current path
    const location = useLocation();
    const currentPath = location.pathname;
    const categoryFromPath = currentPath.split("/")[1]?.toLowerCase();

    // UI Configs
    const deviceType = useDeviceType();
    const isMobile = deviceType === "mobile";


    const fetchProducts = async () => {
        setLoading(true);
        try {
            const response = await fetch(`https://fakestoreapi.com/products`);
            if (!response.ok) throw new Error("Failed to fetch products");
            const data = await response.json();
            setProducts(data);
        } catch (err) {
            // based on err code
            if (err instanceof Error) {
                toast.error(err.message);
            } else {
                toast.error("Failed to fetch products");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const filteredProducts = products.filter((product: Product) => {
        const matchesCategory = currentPath !== "/" && product.category.toLowerCase().includes(categoryFromPath);
        const matchesSearch = product.title
            .toLowerCase()
            .includes(searchQuery.toLowerCase());

        if (currentPath === "/") return matchesSearch;


        return matchesCategory && matchesSearch;
    });

    return (
        <>
            <div className="w-full flex justify-center items-center">{categoryFromPath.length > 0 ? categoryFromPath.slice(0)[0].toUpperCase() + categoryFromPath.slice(1) : "Home"}</div>
            <div className="w-full flex justify-center items-center mt-2">
                <div className={`flex relative ${isMobile ? "w-[80%]": "w-[30%]"} justify-center items-center`}>
                    <Input
                        type="text"
                        placeholder="Search for products..."
                        className="w-full pr-12"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Search className="absolute right-4 top-1 text-gray-500" />
                </div>
            </div>
            <div className="grid sm:grid-cols-3 grid-cols-1 md:grid-cols-4 lg:grid-cols-4 p-12">
                {loading &&
                    Array.from({ length: 8 }).map((_, index) =>
                        <Skeleton key={index} className="p-4 border m-2 h-102 overflow-hidden shadow-sm">
                            <div className="w-full h-48 bg-gray-200 animate-pulse"></div>
                            <div className="flex">
                                <h2 className="text-lg h-20 font-bold text-wrap truncate bg-gray-200 animate-pulse"></h2>
                                <p className="text-xl font-semibold ml-auto bg-gray-200 animate-pulse"></p>
                            </div>
                            <p className="h-10 text-muted-foreground text-wrap truncate bg-gray-200 animate-pulse"></p>
                            <div className="flex w-full gap-1 [&>*]:flex-1 mt-4">
                                <Button className="bg-gray-200 animate-pulse"><PlusSquare /> Add to Cart</Button>
                                <Button className="bg-gray-200 animate-pulse">Buy Now</Button>
                            </div>
                        </Skeleton>
                    )
                }
                {!loading && filteredProducts.length > 0 && filteredProducts.map((product: Product) => {
                    const productInCart = cart?.products.find((item) => item.id === product.id)
                    const count = productInCart?.quantity
                    return (
                        <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                                duration: 0.4,
                                scale: { type: "spring", visualDuration: 0.2, bounce: 0.3 },
                            }}
                            whileHover={{ scale: 1.05 }}
                            layout
                            key={product.id}
                        >
                            <Card className="p-4 relative border m-2 h-102 overflow-hidden">
                                <img src={product.image} alt={product.title} className="w-full h-48 object-cover" />
                                <div className="flex">
                                    <h2 className="text-lg h-20 font-bold text-wrap truncate">{product.title}</h2>
                                    <p className="text-xl font-semibold ml-auto">₹{product.price}</p>
                                </div>
                                <p className="h-20 text-muted-foreground text-wrap truncate">{product.description}</p>
                                <div className="flex w-full gap-1 [&>*]:flex-1">
                                    {/* if cart has the product then show quantity in middle and + and - button else show normal add to cart button */}
                                    {productInCart ? (
                                        <Card className="p-0 rounded-sm">
                                            <CardContent className="flex items-center p-0">
                                                <Button
                                                    variant="ghost"
                                                    onClick={() => decreaseQuantity(product.id)}
                                                    disabled={prodcutSendingToCart === product.id}
                                                >{count == 1 ? <Trash2 /> : "-"}</Button>
                                                <span className="px-2">{count}</span>
                                                <Button
                                                    variant="ghost"
                                                    onClick={() => increaseQuantity(product.id)}
                                                    disabled={prodcutSendingToCart === product.id}
                                                >+</Button>
                                            </CardContent>
                                        </Card>
                                    ) :
                                        <Button
                                        className="bg-black"
                                            onClick={() => { addToCart(product) }}
                                            disabled={(prodcutSendingToCart && (prodcutSendingToCart === product.id)) ? true : false}>
                                            <PlusSquare /> Add to Cart
                                        </Button>
                                    }
                                    <Button className="bg-black">Buy Now</Button>
                                </div>
                            </Card>
                        </motion.div>
                    )
                })}
                {filteredProducts.length <= 0 && !loading && (
                    <div className="w-full flex flex-col col-span-4 justify-center items-center text-center">
                        <div className="text-[72px] text-center">😅</div>
                        <div className="w-full text-center">No products found</div>
                    </div>
                )}
            </div>
        </>
    )
}

export default Home;