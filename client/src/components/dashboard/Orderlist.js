import React, { useEffect, useContext } from "react";

function Orderlist({ bookings }) {
  //getting bookings for seller
  return (
    <div className="list">
      <div className="listinfo">
        <p>guestname{bookings.guestname}</p>
        <p>guestphno:{bookings.guestphno}</p>

        <p>
          days:{bookings.startdate} to {bookings.enddate}
        </p>
      </div>
    </div>
  );
}

export default Orderlist;
