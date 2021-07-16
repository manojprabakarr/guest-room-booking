import React from "react";
import "semantic-ui-css/semantic.min.css";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//context provider
import AuthState from "./context/authcontext/authState";
import SellerAuthState from "./context/sellerauthcontext/sellerauthState";
import GuestState from "./context/guestcontext/guestState";
import AuthToken from "./utils/authtoken";

//route pages
import Login from "./components/userauth/login";
import Register from "./components/userauth/register";
import Userdashboard from "./components/dashboard/userdashboard";
import PrivateRoute from "./components/routing/PrivateRoute";
import PublicRoute from "./components/routing/PublicRoute";
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
            <Router>
              <div>
                <Navbar />
                <Switch>
                  <PrivateRoute exact path="/" component={Userdashboard} />

                  <PublicRoute
                    exact
                    path="/hosthome"
                    component={Sellerdashboard}
                  />

                  <Route exact path="/login" component={Login} />

                  <Route exact path="/register" component={Register} />

                  <Route exact path="/authlogin" component={Authlogin} />

                  <Route exact path="/authregister" component={Authregister} />

                  <PrivateRoute
                    exact
                    path="/searchpage"
                    component={Searchpage}
                  />
                </Switch>
              </div>
            </Router>
          </GuestState>
        </SellerAuthState>
      </AuthState>
    </div>
  );
}

export default App;
