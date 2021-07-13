import React, { useEffect, useContext } from "react";
import SellerAuthContext from "../../context/sellerauthcontext/sellerauthContext";

function Sellerdashboard() {
  const { loadUser } = useContext(SellerAuthContext);
  useEffect(() => {
    loadUser();
  }, []);

  return (
    <div>
      <h1>hello</h1>
    </div>
  );
}

export default Sellerdashboard;
