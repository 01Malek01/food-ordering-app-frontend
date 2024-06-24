import { Order, OrderStatus } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "./ui/badge";
import { Label } from "@/components/ui/label";
import { Select } from "./ui/select";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { orderStatusList } from "@/config/order-status-config";
import { useUpdateMyRestaurantOrder } from "../api/MyRestaurantApi";
import { useEffect, useState } from "react";

type Props = {
  order: Order;
};

export default function OrderItemCard({ order }: Props) {
  const { updateOrderStatus, isLoading } = useUpdateMyRestaurantOrder();
  const [status, setStatus] = useState(order.status);
  useEffect(() => {
    setStatus(order.status);
  },[order.status])
  const onChange = async (value: OrderStatus) => {
    await updateOrderStatus({ orderId: order._id as string, status: value });
    setStatus(value);
  };
  const getTime = () => {
    const orderDateTime = new Date(order.createdAt);
    const hours = orderDateTime.getHours();
    const minutes = orderDateTime.getMinutes();
    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const ampm = hours >= 12 ? "PM" : "AM";
    const hours12 = hours % 12;
    const hours12String = hours12 < 10 ? `0${hours12}` : hours12;
    return `${hours12String}:${paddedMinutes} ${ampm}`;
  };
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="grid md:grid-cols-4 justify-between mb-3 gap-4">
            <div>
              Customer Name :
              <span className="ml-2 font-normal">{order.deliveryDetails.name}</span>
            </div>
            <div>
              Delivery Address :
              <span className="ml-2 font-normal">
                {order.deliveryDetails.addressLine1} ,{" "}
                {order.deliveryDetails.city}
              </span>
            </div>
            <div>
              Time:
              <span className="ml-2 font-normal">{getTime()}</span>
            </div>
            <div>
              Total Cost :
              <span className="ml-2 font-normal">
                ${(order.totalAmount / 100).toFixed(2)}
              </span>
            </div>
          </CardTitle>
          <Separator />
          <CardContent className="flex flex-col gap-6">
            {order.cartItems.map((item) => (
              <div className="flex justify-between" key={item.name}>
                <span className="flex gap-2">
                  <Badge variant="outline" className="mr-2 font-bold">
                    {item.quantity}
                  </Badge>
                  {item.name}
                </span>
              </div>
            ))}
            <div className="flex flex-col space-y-1.5">
              <Label className="text-sm">
                What is the status of this order?
              </Label>
              <Select
              value={status}
                disabled={isLoading}
                onValueChange={(value) => onChange(value as OrderStatus)}
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select Status" />
                  {/* popper means natural position*/}
                  <SelectContent position="popper">
                    {orderStatusList.map((status) => (
                      <SelectItem
                        className="cursor-pointer"
                        key={status.value}
                        value={status.value}
                      >
                        {status.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </SelectTrigger>
              </Select>
            </div>
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  );
}
