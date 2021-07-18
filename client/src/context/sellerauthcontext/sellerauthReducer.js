import {
  SELLER_REGISTER_FAIL,
  SELLER_REGISTER_SUCCESS,
  SELLER_LOGIN_FAIL,
  SELLER_LOGIN_SUCCESS,
  SELLER_LOGOUT,
  SELLER_USER_LOADED,
  SELLER_AUTH_ERROR,
  SELLER_CLEAR_ERRORS,
  SELLER_GETORDER,
} from "../types";

export default (state, { type, payload }) => {
  switch (type) {
    case SELLER_USER_LOADED:
      return {
        ...state,
        isAuthencated: true,
        seller: payload,
        loading: false,
        error: null,
      };

    case SELLER_GETORDER:
      return {
        ...state,

        isAuthenticated: true,
        postorder: payload,
        loading: false,
        error: null,
      };

    case SELLER_REGISTER_SUCCESS:
    case SELLER_LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthencated: true,
        loading: false,
        error: null,
      };
    case SELLER_REGISTER_FAIL:
    case SELLER_LOGIN_FAIL:
    case SELLER_AUTH_ERROR:
    case SELLER_LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthencated: null,
        seller: null,
        loading: false,
        error: payload,
      };
    case SELLER_CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
