import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import Home from "./Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SpotifyLoggedIn from "./SpotifyLoggedIn";

const App = () => (
  <Router>
    <Switch>
      <Route path="/spotify-callback">
        <SpotifyLoggedIn/>
      </Route>
      <Route path="/">
        <Home />
      </Route>
    </Switch>
  </Router>
);

export default App;

