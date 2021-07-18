import { ADD_ORDER, ORDER_ERROR } from "../types";

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

    default:
      return state;
  }
};
