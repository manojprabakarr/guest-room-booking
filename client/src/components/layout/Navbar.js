import React, { useContext, Fragment } from "react";
import { Menu, Segment, Header } from "semantic-ui-react";
import AuthContext from "../../context/authcontext/authContext";
import { Link } from "react-router-dom";

function Navbar() {
  const { isAuthenticated, user, logout, clearErrors } =
    useContext(AuthContext);

  const onLogout = () => {
    logout();
    clearErrors();
  };

  const authLinks = (
    <Fragment>
      <Menu.Item name={user && user.name} />

      <Menu.Item name="Explore rooms" />

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

        <Menu.Item name="hostyourhome" />
      </div>
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

          {isAuthenticated ? authLinks : guestLinks}
        </Menu>
      </Segment>
    </div>
  );
}

export default Navbar;
