import { useAuth0 } from "@auth0/auth0-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { CircleUserRound } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./button";

export default function UsernameMenu() {
  const { user, logout } = useAuth0();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center px-3 font-bold hover:text-orange-500 gap-2">
        <CircleUserRound className="text-orange-500" />
        Hello , {user?.given_name}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="">
        <div className="bg-slate-200 rounded-lg p-1">

        <DropdownMenuItem>
          <Link to="/manage-restaurant" className="font-bold hover:text-orange-500">
            Manage Restaurant
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link to="/user-profile" className="font-bold hover:text-orange-500">
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Button
            onClick={() => logout()}
            className="font-bold flex-1 flex hover:text-orange-500"
            >
            Logout
          </Button>
        </DropdownMenuItem>
            </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
