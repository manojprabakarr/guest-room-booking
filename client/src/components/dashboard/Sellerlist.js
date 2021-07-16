import React, { useContext, useEffect } from "react";

import SellerAuthContext from "../../context/sellerauthcontext/sellerauthContext";
import GuestContext from "../../context/guestcontext/guestContext";

const Sellerlist = ({ guest }) => {
  const { loading } = useContext(SellerAuthContext);
  const { guests, getGuests } = useContext(GuestContext);

  useEffect(() => {
    getGuests();
  }, []);
  const { description, postimage, location, price_perday, maximum_stay } =
    guests;

  return (
    <div className="datalist">
      <h1 style={{ textAlign: "center" }}>posts</h1>
      <div className="list">
        <h3>{guests.description}</h3>
        {/* <h3>location</h3>
        <h3>price_perday</h3>
        <h3>maximum_stay</h3>  */}
      </div>
    </div>
  );
};
export default Sellerlist;
