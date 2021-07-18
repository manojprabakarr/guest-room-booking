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

  const [post, setpost] = useState([]);
  useEffect(() => {
    const Getall = async () => {
      await fetch("http://localhost:8000/getall")
        .then((res) => res.json())
        .then((data) => {
          console.log("getall", data);
          setpost(data);
        });
    };
    Getall();
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
        {post.map((posts) => (
          <SearchResult
            src={posts.postimage}
            location={posts.location}
            title={posts.maximum_stay}
            desc={posts.description}
            star="4.7"
            price={posts.price_perday}
            sellerid={posts.user}
          />
        ))}
      </div>
    </div>
  );
}

export default Searchpage;
