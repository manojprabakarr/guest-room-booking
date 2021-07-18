import React, { useState, useContext } from "react";
import StarIcon from "@material-ui/icons/Star";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { Button } from "semantic-ui-react";
import AuthContext from "../../context/authcontext/authContext";
import OrderContext from "../../context/ordercontext/orderContext";

function Searchresult({ src, desc, location, title, star, sellerid, price }) {
  const { user } = useContext(AuthContext);
  const context = useContext(OrderContext);
  const { addOrder } = context;

  const refresh = {
    noofguests: "",
    startdate: "",
    enddate: "",
    productid: sellerid,
    guestname: user.name,
    guestphno: user.phno,
  };
  const [order, setorder] = useState(refresh);
  const { noofguests, startdate, enddate, productid, guestname, guestphno } =
    order;
  const onchange = (e) => {
    setorder({ ...order, [e.target.name]: e.target.value });
  };
  const onsubmit = (e) => {
    e.preventDefault();
    if (!(noofguests || startdate || enddate)) {
      alert("enter all feilds");
    } else {
      addOrder(order);
      alert("order placed");
      setorder(refresh);
      console.log(order);
    }
  };

  return (
    <div className="result">
      <img src={src} alt="" />
      <FavoriteBorderIcon className="resultheart" />
      <div className="resultinfo">
        <div className="resultinfo2">
          <p>location:{location}</p>
          <h3>Maximum days can stay:{title}</h3>
          <p>_____</p>
          <p>Description:{desc}</p>
        </div>
        <div className="resultinfo3">
          <div className="resultstar">
            <StarIcon className="star" />
            <p>
              <strong>{star}</strong>
            </p>
          </div>
          <div className="resultprice">
            <h2>{price}rs per day</h2>

            <div className="form">
              <input
                type="text"
                name="noofguests"
                value={noofguests}
                onChange={onchange}
                placeholder="noofguests"
              />
              startdate:
              <input
                type="date"
                name="startdate"
                value={startdate}
                onChange={onchange}
              />
              enddate:
              <input
                type="date"
                name="enddate"
                value={enddate}
                onChange={onchange}
                placeholder="enddate"
              />
              <Button
                type="submit"
                onClick={onsubmit}
                fluid
                style={{ backgroundColor: "#ff7779", marginTop: "20px" }}
              >
                book now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Searchresult;
