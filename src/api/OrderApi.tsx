import { Order } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetMyOrders = () => {
  const { getAccessTokenSilently } = useAuth0();
  const getMyOrdersRequest = async ():Promise<Order[]> => {
    const accessToken = await getAccessTokenSilently();
    const res = await fetch(`${API_BASE_URL}/api/order`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!res.ok) {
      throw new Error("Failed to get my order");
    }
    return res.json();
  };
  const { isLoading, data: orders } = useQuery(
    "fetchMyOrder",
    getMyOrdersRequest,
    {
      refetchInterval: 5000, // refetch every 5 seconds
    }
  );
  return {
    orders,
    isLoading,
  };
};

type CheckoutSessionRequest = {
  cartItems: {
    name: string;
    menuItemId: string;
    quantity: string; //received as string from frontend
  }[];
  deliveryDetails: {
    email: string;
    addressLine1: string;
    city: string;
    name: string;
  };
  restaurantId: string;
};
export const useCreateCheckoutSession = () => {
  const { getAccessTokenSilently } = useAuth0();
  const createCheckoutSessionRequest = async (
    checkoutSessionRequest: CheckoutSessionRequest
  ) => {
    const accessToken = await getAccessTokenSilently();
    const res = await fetch(
      `${API_BASE_URL}/api/order/checkout/create-checkout-session`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(checkoutSessionRequest),
      }
    );
    if (!res.ok) {
      throw new Error("Failed to create checkout session");
    }
    return res.json();
  };
  const {
    mutateAsync: createCheckoutSession,
    isLoading,
    error,
    reset,
  } = useMutation(createCheckoutSessionRequest);
  if (error) {
    toast.error(error.toString());
    reset(); //reset error
  }
  return {
    createCheckoutSession,
    isLoading,
  };
};
