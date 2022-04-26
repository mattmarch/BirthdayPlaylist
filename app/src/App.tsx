import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Home from "./Home";
import SpotifyLoggedIn from "./SpotifyLoggedIn";
import { AuthProvider, useAuth } from 'react-oidc-context'
import { UserManagerSettings } from 'oidc-client-ts'

const oidcConfig: UserManagerSettings = {
  authority: "https://accounts.spotify.com/authorize",
  client_id: "6c0a042391fa42e8ac96a5eed4306dfe",
  redirect_uri: "http://localhost:3000/login-redirect",
  scope: "playlist-modify-public",
  metadata: {
    issuer: "https://accounts.spotify.com",
    authorization_endpoint: "https://accounts.spotify.com/oauth2/v2/auth",
    token_endpoint: "https://accounts.spotify.com/api/token",
    userinfo_endpoint: "https://accounts.spotify.com/oidc/userinfo/v1",
    end_session_endpoint: "https://accounts.spotify.com/oauth2/revoke/v1"
  }
}

const App = () => (
  <AuthProvider {...oidcConfig}>
    <BrowserRouter>
      <Switch>
        <Route path="login-redirect">
          <LoginRedirect />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>

  </AuthProvider>
);

const LoginRedirect = () => {
  console.log("Login redirect")
  const auth = useAuth()
  if (!auth.isLoading) {
    return <Redirect to="/" />
  }
  return <div>loading...</div>
}

export default App;
