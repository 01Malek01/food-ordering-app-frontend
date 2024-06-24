import { Restaurant } from "@/types";
import { CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { CartItem } from "@/pages/DetailPage";
import { Separator } from "@radix-ui/react-separator";
import { Trash } from "lucide-react";
type Props = {
  restaurant: Restaurant;
  cartItems: CartItem[];
  removeFromCart: (cartItem: CartItem) => void;
};

export default function OrderSummary({
  restaurant,
  cartItems,
  removeFromCart,
}: Props) {
  const getTotalCost = () => {
    const total = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    const totalWithDelivery = total + restaurant.deliveryPrice;
    return (totalWithDelivery / 100).toFixed(2);
  };
  return (
    <>
      <CardHeader>
        <CardTitle className=" ">
          <span>Your Order </span>
          <span>$ {getTotalCost()} </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {cartItems.map((item, index) => (
          <>
            <div className="flex justify-between" key={index}>
              <Badge variant="outline" className="mr-2">
                {" "}
                {item.quantity}
              </Badge>
              <span>{item.name}</span>
              <span className="flex items-center gap-1">
                <Trash
                  size={20}
                  color="red"
                  className="cursor-pointer"
                  onClick={() => removeFromCart(item)}
                />{" "}
                ${(item.price / 100).toFixed(2)}
              </span>
            </div>
          </>
        ))}
        <Separator />
        <div className="flex justify-between ">
         <span>Delivery</span>
          <span>$ {(restaurant.deliveryPrice / 100).toFixed(2)}</span>
        </div>
        <Separator />
      </CardContent>
    </>
  );
}
