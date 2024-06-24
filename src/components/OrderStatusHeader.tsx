import { Order } from "@/types";
import { Progress } from "./ui/progress";
import { orderStatusList } from "@/config/order-status-config";

type Props = {
  order: Order;
};

export default function OrderStatusHeader({ order }: Props) {
  const getExpectedDelivery = () => {
    const created = new Date(order.createdAt);
    created.setMinutes(
      created.getMinutes() + order.restaurant.estimatedDeliveryTime
    );

    let hours = created.getHours();
    const minutes = created.getMinutes();

    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    // Determine AM or PM
    const ampm = hours >= 12 ? "PM" : "AM";

    // Convert hours to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'

    return `${hours}:${paddedMinutes} ${ampm}`;
  };

  const getOrderStatus = () => {
   return orderStatusList.find((status) => status.value === order.status) || orderStatusList[0];
  }
  return (
    <>
      <h1 className="text-4xl font-bold tracking-tighter flex flex-col md:flex-row gap-5 md:justify-between  ">
        <span>Order status :{getOrderStatus().label}</span>
        <span>Expected by :{getExpectedDelivery()}</span>
      </h1>
      <Progress className="animate-pulse" value={getOrderStatus().progressValue} />
    </>
  );
}
