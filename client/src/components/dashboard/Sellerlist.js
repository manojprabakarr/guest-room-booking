import React, { useContext, useEffect } from "react";

import SellerAuthContext from "../../context/sellerauthcontext/sellerauthContext";
import GuestContext from "../../context/guestcontext/guestContext";

const Sellerlist = ({ guest }) => {
  const { loading } = useContext(SellerAuthContext);
  const { guests, getGuests } = useContext(GuestContext);

  useEffect(() => {
    getGuests();
  }, []);
  // const { description, postimage, location, price_perday, maximum_stay } =
  //   guests;
  console.log("data", guests);

  return (
    <div className="datalist">
      <h1 style={{ textAlign: "center" }}>posts</h1>
      <div className="list">
        <h3>guests.description</h3>
        <h3>guestsguests.location</h3>
      </div>
    </div>
  );
};
export default Sellerlist;
