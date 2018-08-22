import timer from "react-native-timer";
import { INIT_TIMER, SIGNAL } from "./actions";

export const setTimer = () => {
  return dispatch => {
    timer.setInterval("new", () => dispatch({ type: SIGNAL }), 1000);
    dispatch({ type: INIT_TIMER, payload: "new" });
  };
};
