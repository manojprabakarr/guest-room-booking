import React from "react";
import StarIcon from "@material-ui/icons/Star";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { Button } from "semantic-ui-react";

function Searchresult({ src, desc, location, title, star, user, price }) {
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

            <Button fluid style={{ backgroundColor: "#ff7779" }}>
              book now{" "}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Searchresult;
