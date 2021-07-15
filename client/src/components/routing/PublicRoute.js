import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import SellerAuthContext from "../../context/sellerauthcontext/sellerauthContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const sellerauthContext = useContext(SellerAuthContext);
  const { isAuthencated, loading } = sellerauthContext;
  //console.log(isAuthenticated);
  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthencated && !loading ? (
          <Redirect to="/authlogin" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PrivateRoute;
