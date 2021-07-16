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
      <div className="posttwo" key={guests._id}>
        <h1 style={{ textAlign: "center" }}>posts</h1>

        {guests.map((data) => {
          return (
            <Sellerlist
              key={data.id}
              userid={data._id}
              location={data.location}
              price={data.price_perday}
              maximum={data.maximum_stay}
              description={data.description}
              image={data.postimage}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Sellerdashboard;
