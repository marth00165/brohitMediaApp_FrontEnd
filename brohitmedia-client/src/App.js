import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

// Pages
import Home from "./Pages/home";
import Signup from "./Pages/signup";
import Login from "./Pages/login";

// Components
import NavBar from "./Components/NavBar";

const Theme = createMuiTheme({
  palette: {
    primary: {
      main: "#607d8b",
    },
    secondary: {
      main: "#607d8b",
    },
  },
  typography: {
    useNextVariants: true,
  },
});
const App = () => {
  return (
    <MuiThemeProvider theme={Theme}>
      <div className={"app"}>
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
    </MuiThemeProvider>
  );
};

export default App;
