import React, { useContext, useEffect } from "react";
import { Button } from "semantic-ui-react";
import SellerAuthContext from "../../context/sellerauthcontext/sellerauthContext";
import GuestContext from "../../context/guestcontext/guestContext";

const Sellerlist = ({
  location,
  description,
  price,
  maximum,
  image,
  userid,
}) => {
  const { loading } = useContext(SellerAuthContext);
  const { removeGuest, edit_Guest, clearEdit } = useContext(GuestContext);

  const handleRemove = () => {
    removeGuest(userid);
  };

  return (
    <div className="list">
      <div className="listcontainer">
        <img src={image} alt="image" className="imagelist" width="100px" />
        <div className="listinfo">
          <p>location:{location}</p>
          <p>description:{description}</p>
          <p>price:{price} Rs</p>
          <p>maximumdays:{maximum}</p>
          <div className="listbutton">
            <Button content="Primary">editpost</Button>
            <Button onClick={handleRemove} content="Primary">
              deletepost
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Sellerlist;
