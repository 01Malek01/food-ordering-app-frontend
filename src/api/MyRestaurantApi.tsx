import { Restaurant } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();
  const getMyRestaurantRequest = async (): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();
    const res = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch restaurant");
    }
    return res.json();
  }

  const {
    data: myRestaurant,
    isLoading,
    error,
    //useQuery hook will return the body of the response in the data variable
  } = useQuery("fetchMyRestaurant", getMyRestaurantRequest);
  if (error) {
    toast.error(error.toString());
  }
  return {
    myRestaurant,
    isLoading,
  };
}
export default function useCreateMyRestaurant() {
  const { getAccessTokenSilently } = useAuth0();
  //we will get back a promise that resolves to a  restaurant
  const createMyRestaurantRequest = async (restaurantFormData: FormData): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();
    const res = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: restaurantFormData, //data is already in the format we want
    });
    if (!res.ok) {
      throw new Error("Failed to create restaurant");
    }
    return res.json();
  };
  const {
    mutateAsync: createRestaurant,
    isLoading,
    error,
    isSuccess,
  } = useMutation(createMyRestaurantRequest);
  if (isSuccess) {
    toast.success("Restaurant created");
  }
  if (error) {
    toast.error("Failed to create restaurant");
  }
  //expose what we need
  return {
    createRestaurant,
    isLoading,
  };
}

export const useUpdateMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();
  const updateMyRestaurantRequest = async (restaurantFormData: FormData): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();
    const res = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: restaurantFormData, //data is already in the format we want
    });
    if (!res.ok) {
      throw new Error("Failed to update restaurant");
    }
    return res.json();
  };

  const {
    mutate: updateRestaurant,
    isLoading,
    error,
    isSuccess,
}= useMutation(updateMyRestaurantRequest);
  if (isSuccess) {
    toast.success("Restaurant updated");
  }
  if (error) {
    toast.error("Failed to update restaurant");
  }
  return {
    updateRestaurant,
    isLoading,
  };
};