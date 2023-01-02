import { legacy_createStore as createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { authReducer } from "./Auth/reducerLogin";

export const store = createStore(authReducer, applyMiddleware(thunk));
