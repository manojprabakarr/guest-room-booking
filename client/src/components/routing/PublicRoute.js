import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import SellerAuthContext from "../../context/sellerauthcontext/sellerauthContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const authContext = useContext(SellerAuthContext);
  const { isAuthenticated, loading } = authContext;
  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated && !loading ? (
          <Redirect to="/login" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PrivateRoute;
