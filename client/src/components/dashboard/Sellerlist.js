import React, { useContext } from "react";
import { Button } from "semantic-ui-react";

import GuestContext from "../../context/guestcontext/guestContext";

const Sellerlist = ({ guest }) => {
  const { removeGuest, edit_Guest, clearEdit } = useContext(GuestContext);

  const { _id, location, price_perday, maximum_stay, description, postimage } =
    guest;

  const handleRemove = () => {
    removeGuest(_id);
    clearEdit();
  };
  // posting rooms edit,delete,update
  return (
    <div className="list">
      <div className="listcontainer">
        <img
          src={postimage}
          alt="noimage"
          className="imagelist"
          width="100px"
        />
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
