import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import Home from "./Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const App = () => (
  <Router>
    <Switch>
      <Route path="/">
        <Home />
      </Route>
    </Switch>
  </Router>
);

export default App;

