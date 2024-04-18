import { Link } from "react-router-dom";
import { Button } from "./button";
import { useAuth0 } from "@auth0/auth0-react";

export default function MobileNavLinks() {
 const {logout} = useAuth0()
  return (
    <div className="flex flex-col space-y-3">
      <Link
        className="flex bg-white font-bold hover:text-orange-500"
        to="/user-profile"
      >
        Profile
      </Link>
      <Button onClick={() => logout()} className="flex px-3 items-center font-bold  hover:bg-gray-500">
        Logout
      </Button>
    </div>
  );
}
