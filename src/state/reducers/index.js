import { combineReducers } from "redux";
import { SET_INPUT } from "../actions";

export default combineReducers({
  data: (state = {}, action) => {
    switch (action.type) {
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
