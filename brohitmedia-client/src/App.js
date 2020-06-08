import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import themeObject from "./util/theme";
import jwtDecode from "jwt-decode";
// Redux
import { Provider } from "react-redux";
import store from "./redux/store";

// Pages
import Home from "./Pages/home";
import Signup from "./Pages/signup";
import Login from "./Pages/login";

// Components
import NavBar from "./Components/NavBar";
import Authroute from "./util/Authroute";

const theme = createMuiTheme(themeObject);

let authenticated;
const token = localStorage.getItem("FBIdToken");

if (token) {
  const decodedToken = jwtDecode(token);
  authenticated = decodedToken.exp * 1000 >= Date.now();
}

const App = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <NavBar />
          <div className={"container"}>
            <Switch>
              <Route exact path={"/"} component={Home} />
              <Authroute
                exact
                path={"/login"}
                component={Login}
                authenticated={authenticated}
              />
              <Authroute
                exact
                path={"/signup"}
                component={Signup}
                authenticated={authenticated}
              />
            </Switch>
          </div>
        </Router>
      </Provider>
    </MuiThemeProvider>
  );
};

export default App;
