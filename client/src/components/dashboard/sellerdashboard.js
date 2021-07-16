import React, { useEffect, useContext } from "react";
import Sellerform from "./Sellerform";
import Sellerlist from "./Sellerlist";
import SellerAuthContext from "../../context/sellerauthcontext/sellerauthContext";
import GuestContext from "../../context/guestcontext/guestContext";

function Sellerdashboard() {
  const { loadUser } = useContext(SellerAuthContext);
  const { guests, getGuests } = useContext(GuestContext);

  useEffect(() => {
    loadUser();
    getGuests();
  }, []);

  return (
    <div className="seller">
      <Sellerform />
      <div className="posttwo">
        <h1 style={{ textAlign: "center" }}>posts</h1>
        {guests.map((data) => {
          return <Sellerlist guest={data} />;
        })}
      </div>
    </div>
  );
}

export default Sellerdashboard;
