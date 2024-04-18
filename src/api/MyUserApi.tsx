//here are all the hooks we we need to interact with the /api/my/user endpoint
//we add this fetch hook to auth0 provider

import { useAuth0, User } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();
  const getMyUserRequest = async (): Promise<User> => {
    const accessToken = await getAccessTokenSilently();
    const res = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch user");
    }
    return res.json();
  };
  //destructuring the stuff we get from react query hook
  const {
    data: currentUser,
    isLoading,
    error,
    //whenever we want to fetch data from react query we use useQuery hook. once it's finished it will return the data json
  } = useQuery("fetchCurrentUser", getMyUserRequest);
  if (error) {
    toast.error(error.toString());
  }
  return { currentUser, isLoading };
};
//this type describes all the properties of the request body
type CreateUserRequest = {
  auth0Id: string;
  email: string;
};

//custom hook that we will pass to useMutation hook that comes from react query
export const useCreateMyUser = () => {
  //getting the function that retrieves the access token form the auth0 server so everything is handled by auth0
  const { getAccessTokenSilently } = useAuth0(); //will handel refresh token ,expiration and that stuff
  const useCreateMyUserRequest = async (user: CreateUserRequest) => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (!response.ok) {
      throw new Error("Failed to create user");
    }
  };
  //destructuring the stuff we get from react query hook

  const {
    mutateAsync: createUser,
    isLoading,
    isError,
    isSuccess,
  } = useMutation(useCreateMyUserRequest); //here we pass out fetch request so it manages states like loading and error
  return { createUser, isLoading, isError, isSuccess };
};

type UpdateMyUserRequest = {
  name: string;
  addressLine1: string;
  city: string;
  country: string;
};
export const useUpdateMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateMyUserRequest = async (formData: UpdateMyUserRequest) => {
    const accessToken = await getAccessTokenSilently();
    const res = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      throw new Error("Failed to update user");
    }
    return res.json();
  };
  //now pass this fetch request to the useMutation hook so react query handles it
  //destructuring the stuff we get from react query hook

  const {
    mutateAsync: updateUser,
    isLoading,
    isError,
    isSuccess,
    error,
    reset,
  } = useMutation(updateMyUserRequest);
  if (isSuccess) {
    toast.success("User Profile updated successfully");
  }
  if (error) {
    toast.error(error?.toString());
    reset(); //clears the error state
  }
  //return things we exposing so we can use them in our components
  return {
    updateUser,
    isLoading,
  };
};
