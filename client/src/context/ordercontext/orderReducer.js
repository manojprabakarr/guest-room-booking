import { ADD_ORDER, ORDER_ERROR, GET_ORDER } from "../types";

export default (state, { type, payload }) => {
  switch (type) {
    case ADD_ORDER:
      return {
        ...state,
        orderpost: [...state.orderpost, payload],
      };
    case ORDER_ERROR:
      return {
        ...state,
        error: payload,
      };

    case GET_ORDER:
      return {
        ...state,
        orderpost: payload,
        error: null,
      };

    default:
      return state;
  }
};
