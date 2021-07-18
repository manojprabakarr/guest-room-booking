import React, { useEffect, useContext } from "react";
import Sellerform from "./Sellerform";
import Sellerlist from "./Sellerlist";
import SellerAuthContext from "../../context/sellerauthcontext/sellerauthContext";
import GuestContext from "../../context/guestcontext/guestContext";
import Orderlist from "./Orderlist";
import axios from "axios";
import OrderContext from "../../context/ordercontext/orderContext";

function Sellerdashboard() {
  const { loadUser, Orderdata, postorder } = useContext(SellerAuthContext);
  const { guests, getGuests } = useContext(GuestContext);

  useEffect(() => {
    loadUser();
    getGuests();
    Orderdata();
  }, []);
  console.log(postorder, "nothing");
  let postdata = postorder?.orders;
  console.log(postdata);
  return (
    <div className="seller">
      <div className="posttwo">
        <h1 style={{ textAlign: "center" }}>posts</h1>
        {guests.map((data) => (
          <Sellerlist guest={data} />
        ))}
      </div>
      <div className="sellerform">
        <Sellerform />
      </div>
      <div className="posttwo">
        <h2 style={{ textAlign: "center" }}>orders</h2>
        {postdata?.map((data) => (
          <Orderlist bookings={data} />
        ))}
      </div>
    </div>
  );
}

export default Sellerdashboard;
