export type User = {
  _id: string;
  email: string;
  name: string;
  addressLine1: string;
  city: string;
  country: string;
};

export type Restaurant = {
  _id: string;
  user: string;
  restaurantName: string;
  city: string;
  country: string;
  deliveryPrice: number;
  estimatedDeliveryTime: number;
  cuisines: string[];
  menuItems: MenuItem[];
  imageUrl: string;
  lastUpdated: string;
};

export type MenuItem = {
  _id: string;
  name: string;
  price: number;
};

export type RestaurantSearchResponse = {
  data: Restaurant[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
};

export type Order = {
  _id: string;
  user: string;
  restaurant: Restaurant;
  cartItems: {
    menuItemId: string;
    quantity: number;
    name: string;
  }[];
  deliveryDetails: {
    email: string;
    addressLine1: string;
    city: string;
    name: string;
  };

  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
  restaurantId: string;
};

export type OrderStatus =
  | "placed"
  | "paid"
  | "inProgress"
  | "outForDelivery"
  | "delivered";
