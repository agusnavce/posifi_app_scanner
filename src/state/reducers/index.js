import { combineReducers } from "redux";
import {
  SET_INPUT,
  INIT_TIMER,
  TOGGLE_TRACKING,
  SEND_WIFI_START,
  SEND_WIFI_END,
  SEND_WIFI_SUCCESS,
  SEND_WIFI_ERROR,
  FETCH_PREDICTIONS_END,
  FETCH_PREDICTIONS_START,
  TRACK_SEND_WIFI_ERROR,
  FETCH_PREDICTIONS_SUCCESS
} from "../actions";

var initialSate = {
  toggle: false,
  collectText: "",
  collectTitle: "",
  collectError: "",
  trackText: "",
  trackTitle: "",
  trackError: ""
};

export default combineReducers({
  data: (state = initialSate, action) => {
    switch (action.type) {
      case SEND_WIFI_ERROR:
        return {
          ...state,
          collectError: action.payload
        };
      case TRACK_SEND_WIFI_ERROR:
        return {
          ...state,
          collectError: action.payload
        };
      case SEND_WIFI_END:
        return {
          ...state,
          collectTitle: "Scan ended"
        };
      case FETCH_PREDICTIONS_END:
        return {
          ...state,
          trackTitle: "Tracking ended"
        };
      case FETCH_PREDICTIONS_START:
        return {
          ...state,
          trackTitle: "Tracking started",
          trackError: ""
        };
      case SEND_WIFI_START:
        return {
          ...state,
          collectTitle: "Scan started",
          collectError: ""
        };
      case FETCH_PREDICTIONS_SUCCESS:
        return {
          ...state,
          trackText: JSON.stringify(action.payload)
        };
      case SEND_WIFI_SUCCESS:
        return {
          ...state,
          collectText: `Inserted ${action.payload} ap/aps information`
        };
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
