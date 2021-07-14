import React, { useReducer } from "react";
import axios from "axios";
import GuestContext from "./guestContext";
import guestReducer from "./guestReducer";
import {
  REMOVE_GUEST,
  ADD_GUEST,
  EDIT_GUEST,
  CLEAR_EDIT,
  UPDATE_GUEST,
  GET_GUESTS,
  GUESTS_ERROR,
  CLEAR_GUESTS,
} from "../types";

const GuestState = (props) => {
  const intialState = {
    guestFilter: false,
    searchGuest: null,
    editGuest: null,
    guests: [],
    error: null,
  };
  const [state, dispatch] = useReducer(guestReducer, intialState);

  // get guests
  const getGuests = async () => {
    try {
      const res = await axios.get("http://localhost:8000/guestpost");
      dispatch({
        type: GET_GUESTS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: GUESTS_ERROR,
        payload: err.response.msg,
      });
    }
  };

  // Add Guest

  const addGuest = async (guest) => {
    const config = {
      "Content-Type": "application/json",
    };
    try {
      const res = await axios.post(
        "http://localhost:8000/guestpost",
        guest,
        config
      );
      dispatch({
        type: ADD_GUEST,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: GUESTS_ERROR,
        payload: err.response.msg,
      });
    }
  };

  // remove guest
  const removeGuest = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/guestpost/${id}`);
      dispatch({
        type: REMOVE_GUEST,
        payload: id,
      });
    } catch (err) {
      dispatch({
        type: GUESTS_ERROR,
        payload: err.response.msg,
      });
    }
  };

  // update guest

  const update_Guest = async (guest) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.put(
        `http://localhost:8000/guestpost/${guest._id}`,
        guest,
        config
      );
      dispatch({
        type: UPDATE_GUEST,
        payload: res.data,
      });
      getGuests();
    } catch (err) {
      dispatch({
        type: GUESTS_ERROR,
        payload: err.response,
      });
    }
  };

  // Edit Guest
  const edit_Guest = (guest) => {
    dispatch({
      type: EDIT_GUEST,
      payload: guest,
    });
  };
  const clearEdit = () => {
    dispatch({
      type: CLEAR_EDIT,
    });
  };
  const clearGuests = () => {
    dispatch({
      type: CLEAR_GUESTS,
    });
  };
  return (
    <GuestContext.Provider
      value={{
        guests: state.guests,

        editGuest: state.editGuest,
        error: state.error,
        loading: state.loading,
        addGuest,
        removeGuest,
        edit_Guest,
        clearEdit,
        update_Guest,

        getGuests,
        clearGuests,
      }}
    >
      {props.children}
    </GuestContext.Provider>
  );
};

export default GuestState;
