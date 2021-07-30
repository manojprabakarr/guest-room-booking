import React from "react";
import "semantic-ui-css/semantic.min.css";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//context provider
import AuthState from "./context/authcontext/authState";
import SellerAuthState from "./context/sellerauthcontext/sellerauthState";
import GuestState from "./context/guestcontext/guestState";
import OrderState from "./context/ordercontext/orderState";
import AuthToken from "./utils/authtoken";

//routers
import PrivateRoute from "./components/routing/PrivateRoute";
import PublicRoute from "./components/routing/PublicRoute";

//route pages
import Login from "./components/userauth/login";
import Register from "./components/userauth/register";
import Userdashboard from "./components/dashboard/userdashboard";
import Navbar from "./components/layout/Navbar";
import Sellerdashboard from "./components/dashboard/sellerdashboard";
import Authlogin from "./components/sellerauth/Authlogin";
import Authregister from "./components/sellerauth/Authregister";
import Searchpage from "./components/dashboard/Searchpage";
import "./App.css";

if (localStorage.token) {
  AuthToken(localStorage.token);
}
function App() {
  return (
    <div className="App">
      <AuthState>
        <SellerAuthState>
          <GuestState>
            <OrderState>
              <Router>
                <div>
                  <Navbar />
                  <Switch>
                    <PrivateRoute exact path="/" component={Userdashboard} />

                    <PrivateRoute
                      exact
                      path="/searchpage"
                      component={Searchpage}
                    />

                    <PublicRoute
                      exact
                      path="/hosthome"
                      component={Sellerdashboard}
                    />

                    <Route exact path="/login" component={Login} />

                    <Route exact path="/register" component={Register} />

                    <Route exact path="/authlogin" component={Authlogin} />

                    <Route
                      exact
                      path="/authregister"
                      component={Authregister}
                    />
                  </Switch>
                </div>
              </Router>
            </OrderState>
          </GuestState>
        </SellerAuthState>
      </AuthState>
    </div>
  );
}

export default App;
