import React, { useState, useContext, useEffect } from "react";
import { Form, Segment, Grid, Button } from "semantic-ui-react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css";
import { Link } from "react-router-dom";
import AuthContext from "../../context/authcontext/authContext";

function Order() {
  const { loadUser } = useContext(AuthContext);
  useEffect(() => {
    loadUser();
  }, []);

  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  ]);
  return (
    <div className="orderform">
      <Link to="/">
        <h1 style={{ marginTop: "30px", marginLeft: "30px" }}>
          Return to home
        </h1>
      </Link>
      <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="top">
        <Grid.Column style={{ maxWidth: 450 }}>
          <h1 style={{ textAlign: "center" }}>Booking-page</h1>
          <Form size="large" onSubmit={onsubmit}>
            <Segment>
              <Form.Input
                type="text"
                name="guestname"
                placeholder="guestname"
              />
              <Form.Input placeholder="phno" type="text" name="phno" />
              <Form.Input
                type="number"
                placeholder="no of people"
                name="noofpeople"
                min="0"
                max="6"
              />

              <DateRange
                editableDateInputs={true}
                onChange={(item) => setState([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={state}
              />

              <Button style={{ backgroundColor: "#ff7779" }}>BookRoom</Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    </div>
  );
}

export default Order;
