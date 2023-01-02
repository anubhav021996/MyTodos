import { ADDTOKEN, ADDUSER } from "./actionAuth";

const initialState = {
  token: JSON.parse(localStorage.getItem("token")) || null,
  user: null,
};

export const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADDTOKEN:
      return { ...state, token: payload };
    case ADDUSER:
      return { ...state, user: payload };
    default:
      return state;
  }
};
