import { useAuth0 } from "@auth0/auth0-react";
import { useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import LoadingButton from "./LoadingButton";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import UserProfileForm, {
  UserFormData,
} from "@/forms/user-profile-form/UserProfileForm";
import { useGetMyUser } from "@/api/MyUserApi";

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

      <DialogContent className="">
          <UserProfileForm
            currentUser={currentUser}
            onSave={onCheckout}
            isLoading={isGetUserLoading}
            title="Confirm your delivery details"
            buttonText="Continue to payment" 
          />
      </DialogContent>
    </Dialog>
  );
}
