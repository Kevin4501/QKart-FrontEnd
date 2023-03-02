import Register from "./components/Register";
import ipConfig from "./ipConfig.json";
import { Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import Products from "./components/Products";
import { ThemeProvider } from "@mui/material";
import theme from "./theme.js";
import Checkout from "./components/Checkout";
import Thanks from "./components/Thanks"
export const config = {
  endpoint: `http://${ipConfig.workspaceIp}:8082/api/v1`,
};

// eslint-disable-next-line no-lone-blocks
{
  /* <Router>
    <div>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/news">
        <NewsFeed />
      </Route>
    </div>
  </Router> */
}

function App() {
  return (
    <div className="App">
      {/* TODO: CRIO_TASK_MODULE_LOGIN - To add configure routes and their mapping */}
      {/* <Register /> */}
      <Switch>
        <Route exact path="/" >
          <ThemeProvider theme={theme}>
            <Products />
          </ThemeProvider>
        </Route>

        <Route path="/login" >
          <ThemeProvider theme={theme}>
            <Login />
          </ThemeProvider>
        </Route>

        <Route path="/register">
          <ThemeProvider theme={theme}>
            <Register />
          </ThemeProvider>
        </Route>

        
        <Route path="/checkout">
          <ThemeProvider theme={theme}>
            <Checkout />
          </ThemeProvider>
        </Route>

        <Route path="/thanks">
          <ThemeProvider theme={theme}>
            <Thanks />
          </ThemeProvider>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
