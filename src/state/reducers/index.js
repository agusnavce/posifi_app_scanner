import { combineReducers } from "redux";
import { SET_INPUT, INIT_TIMER } from "../actions";

export default combineReducers({
  data: (state = {}, action) => {
    switch (action.type) {
      case INIT_TIMER:
        return {
          ...state,
          timer: payload
        };
      case SET_INPUT:
        return {
          ...state,
          [action.payload.key]: action.payload.value
        };
      default:
        return state;
    }
  }
});
