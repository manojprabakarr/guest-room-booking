import React, { useEffect, useContext } from "react";
import Sellerform from "./Sellerform";
import SellerAuthContext from "../../context/sellerauthcontext/sellerauthContext";

function Sellerdashboard() {
  const { loadUser } = useContext(SellerAuthContext);
  useEffect(() => {
    loadUser();
  }, []);

  return (
    <div className="seller">
      <Sellerform />
    </div>
  );
}

export default Sellerdashboard;
