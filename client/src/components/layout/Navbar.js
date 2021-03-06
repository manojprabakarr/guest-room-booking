import React, { useContext, Fragment } from "react";
import { Menu, Segment } from "semantic-ui-react";
import AuthContext from "../../context/authcontext/authContext";
import SellerAuthContext from "../../context/sellerauthcontext/sellerauthContext";
import { Link } from "react-router-dom";

function Navbar() {
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const { isAuthencated, seller, sellerlogout } = useContext(SellerAuthContext);

  const onLogout = () => {
    logout();
  };

  const Close = () => {
    sellerlogout();
  };

  const authLinks = (
    <Fragment>
      <Menu.Item name={user && user.name} />

      <Link to="/searchpage">
        <Menu.Item name="Explore rooms" />
      </Link>

      <Menu.Item onClick={onLogout} name="logout" />
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Link to="/register">
          <Menu.Item name="register" />
        </Link>

        <Link to="/authregister">
          <Menu.Item name="hostyourhome" />
        </Link>
      </div>
    </Fragment>
  );

  const sellerLinks = (
    <Fragment>
      <Menu.Item name={seller && seller.name} />
      <Menu.Item onClick={Close} name="logout" />
    </Fragment>
  );

  return (
    <div className="navbar">
      <Segment inverted>
        <Menu inverted>
          <Menu.Item
            style={{
              color: "#ff7779",
              fontFamily: "ubuntu",
              fontSize: "large",
            }}
            name="Guestroom-application"
          />

          {isAuthenticated
            ? authLinks
            : isAuthencated
            ? sellerLinks
            : guestLinks}
        </Menu>
      </Segment>
    </div>
  );
}

export default Navbar;
