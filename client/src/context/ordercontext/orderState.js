import React, { useReducer } from "react";
import axios from "axios";

import { ADD_ORDER, ORDER_ERROR, GET_ORDER } from "../types";
import OrderContext from "./orderContext";
import OrderReducer from "./orderReducer";

const OrderState = (props) => {
  const intialState = {
    orderpost: [],
    sendpost: [],

    errors: null,
  };

  const [state, dispatch] = useReducer(OrderReducer, intialState);

  const addOrder = async (order) => {
    const config = {
      "Content-Type": "application/json",
    };
    try {
      const res = await axios.post(
        "http://localhost:8000/order",
        order,

        config
      );
      dispatch({
        type: ADD_ORDER,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: ORDER_ERROR,
        payload: err.response.msg,
      });
    }
  };

  return (
    <OrderContext.Provider
      value={{
        orderpost: state.orderpost,

        error: state.error,
        addOrder,
      }}
    >
      {props.children}
    </OrderContext.Provider>
  );
};

export default OrderState;
