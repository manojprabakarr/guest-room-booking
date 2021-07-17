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

const Register = (props) => {
  const { register, error, isAuthenticated, clearErrors } =
    useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/");
    }
  }, [isAuthenticated, props.history]);

  const [user, setuser] = useState({
    name: "",
    email: "",
    password: "",
    phno: "",
    password1: "",
  });

  const { name, email, password, phno } = user;

  onchange = (e) => {
    setuser({ ...user, [e.target.name]: e.target.value });

    if (error !== null) {
      clearErrors();
    }
  };

  onsubmit = (e) => {
    e.preventDefault();

    register({
      name,
      email,
      phno,
      password,
    });
  };

  return (
    <div className="register">
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
            Guestroom-Signup
          </Header>
          <Form size="large">
            <Segment>
              <Form.Input
                type="text"
                name="name"
                placeholder="name"
                value={name}
                onChange={onchange}
                style={{ marginBottom: "30px", marginTop: "30px" }}
              />

              <Form.Input
                placeholder="email"
                type="email"
                name="email"
                value={email}
                onChange={onchange}
                style={{ marginBottom: "30px" }}
              />

              <Form.Input
                placeholder="phno"
                type="phno"
                name="phno"
                value={phno}
                onChange={onchange}
                style={{ marginBottom: "30px" }}
              />

              <Form.Input
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={onchange}
                style={{ marginBottom: "30px" }}
              />

              {error !== null && (
                <button className="danger" type="button">
                  {error} <span onClick={() => clearErrors()}>X</span>
                </button>
              )}

              <Button
                fluid
                type="submit"
                style={{ backgroundColor: "#ff7779 ", marginBottom: "30px" }}
                size="large"
              >
                Register
              </Button>
            </Segment>
          </Form>
          <Message>
            Already have an account? <Link to="/login">signin</Link>
          </Message>
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default Register;
