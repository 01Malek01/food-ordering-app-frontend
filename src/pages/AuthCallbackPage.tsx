import { useCreateMyUser } from "@/api/MyUserApi";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
//this is the page that handles the callback from the auth0 login
export default function AuthCallbackPage() {
  const navigate = useNavigate();
  const { user } = useAuth0(); //to have access to the current logged in user
  const { createUser } = useCreateMyUser();
  //we used useRef  to only create the user once and make sure it runs only once
  const hasCreatedUser = useRef(false);
  useEffect(() => {
    if (user?.sub && user?.email && !hasCreatedUser.current) {
      createUser({
        auth0Id: user.sub, //sub contains the id
        email: user.email,
      });
      hasCreatedUser.current = true;
    }
    navigate("/");
  }, [user, createUser, navigate]);
  return <>Loading...</>;
}
