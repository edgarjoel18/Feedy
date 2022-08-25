import axios from "axios";
import { FETCH_USER, FETCH_SURVEYS } from "./types";

export const fetchUser = () => {
  console.log("CALLED");
  return function (dispatch) {
    axios
      .get("/api/currentUser")
      .then((res) => dispatch({ type: FETCH_USER, payload: res.data }));
  };
};

export const submitForm = (data, history) => {
  return async (dispatch) => {
    const res = await axios.post("/api/surveys", data);
    history.push("/surveys");
    dispatch({ type: FETCH_USER, payload: res.data });

  };
};

export const handleToken = (token) => {
  return async (dispatch) => {
    const res = await axios.post("/api/stripe", token);
    dispatch({ type: FETCH_USER, payload: res.data });
  };
};

export const fetchSurveys = () => {
  return async (dispatch) => {
    const res = await axios.get("/api/surveys");
    console.log(res.data);
    dispatch({ type: FETCH_SURVEYS, payload: res.data });
  }
}

