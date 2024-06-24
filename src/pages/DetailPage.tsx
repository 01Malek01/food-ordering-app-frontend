import { useParams } from "react-router-dom";
import { useGetRestaurant } from "../api/RestaurantApi";
import { AspectRatio } from "../components/ui/aspect-ratio";
import RestaurantInfo from "@/components/RestaurantInfo";
import MenuItem from "../components/MenuItem";
import { useState } from "react";
import { Card, CardFooter } from "@/components/ui/card";
import OrderSummary from "@/components/OrderSummary";
import { MenuItem as MenuItemType } from "@/types";
import CheckoutButton from "@/components/CheckoutButton";
import { UserFormData } from "@/forms/user-profile-form/UserProfileForm";
import { useCreateCheckoutSession } from "@/api/OredrApi";

export type CartItem = {
  _id: string;
  name: string;
  price: number;

  quantity: number;
};
export default function DetailPage() {
  const { restaurantId } = useParams();
  const { restaurant, isLoading } = useGetRestaurant(restaurantId);
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const storedCartItems = sessionStorage.getItem(`cartItems-${restaurantId}`);
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });
  const { createCheckoutSession, isLoading: isCheckoutLoading } =
    useCreateCheckoutSession();

  const removeFromCart = (cartItem: CartItem) => {
    setCartItems((prevItems) => {
      const updatedCartItems = prevItems.filter(
        (item) => item._id !== cartItem._id
      );
      sessionStorage.setItem(
        `cartItems-${restaurantId}`,
        JSON.stringify(updatedCartItems)
      );
      return updatedCartItems;
    });
  };
  const addToCart = (menuItem: MenuItemType) => {
    let updatedCartItems: CartItem[] = [];
    setCartItems((prevItems) => {
      //1. check if the item is already in cart
      const existingItem = prevItems.find((item) => item._id === menuItem._id);
      //2. if it is, update the quantity
      if (existingItem) {
        updatedCartItems = prevItems.map((item) =>
          item._id === menuItem._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        //3. if it is not, add the item to the cart
        updatedCartItems = [
          ...prevItems,
          {
            _id: menuItem._id,
            name: menuItem.name,
            price: menuItem.price,
            quantity: 1,
          },
        ];
      }
      sessionStorage.setItem(
        `cartItems-${restaurantId}`,
        JSON.stringify(updatedCartItems)
      );
      return updatedCartItems;
    });
  };
  const onCheckout = async (userFormData: UserFormData) => {
    if(!restaurant) return;

    const checkoutData = {
      cartItems: cartItems.map((item) => ({
        menuItemId: item._id,
        quantity: item.quantity.toString(),
        name: item.name,
      })),
      restaurantId: restaurant?._id,
      deliveryDetails: {
        name: userFormData.name,
        email: userFormData.email as string,
        addressLine1: userFormData.addressLine1,
        city: userFormData.city,
        country: userFormData.country,
      },
    };
    const data = await createCheckoutSession(checkoutData);
    window.location.href = data.url; //url we get back in the response ot take user to stripe page
  };
  if (isLoading || !restaurant) {
    return (
      <div className="text-center text-4xl font-bold mt-5 ">Loading...</div>
    );
  }
  return (
    <>
      <div className="flex flex-col gap-10">
        <AspectRatio ratio={16 / 5} className="z-[-1]">
          <img
            src={restaurant.imageUrl}
            alt="restaurant image"
            className="rounded-md w-full h-full object-cover"
          />
        </AspectRatio>
        <div className="grid grid-cols-1 md:grid-cols-[4fr_2fr] gap-5 md:px-32">
          <div className="flex flex-col gap-4">
            <RestaurantInfo restaurant={restaurant} />
            <span className="text-3xl font-bold tracking-tight">Menu</span>
            {restaurant.menuItems.map((menuItem, index) => (
              <MenuItem
                addToCart={() => addToCart(menuItem)}
                menuItem={menuItem}
                key={index}
              />
            ))}
          </div>
          <div className="text-center text-2xl font-bold ">
            <Card>
              <OrderSummary
                restaurant={restaurant}
                cartItems={cartItems}
                removeFromCart={removeFromCart}
              />
              <CardFooter>
                <CheckoutButton
                  disabled={!cartItems.length || cartItems.length === 0}
                  onCheckout={onCheckout}
                  isLoading={isCheckoutLoading}
                />
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
