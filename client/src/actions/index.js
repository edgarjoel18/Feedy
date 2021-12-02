import axios from "axios";
import { FETCH_USER, FETCH_SURVEYS } from "./types";
// comments needed
export const fetchUser = () => {
  // using redux thunk with this action creator. Instead of immediately returning an action with this action
  // creator like this
  // const currentUser = await axios.get('/api/currentUser');
  // return {type: FETCH_USER, payload: currentUser}. We will use redux-thunk which quickly inspects what this
  // action creator fetchUser returns. If redux-thunk see's we return a func instead of an action.
  // redux-thunk will immediately add dispatch func into the return function. so like return async function(dispatch)
  return function (dispatch) {
    axios
      .get("/api/currentUser")
      .then((res) => dispatch({ type: FETCH_USER, payload: res.data }));
  };
};

export const handleToken = (token) => {
  return async (dispatch) => {
    // a post request to our server
    const res = await axios.post("/api/stripe", token);
    dispatch({ type: FETCH_USER, payload: res.data });
  };
};

export const submitForm = (values, history) => {
  return async (dispatch) => {
    const res = await axios.post("/api/surveys", values);
    history.push("/surveys");
    dispatch({ type: FETCH_USER, payload: res.data });
  };
};

export const fetchSurveys = () => {
  return async (dispatch) => {
    const res = await axios.get("/api/surveys");
    dispatch({ type: FETCH_SURVEYS, payload: res.data });
  };
};
