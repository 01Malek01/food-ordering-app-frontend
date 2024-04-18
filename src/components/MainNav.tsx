import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "./ui/button";
import UsernameMenu from "./ui/UsernameMenu";

export default function MainNav() {
  //this is a hook that gives us access to lots of nice things
  //loginWithRedirect will send the user to the auth0 login or register page
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  return (
    <span className="flex space-x-2 items-center">
      {isAuthenticated ? (
        <UsernameMenu />
      ) : (
        <Button
          onClick={async () => {
            await loginWithRedirect();
          }}
          variant="ghost"
          className="font-bold text-lg hover:text-orange-500  hover:bg-white"
        >
          {/*the ghost variant removes most of the button styles */}
          Login
        </Button>
      )}
    </span>
  );
}
