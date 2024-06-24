import useCreateMyRestaurant, {
  useGetMyRestaurant,
  useUpdateMyRestaurant,
} from "@/api/MyRestaurantApi";
import { useGetMyOrders } from "@/api/OrderApi";
import OrderItemCard from "@/components/OrderItemCard";
import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ManageRestaurantPage() {
  const { createRestaurant, isLoading: isCreateLoading } =
    useCreateMyRestaurant();
  const { myRestaurant } = useGetMyRestaurant();
  const { updateRestaurant, isLoading: isUpdateLoading } =
    useUpdateMyRestaurant();
  const { orders, isLoading: isOrdersLoading } = useGetMyOrders();
  //the !! means give me the truthy value
  const isEditing = !!myRestaurant; //this will return true if restaurant is not null
  return (
    <Tabs defaultValue="orders">
      <TabsList className="grid grid-cols-2">
        <TabsTrigger value="orders">Orders</TabsTrigger>
        <TabsTrigger value="manage-restaurant">Manage Restaurant</TabsTrigger>
      </TabsList>
      <TabsContent
        value="orders"
        className="space-y-5 p-10 rounded-lg bg-gray-50"
      >
        <h2 className="text-2xl font-bold">{orders?.length} active orders</h2>
        {orders?.map((order) => (
          <OrderItemCard order={order} key={order._id} />
        ))}
      </TabsContent>
      <TabsContent
        value="manage-restaurant"
        className="space-y-5 p-10 rounded-lg bg-gray-50"
      >
        <ManageRestaurantForm
          restaurant={myRestaurant}
          onSave={isEditing ? updateRestaurant : createRestaurant}
          isLoading={isCreateLoading || isUpdateLoading}
        />
      </TabsContent>
    </Tabs>
  );
}
