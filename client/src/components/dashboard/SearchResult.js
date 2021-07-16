import React from "react";
import StarIcon from "@material-ui/icons/Star";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

function Searchresult({ src, desc, price, star, location, total, title }) {
  return (
    <div className="result">
      <img src={src} alt="" />
      <FavoriteBorderIcon className="resultheart" />
      <div className="resultinfo">
        <div className="resultinfo2">
          <p>{location}</p>
          <h3>{title}</h3>
          <p>_____</p>
          <p>{desc}</p>
        </div>
        <div className="resultinfo3">
          <div className="resultstar">
            <StarIcon className="star" />
            <p>
              <strong>{star}</strong>
            </p>
          </div>
          <div className="resultprice">
            <h2>{price}</h2>
            <p>{total}</p>
            <button>book now </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Searchresult;
