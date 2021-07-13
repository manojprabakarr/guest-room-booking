import React, { useState } from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
} from "semantic-ui-react";
import { Link } from "react-router-dom";

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const { email, password } = user;

  const onchange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
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
          <Form size="large">
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
