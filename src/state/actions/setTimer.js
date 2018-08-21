import { INIT_TIMER, SIGNAL } from "./actions";

export const setTimer = () => {
  return dispatch => {
    var timer = setInterval(() => dispatch(() => ({ type: SIGNAL }), 1000));
    dispatch({ type: INIT_TIMER, payload: timer });
  };
};
