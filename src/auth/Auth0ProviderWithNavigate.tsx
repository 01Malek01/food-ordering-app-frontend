//Auth0 uses context api under the hood so to access its features we need to create a provider
//here we type the code that uses the SDK (software development kit) to connect to our auth0 account
//we moved the token logic to another file instead of putting it in the onRedirectCallback function as the onRedirectCallback function is outside the provider and don't have access to the auth0 hook
import React from "react";
import {  Auth0Provider } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};
function Auth0ProviderWithNavigate({ children }: Props) {
  const navigate = useNavigate();
  //define credentials that we need to access our auth0 account
  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_AUTH0_CALLBACK_URL;
  const audience = import.meta.env.VITE_AUTH0_AUDIENCE;

  if (!domain || !clientId || !redirectUri|| !audience) {
    throw new Error("Missing Auth0 environment variables");
  }
  //the appState is going to contain some stored data that we might need when the user gets redirected back to our app after the login
  // hte user variable contains some information about the user like id and email address
  const onRedirectCallback = () => {
   navigate('/auth-callback')
  };
  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{ redirect_uri: redirectUri,
      audience,
      }}
      
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
}

export default Auth0ProviderWithNavigate;
