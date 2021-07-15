import React, { useState, useContext, useEffect } from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/authcontext/authContext";

function Login(props) {
  const { login, isAuthenticated, error, clearErrors } =
    useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/");
    }
    // eslint-disable-next-line
  }, [isAuthenticated, props.history]);

  const intialstate = {
    email: "",
    password: "",
  };

  const [user, setUser] = useState(intialstate);
  const { email, password } = user;

  const onchange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const onsubmit = (e) => {
    e.preventDefault();
    if (!(email || password)) {
      alert("all feilds required");
      return;
    }
    login({
      email,
      password,
    });
    setUser(intialstate);
  };
  return (
    <div className="login">
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
            Guestroom-Login
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
            New user? <Link to="/register">Signup</Link>
          </Message>
        </Grid.Column>
      </Grid>
    </div>
  );
}

export default Login;
