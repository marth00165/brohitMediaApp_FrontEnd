import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

// Pages
import Home from "./Pages/home";
import Signup from "./Pages/signup";
import Login from "./Pages/login";

// Components
import NavBar from "./Components/NavBar";

const App = () => {
  return (
    <div>
      <Router>
        <NavBar />
        <div className={"container"}>
          <Switch>
            <Route exact path={"/"} component={Home} />
            <Route exact path={"/login"} component={Login} />
            <Route exact path={"/signup"} component={Signup} />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
