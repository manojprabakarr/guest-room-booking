import React, { useState, useRef, useContext, useEffect } from "react";
import {
  Button,
  Form,
  Segment,
  Grid,
  Image,
  TextArea,
} from "semantic-ui-react";
import GuestContext from "../../context/guestcontext/guestContext";

function Sellerform() {
  const context = useContext(GuestContext);
  const { addGuest, editGuest, clearEdit, update_Guest } = context;

  useEffect(() => {
    if (editGuest !== null) {
      setImage(editGuest);
      setpost(editGuest);
    } else {
      setpost({
        location: "",
        description: "",
        price: "",
      });
    }
  }, []);

  const filePickerRef = useRef(null);
  const [image, setImage] = useState({ preview: "", raw: "" });
  const [post, setpost] = useState({
    location: "",
    description: "",
    price: "",
  });

  const { location, description, price } = post;

  onchange = (e) => {
    setpost({ ...post, [e.target.name]: e.target.value });
  };

  const handleChange = (e) => {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
  };

  return (
    <div className="form">
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Form size="large">
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
                name="price"
                value={price}
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
                type="file"
                ref={filePickerRef}
                onChange={handleChange}
              />
              <div>
                {image.preview ? (
                  <Image
                    src={image.preview}
                    style={{
                      objectFit: "contain",
                      width: "100%",
                      height: "100%",
                    }}
                    alt=""
                  />
                ) : (
                  <h4>upload your roomsimages</h4>
                )}
              </div>

              <Button
                fluid
                type="submit"
                style={{ backgroundColor: "#ff7779 " }}
                size="large"
              >
                post
              </Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    </div>
  );
}

export default Sellerform;
