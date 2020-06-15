import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import { HashRouter, Route, Switch } from "react-router-dom";
import Home from "./Home";
import SpotifyLoggedIn from "./SpotifyLoggedIn";

const App = () => (
  <HashRouter>
    <Switch>
      <Route path={["/access_token=*", "/error=*"]}>
        <SpotifyLoggedIn />
      </Route>
      <Route path="/">
        <Home />
      </Route>
    </Switch>
  </HashRouter>
);

export default App;
