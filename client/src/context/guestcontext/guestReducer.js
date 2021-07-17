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

export default (state, { type, payload }) => {
  console.log(type, payload);
  switch (type) {
    case GET_GUESTS:
      return {
        ...state,
        guests: payload,
        error: null,
      };

    case ADD_GUEST:
      return {
        ...state,
        guests: [...state.guests, payload],
      };
    case REMOVE_GUEST:
      return {
        ...state,
        guests: state.guests.filter((guest) => guest._id !== payload),
      };
    case EDIT_GUEST:
      return {
        ...state,
        editGuest: payload,
      };
    case CLEAR_EDIT:
      return {
        ...state,
        editGuest: null,
      };
    case UPDATE_GUEST:
      return {
        ...state,
        guests: state.guests.map((guest) =>
          guest._id === payload._id ? payload : guest
        ),
      };

    case GUESTS_ERROR:
      return {
        ...state,
        error: payload,
      };
    case CLEAR_GUESTS:
      return {
        ...state,

        editGuest: null,
        guests: [],
        error: null,
      };
    default:
      return state;
  }
};
