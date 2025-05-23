import { useAuth } from "@/context/AuthContext";
import type { RootState } from "@/store";
import { setCart } from "@/store/slices/CartSlice";
import type { ICartProduct } from "@/types/ICart";
import type { Product } from "@/types/IProduct";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const useCart = () => {
    const { cart } = useSelector((state: RootState) => state.cart);
    const { user } = useAuth();
    const [prodcutSendingToCart, setProductSendingToCart] = useState<number | null>(null);
    const dispatch = useDispatch();

    // Function to add product to cart
    const addToCart = async (product: Product) => {
        try {
            setProductSendingToCart(product.id);
            if (user && user.uid) {
                if (cart && cart.userId) {
                    const cartProducts = (): ICartProduct[] => {
                        const existingProduct = cart.products.find((item: ICartProduct) => (item.id === product.id))
                        if (existingProduct && existingProduct.id) {
                            // Replace the product with same id with the updatedCart
                            const updatedCartcart = cart.products.map((item: ICartProduct) =>
                                item.id === product.id
                                    ? { ...item, quantity: item.quantity + 1 }
                                    : item
                            );
                            return updatedCartcart;

                        } else {
                            return [
                                ...cart.products,
                                {
                                    ...product,
                                    quantity: 1,
                                },
                            ];
                        }
                    }
                    dispatch(setCart({
                        ...cart,
                        products: cartProducts()
                    }))
                    toast.success("Product added to cart");
                } else {
                    const NewCart = {
                        id: Math.floor(Math.random() * 1000),
                        userId: user.uid,
                        date: new Date().toISOString(),
                        products: [
                            {
                                ...product,
                                quantity: 1
                            }
                        ],
                        __v: 0
                    }
                    dispatch(setCart(NewCart))
                    toast.success("Product added to cart");
                }
            } else {
                toast.error("Please login to add products to cart");
            }
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error("Failed to add product to cart");
            }
        } finally {
            setProductSendingToCart(null);
        }
    }

    // Function to increase the quantity of existing product
    const increaseQuantity = (productId: number) => {
        if (!cart || !cart.products) return;
        const updatedProducts = cart.products.map((item: ICartProduct) =>
            item.id === productId
                ? { ...item, quantity: item.quantity + 1 }
                : item
        );
        dispatch(setCart({
            ...cart,
            products: updatedProducts
        }));
    };

    // Function Decrease Quantity and delete product if quantity is 0
    const decreaseQuantity = (productId: number) => {
        if (!cart || !cart.products) return;
        const existingProduct = cart.products.find((item: ICartProduct) => item.id === productId);
        if (!existingProduct) return;

        let updatedProducts: ICartProduct[];
        if (existingProduct.quantity > 1) {
            updatedProducts = cart.products.map((item: ICartProduct) =>
                item.id === productId
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            );
        } else {
            updatedProducts = cart.products.filter((item: ICartProduct) => item.id !== productId);
            toast.success("Product removed from cart");
        }

        dispatch(setCart({
            ...cart,
            products: updatedProducts
        }));
    };


    return ({
        cart,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        prodcutSendingToCart
    })
}

export default useCart;