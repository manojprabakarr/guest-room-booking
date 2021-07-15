import React, { useState, useContext, useEffect } from "react";
import {
  Button,
  Form,
  Segment,
  Grid,
  Image,
  TextArea,
} from "semantic-ui-react";
import GuestContext from "../../context/guestcontext/guestContext";
import axios from "axios";

function Sellerform() {
  const context = useContext(GuestContext);
  const { addGuest, editGuest, clearEdit, update_Guest } = context;

  useEffect(() => {
    if (editGuest !== null) {
      setpost(editGuest);
    } else {
      setpost(intialState);
    }
  }, [editGuest, context]);

  //refresh state
  const intialState = {
    location: "",
    description: "",
    price_perday: "",
    maximum_stay: "",
    postimage: "",
  };

  const [post, setpost] = useState(intialState);

  const { location, description, price_perday, maximum_stay, postimage } = post;
  onchange = (e) => {
    setpost({ ...post, [e.target.name]: e.target.value });
  };

  const onsubmit = async (e) => {
    e.preventDefault();
    if (
      !(location || description || price_perday || maximum_stay || postimage)
    ) {
      alert("all feilds required");
      return;
    }
    if (editGuest === null) {
      addGuest(post);
    } else {
      update_Guest(post);
    }
    setpost(intialState);
  };

  return (
    <div className="form">
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <h1>{editGuest !== null ? "Edit Guest" : "Add guest"}</h1>
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
              />
              <Form.Input
                placeholder="maximum  days they can stay"
                type="number"
                name="maximum_stay"
                value={maximum_stay}
                onChange={onchange}
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
                value={postimage}
                onChange={onchange}
                //accept=".png, .jpg, .jpeg"
              />

              <input
                type="submit"
                value={editGuest !== null ? "Update Guest" : "Add Guest"}
                className="btn"
              />
              {editGuest !== null ? (
                <input
                  onClick={clearEdit}
                  type="button"
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
