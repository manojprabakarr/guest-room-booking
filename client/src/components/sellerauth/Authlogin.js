import React, { useState, useEffect, useContext } from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import SellerAuthContext from "../../context/sellerauthcontext/sellerauthContext";

function Authlogin(props) {
  const { login, error, isAuthenticated, clearErrors, setError } =
    useContext(SellerAuthContext);

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/hosthome");
    }
    // eslint-disable-next-line
  }, [isAuthenticated, props.history]);

  const [userdata, setuserdata] = useState({
    name: "",
    email: "",
    password: "",
    phno: "",
    password1: "",
  });

  const { email, password } = userdata;

  onchange = (e) => {
    setuserdata({ ...userdata, [e.target.name]: e.target.value });
  };

  const onsubmit = (e) => {
    e.preventDefault();
    login({
      email,
      password,
    });
  };

  return (
    <div className="authlogin">
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header
            as="h2"
            style={{
              color: "#ff7779",
              marginBottom: "30px",
              fontFamily: "ubuntu",
            }}
            textAlign="center"
          >
            Guestroom-Hoster-Login
          </Header>
          <Form size="large" onSubmit={onsubmit}>
            <Segment>
              <Form.Input
                placeholder="email"
                type="email"
                name="email"
                value={email}
                onChange={onchange}
                style={{ marginTop: "30px", marginBottom: "30px" }}
              />

              <Form.Input
                placeholder="Password"
                style={{ marginBottom: "30px" }}
                type="password"
                name="password"
                value={password}
                onChange={onchange}
              />

              <Button
                type="submit"
                fluid
                style={{ backgroundColor: "#ff7779", marginBottom: "30px" }}
                size="large"
              >
                Login
              </Button>
            </Segment>
          </Form>
          <Message>
            New user? <Link to="/authregister">Signup</Link>
          </Message>
        </Grid.Column>
      </Grid>
    </div>
  );
}

export default Authlogin;
