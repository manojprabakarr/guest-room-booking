import React, { useContext, useEffect } from "react";
import GuestContext from "../../context/guestcontext/guestContext";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import SellerAuthContext from "../../context/sellerauthcontext/sellerauthContext";

const Sellerlist = () => {
  const context = useContext(GuestContext);
  const { loading } = useContext(SellerAuthContext);
  const { guests, getGuests } = context;
  useEffect(() => {
    getGuests();
  }, []);

  const { _id, location, description, price_perday, maximum_stay, postimage } =
    guests;
  console.log(guests);

  return (
    <div>
      <h1>posted data</h1>
      <h1>{description}</h1>
    </div>
  );
};
export default Sellerlist;
