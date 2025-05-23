import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Trash2 } from "lucide-react";
import useCart from "@/hooks/useCart";

const CartPage = () => {
  const {cart, prodcutSendingToCart, increaseQuantity, decreaseQuantity} = useCart();

  // Calculate total price
  const total = cart?.products?.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  ) ?? 0;

  return (
    <div className="max-w-3xl mx-auto py-8 px-2">
      <h1 className="text-3xl font-bold flex items-center gap-2 mb-6">
        <ShoppingCart /> Your Cart
      </h1>
      {!cart || !cart.products || cart.products.length === 0 ? (
        <Card>
          <CardContent className="text-center py-10">
            <div className="text-xl font-semibold mb-2">Your cart is empty!</div>
            <div className="text-muted-foreground">Add some products to see them here.</div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent>
            <div className="divide-y">
              {cart.products.map((item) => (
                <div key={item.id} className="flex items-center justify-between py-4">
                  <div>
                    <div className="font-semibold">{item.title}</div>
                    <div className="text-sm text-muted-foreground">
                      Price: ₹{item.price} &times; {item.quantity}
                    </div>
                    <Card className="p-0 rounded-sm w-max border-none shadow-none">
                      <CardContent className="flex items-center p-0 w-max">
                        <Button
                          variant="outline"
                          onClick={() => decreaseQuantity(item.id)}
                          disabled={prodcutSendingToCart === item.id}
                        >{item.quantity == 1 ? <Trash2 /> : "-"}</Button>
                        <span className="px-2">{item.quantity}</span>
                        <Button
                          variant="outline"
                          onClick={() => increaseQuantity(item.id)}
                          disabled={prodcutSendingToCart === item.id}
                        >+</Button>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="font-bold text-lg">₹{item.price * item.quantity}</div>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center mt-6 pt-4 border-t">
              <div className="text-xl font-bold">Total</div>
              <div className="text-2xl font-bold text-green-600">₹{total}</div>
            </div>
            <Button className="w-full mt-6" size="lg" disabled={cart.products.length === 0}>
              Proceed to Checkout
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CartPage;