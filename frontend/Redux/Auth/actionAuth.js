export const ADDTOKEN = "ADDTOKEN";
export const ADDUSER = "ADDUSER";

import { BASE_URL } from "@env";
import axios from "axios";

export const addToken = (payload) => ({ type: ADDTOKEN, payload: payload });
export const addUser = (payload) => (Dispatch) => {
  if (!payload) return Dispatch({ type: ADDUSER, payload: null });
  axios
    .get(`${BASE_URL}/user`, {
      headers: {
        Authorization: "Bearer " + payload,
      },
    })
    .then((res) => {
      Dispatch({ type: ADDUSER, payload: res.data });
    })
    .catch((e) => console.log(e.message));
};
