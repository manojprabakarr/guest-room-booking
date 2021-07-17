import React, { useState, useContext, useEffect } from "react";
import { Form, Segment, Grid, TextArea } from "semantic-ui-react";
import GuestContext from "../../context/guestcontext/guestContext";

function Sellerform() {
  const context = useContext(GuestContext);
  const { addGuest, editGuest, update_Guest, clearEdit } = context;

  useEffect(() => {
    if (editGuest !== null) {
      setguest(editGuest);
    } else {
      setguest({
        location: "",

        price_perday: "",
        maximum_stay: "",
        description: "",
        postimage: "",
      });
    }
  }, [editGuest]);

  const [guest, setguest] = useState({
    location: "",

    price_perday: "",
    maximum_stay: "",
    description: "",
    postimage: "",
  });

  const { location, description, price_perday, maximum_stay, postimage } =
    guest;
  const onchange = (e) => {
    setguest({ ...guest, [e.target.name]: e.target.value });
  };

  const onsubmit = async (e) => {
    e.preventDefault();

    if (editGuest === null) {
      addGuest(guest);
      alert("add successfully");
    } else {
      update_Guest(guest);
    }
    setguest({
      location: "",

      price_perday: "",
      maximum_stay: "",
      description: "",
      postimage: "",
    });
  };

  return (
    <div className="form">
      <Grid
        textAlign="center"
        style={{ height: "100vh", width: "500px", minWidth: "100px" }}
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <h1>Add guest</h1>
          <Form size="large" onSubmit={onsubmit}>
            <Segment>
              <Form.Input
                type="text"
                name="location"
                value={location}
                onChange={onchange}
                placeholder="location"
              />
              <Form.Input
                placeholder="price perday"
                type="number"
                name="price_perday"
                value={price_perday}
                onChange={onchange}
                min="0"
              />
              <Form.Input
                placeholder="maximum  days they can stay"
                type="number"
                name="maximum_stay"
                value={maximum_stay}
                onChange={onchange}
                max="30"
                min="0"
              />
              <TextArea
                name="description"
                value={description}
                onChange={onchange}
                placeholder="decription"
                style={{ marginBottom: "15px" }}
              />
              <Form.Input
                type="text"
                name="postimage"
                placeholder="image url"
                value={postimage}
                onChange={onchange}
              />
              <Form.Input
                type="submit"
                value={editGuest !== null ? "Update Guest" : "Add Guest"}
                className="btn"
              />
              {editGuest !== null ? (
                <Form.Input
                  type="button"
                  onClick={clearEdit}
                  className="btn clear"
                  value="Cancel"
                />
              ) : null}
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    </div>
  );
}

export default Sellerform;
