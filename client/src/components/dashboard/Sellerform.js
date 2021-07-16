import React, { useState, useContext, useEffect } from "react";
import { Form, Segment, Grid, TextArea, Button } from "semantic-ui-react";
import GuestContext from "../../context/guestcontext/guestContext";

function Sellerform() {
  const context = useContext(GuestContext);
  const { addGuest } = context;

  const [post, setpost] = useState({
    location: "",
    description: "",
    price_perday: "",
    maximum_stay: "",
    postimage: "",
  });

  const { location, description, price_perday, maximum_stay, postimage } = post;
  const onchange = (e) => {
    setpost({ ...post, [e.target.name]: e.target.value });
  };

  const onsubmit = async (e) => {
    e.preventDefault();
    if (
      !(location || description || price_perday || maximum_stay || postimage)
    ) {
      alert("all feilds required");
      return;
    } else {
      addGuest(post);
    }
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
              <Button fluid type="submit">
                Post
              </Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    </div>
  );
}

export default Sellerform;
