import { useAuth0 } from "@auth0/auth0-react";
import { useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import LoadingButton from "./LoadingButton";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@radix-ui/react-dialog";
import UserProfileForm, {
  UserFormData,
} from "@/forms/user-profile-form/UserProfileForm";
import { useGetMyUser } from "@/api/MyUserApi";
import { X } from "lucide-react";

type Props = {
  onCheckout: (userFormData: UserFormData) => void;
  disabled: boolean;
  isLoading: boolean;
};
export default function CheckoutButton({ onCheckout, disabled, isLoading }: Props) {
  const {
    isAuthenticated,
    isLoading: isAuthLoading,
    loginWithRedirect,
  } = useAuth0();
  const { pathname } = useLocation();
  const { currentUser, isLoading: isGetUserLoading } = useGetMyUser();
  const onLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: pathname, //return to the current page
      },
    });
  };
  if (!isAuthenticated) {
    <Button
      onClick={onLogin}
      className="font-bold text-lg hover:text-orange-500  hover:bg-white"
    >
      Login to checkout
    </Button>;
  }
  if (isAuthLoading || !currentUser|| isLoading) {
    return <LoadingButton />;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          disabled={disabled}
          className="font-bold text-lg flex-1 hover:text-orange-500 hover:bg-white"
        >
          Checkout
        </Button>
      </DialogTrigger>

      <DialogContent className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="relative max-w-[425px] md:min-w-[700px] bg-gray-50 p-6 rounded-lg shadow-lg">
          <DialogClose className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
            <X size={24} />
          </DialogClose>
          <UserProfileForm
            currentUser={currentUser}
            onSave={onCheckout}
            isLoading={isGetUserLoading}
            title="Confirm your delivery details"
            buttonText="Continue to payment" 
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
