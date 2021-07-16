import React, { useContext, useEffect, useState } from "react";
import SearchResult from "./SearchResult";
import { Button } from "semantic-ui-react";
import AuthContext from "../../context/authcontext/authContext";
import { Link } from "react-router-dom";

function Searchpage() {
  const { loadUser } = useContext(AuthContext);
  useEffect(() => {
    loadUser();
  }, []);

  return (
    <div className="searchpage">
      <div className="searchpageinfo">
        <Link to="/">
          <h2 style={{ marginBottom: "20px" }}>Return to Home</h2>
        </Link>
        <Button variant="outlined">Cancellation Flexibility</Button>
        <Button variant="outlined">Type of place</Button>
        <Button variant="outlined">Price</Button>
        <Button variant="outlined">Rooms and beds</Button>
        <Button variant="outlined">More filters</Button>
      </div>
      <div className="searchpageresult">
        <SearchResult
          src="https://images.pexels.com/photos/584399/living-room-couch-interior-room-584399.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
          location="Private room in center of London"
          title="Stay at this spacious Edwardian House"
          desc="1 guest . 1 bedroom . 1 bed . Wifi . Kitchen . Free parking . Washing Machine"
          star="4.7"
          price="$80/night"
          total="$240 total"
        />
      </div>
    </div>
  );
}

export default Searchpage;
