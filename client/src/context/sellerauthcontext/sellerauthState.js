import React, { useReducer } from "react";
import axios from "axios";
import SellerauthReducer from "../sellerauthcontext/sellerauthReducer";
import SellerAuthContext from "../sellerauthcontext/sellerauthContext";
import setAuthToken from "../../utils/authtoken";
import {
  SELLER_REGISTER_SUCCESS,
  SELLER_REGISTER_FAIL,
  SELLER_LOGIN_SUCCESS,
  SELLER_LOGIN_FAIL,
  SELLER_USER_LOADED,
  SELLER_AUTH_ERROR,
  SELLER_LOGOUT,
  SELLER_CLEAR_ERRORS,
} from "../types";

const AuthState = (props) => {
  const intialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: true,
    seller: null,
    error: null,
  };
  const [state, dispatch] = useReducer(SellerauthReducer, intialState);

  // Load User

  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      const res = await axios.get("http://localhost:8000/authlogin");
      dispatch({
        type: SELLER_USER_LOADED,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: SELLER_AUTH_ERROR,
      });
    }
  };

  //Register User
  const register = async (formData) => {
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post(
        "http://localhost:8000/authregister",
        formData,
        config
      );
      dispatch({
        type: SELLER_REGISTER_SUCCESS,
        payload: res.data,
      });
      loadUser();
    } catch (err) {
      console.log(err);
      dispatch({
        type: SELLER_REGISTER_FAIL,
        payload: err.response,
      });
    }
  };

  //login user

  const login = async (formData) => {
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post(
        "http://localhost:8000/authlogin",
        formData,
        config
      );
      dispatch({
        type: SELLER_LOGIN_SUCCESS,
        payload: res.data,
      });
      loadUser();
    } catch (err) {
      dispatch({
        type: SELLER_LOGIN_FAIL,
        payload: err.response,
      });
    }
  };

  const setError = (err) => {
    dispatch({
      type: SELLER_REGISTER_FAIL,
      payload: [{ msg: err }],
    });
  };
  // SELLER_LOGOUT
  const logout = () => dispatch({ type: SELLER_LOGOUT });

  // Clear Errors
  const clearErrors = () => dispatch({ type: SELLER_CLEAR_ERRORS });
  return (
    <SellerAuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        seller: state.seller,
        error: state.error,
        loading: state.loading,
        register,
        login,
        loadUser,
        logout,
        clearErrors,
        setError,
      }}
    >
      {props.children}
    </SellerAuthContext.Provider>
  );
};
export default AuthState;
