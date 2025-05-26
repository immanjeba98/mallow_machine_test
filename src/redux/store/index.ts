import { createStore, applyMiddleware, compose } from "redux";
import reducers from "../reducers";
import {  withExtraArgument } from "redux-thunk"; // Use named import
import { api } from "../../services/api";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

let composeEnhancers = compose;

if (typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
}

const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(withExtraArgument({ api })))
);

export default store;