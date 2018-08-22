import { STOP_TIMER } from "./actions";

export const stopTimer = () => {
  return (dispatch, store) => {
    var timer = store.getState().timer;
    clearInterval(timer);
    dispatch({ type: STOP_TIMER });
  };
};
