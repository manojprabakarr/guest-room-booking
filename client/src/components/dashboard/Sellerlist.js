import React, { useContext, useEffect } from "react";
import { Button } from "semantic-ui-react";
import SellerAuthContext from "../../context/sellerauthcontext/sellerauthContext";
import GuestContext from "../../context/guestcontext/guestContext";

const Sellerlist = ({ guest }) => {
  const { loading } = useContext(SellerAuthContext);
  const { removeGuest, edit_Guest, clearEdit } = useContext(GuestContext);

  const { _id, location, description, price_perday, maximum_stay, postimage } =
    guest;

  const handleRemove = () => {
    removeGuest(_id);
  };

  return (
    <div className="list">
      <div className="listcontainer">
        <img src={postimage} alt="image" className="imagelist" width="100px" />
        <div className="listinfo">
          <p>location:{location}</p>
          <p>description:{description}</p>
          <p>price:{price_perday} Rs</p>
          <p>maximumdays:{maximum_stay}</p>
          <div className="listbutton">
            <Button onClick={() => edit_Guest(guest)} content="Primary">
              editpost
            </Button>
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
