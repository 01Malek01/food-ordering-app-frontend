import { Order } from "@/types";
import { Separator } from "@radix-ui/react-separator";

type Props = {
  order: Order;
};

export default function OrderStatusDetail({ order }: Props) {
  return (
    <div className="space-y-5">
      <div className="flex flex-col ">
        <span className="font-bold">Delivering to:</span>

        <span>{order.deliveryDetails.name}</span>
        <span>
          {order.deliveryDetails.addressLine1}, {order.deliveryDetails.city}
        </span>
      </div>
      <div className="flex flex-col">
        <span className="font-bold">Your Order </span>
        <ul>
          {order.cartItems.map((item) => (
            <li className="flex justify-between" key={item.name}>
              <span>
                {item.name} X{item.quantity}{" "}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <Separator />
      <div className="flex flx-coll">
        <span className="font-bold">
          Total: ${(order.totalAmount / 100).toFixed(2)}
        </span>
      </div>
    </div>
  );
}
