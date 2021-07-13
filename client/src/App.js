import React from "react";
import "semantic-ui-css/semantic.min.css";
//import logo from "./logo.svg";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/userauth/login";
import Register from "./components/userauth/register";
import Userdashboard from "./components/dashboard/userdashboard";
import AuthState from "./context/authcontext/authState";
import AuthToken from "./utils/authtoken";
import PrivateRoute from "./components/routing/PrivateRoute";

if (localStorage.token) {
  AuthToken(localStorage.token);
}
function App() {
  return (
    <div className="App">
      <AuthState>
        <Router>
          <div>
            <Switch>
              <PrivateRoute exact path="/" component={Userdashboard} />

              <Route exact path="/login" component={Login} />

              <Route exact path="/register" component={Register} />
            </Switch>
          </div>
        </Router>
      </AuthState>
    </div>
  );
}

export default App;
