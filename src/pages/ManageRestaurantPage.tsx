import useCreateMyRestaurant, {
  useGetMyRestaurant,
  useUpdateMyRestaurant,
} from "@/api/MyRestaurantApi";
import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm";

export default function ManageRestaurantPage() {
  const { createRestaurant, isLoading:isCreateLoading } = useCreateMyRestaurant();
  const { myRestaurant } = useGetMyRestaurant();
  const { updateRestaurant, isLoading:isUpdateLoading } = useUpdateMyRestaurant();

  //the !! means give me the truthy value 
  const isEditing = !! myRestaurant; //this will return true if restaurant is not null
  return (
    <ManageRestaurantForm
      restaurant={myRestaurant}
      onSave={isEditing ? updateRestaurant : createRestaurant}
      isLoading={isCreateLoading || isUpdateLoading}
    />
  );
}
