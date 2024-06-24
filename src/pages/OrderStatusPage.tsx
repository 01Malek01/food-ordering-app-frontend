import { useGetMyOrders } from "@/api/OrderApi"
import OrderStatusDetail from "@/components/OrderStatusDetail";
import OrderStatusHeader from "@/components/OrderStatusHeader";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";


export default function OrderStatusPage() {
 const {orders,isLoading} = useGetMyOrders();
 if(isLoading) return <div className="text-center text-4xl font-bold mt-5 ">Loading...</div>
 if(!orders || orders.length === 0) return <div>No orders found</div>
 return (
    <div className="space-y-10 ">
      {orders.map((order) => (
        <div key={order._id} className="space-y-10 bg-gray-50 p-10 rounded-lg">
          <OrderStatusHeader order = {order}/>
          <div className="grid gap-10 md:grid-cols-2">
            <OrderStatusDetail order = {order}/>
            <AspectRatio ratio={16 / 9}>
            <img src={order.restaurant.imageUrl} alt="restaurant image" className="w-full rounded-md h-full  object-cover" />
            </AspectRatio>
          </div>
        </div>
      ))}
      
    </div>
  )
}
