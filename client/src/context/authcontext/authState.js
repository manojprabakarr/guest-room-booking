import React, { useReducer } from "react";
import axios from "axios";
import authReducer from "../authcontext/authReducer";
import AuthContext from "../authcontext/authContext";
import setAuthToken from "../../utils/authtoken";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT,
  CLEAR_ERRORS,
} from "../types";

const AuthState = (props) => {
  const intialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null,
  };
  const [state, dispatch] = useReducer(authReducer, intialState);

  // Load User

  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      const res = await axios.get("http://localhost:8000/userlogin");
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
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
        "http://localhost:8000/userregister",
        formData,
        config
      );
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
      loadUser();
    } catch (err) {
      console.log(err);
      dispatch({
        type: REGISTER_FAIL,
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
        "http://localhost:8000/userlogin",
        formData,
        config
      );
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
      loadUser();
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response,
      });
    }
  };

  const setError = (err) => {
    dispatch({
      type: REGISTER_FAIL,
      payload: [{ msg: err }],
    });
  };
  // Logout
  const logout = () => dispatch({ type: LOGOUT });

  // Clear Errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });
  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        user: state.user,
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
    </AuthContext.Provider>
  );
};
export default AuthState;
