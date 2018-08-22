import { combineReducers } from "redux";
import { SET_INPUT, INIT_TIMER, TOGGLE_TRACKING } from "../actions";

export default combineReducers({
  data: (state = { toggle: false }, action) => {
    switch (action.type) {
      case TOGGLE_TRACKING:
        return {
          ...state,
          toggle: !action.payload
        };
      case INIT_TIMER:
        return {
          ...state,
          timer: action.payload
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
