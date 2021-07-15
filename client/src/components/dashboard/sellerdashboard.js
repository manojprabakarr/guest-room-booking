import React, { useEffect, useContext } from "react";
import Sellerform from "./Sellerform";
import Sellerlist from "./Sellerlist";
import SellerAuthContext from "../../context/sellerauthcontext/sellerauthContext";

function Sellerdashboard() {
  const { loadUser } = useContext(SellerAuthContext);
  useEffect(() => {
    loadUser();
  }, []);

  return (
    <div className="seller">
      <Sellerform />
      <div>
        <Sellerlist />
      </div>
    </div>
  );
}

export default Sellerdashboard;
