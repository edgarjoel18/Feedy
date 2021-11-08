import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import reducers from "./reducers";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import axios from "axios";
import "materialize-css/dist/css/materialize.min.css";
// all the reducers go here, preferably combineReducers
const store = createStore(reducers, {}, applyMiddleware(reduxThunk)); // 2nd arg is useful for server side rendering. However, we dont have an
// init state right now
// applyMiddleware is useful with redux-thunk

window.axios = axios;

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);

// console.log("Stripe key", process.env.STRIPE_KEY);
