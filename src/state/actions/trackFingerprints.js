import wifi from "react-native-android-wifi";
import timer from "react-native-timer";
import { Alert } from "react-native";
import {
  PARAMETERS_ERROR,
  SEND_WIFI_ERROR,
  SEND_WIFI_SUCCESS,
  SEND_WIFI_START,
  SEND_WIFI_END,
  FETCH_PREDICTIONS_SUCCESS,
  FETCH_PREDICTIONS_START,
  FETCH_PREDICTIONS_ERROR
} from "./actions";

export const scanFingerprints = () => {
  return (dispatch, getState) => {
    var state = getState().data;
    var host = state.host;
    var family = state.family;
    var device = state.device;
    if (
      host === undefined ||
      host === "" ||
      family === undefined ||
      family == "" ||
      device === undefined ||
      device === ""
    ) {
      dispatch({ type: PARAMETERS_ERROR });
      Alert.alert(
        "Error en los parametros",
        "Se deben completar todos los campos",
        [{ text: "OK", onPress: () => {} }],
        { cancelable: false }
      );
    } else {
      if (timer.intervalExists("newTimer")) {
        timer.clearInterval("newTimer");
        dispatch({ type: SEND_WIFI_END });
      } else {
        timer.setInterval("newTimer", getAndSendWifi(dispatch), 2000);
        dispatch({ type: SEND_WIFI_START });
      }
    }
  };
};

var getAndSendWifi = dispatch => () => {
  wifi.reScanAndLoadWifiList(
    wifiStringList => {
      wifiList = [].concat(JSON.parse(wifiStringList));
      var lis = wifiList.reduce((previous, item) => {
        previous[item.BSSID] = item.level;
        return previous;
      }, {});
      fetch("https://cloud.internalpositioning.com" + "/data", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          s: { wifi: lis },
          d: "nuevo",
          f: "posifi"
        })
      })
        .then(res => {
          dispatch({ type: SEND_WIFI_SUCCESS });
          dispatch({ type: FETCH_PREDICTIONS_START });
          fetch(
            "https://cloud.internalpositioning.com" +
              "/api/v1/location/posifi/nuevo"
          )
            .then(res => {
              res.json().then(data =>
                dispatch({
                  type: FETCH_PREDICTIONS_SUCCESS,
                  payload: data.analysis.guesses
                })
              );
            })
            .catch(err => {
              dispatch({ type: FETCH_PREDICTIONS_ERROR, payload: err });
            });
        })
        .catch(err => {
          dispatch({ type: SEND_WIFI_ERROR, payload: err });
        });
    },
    error => {
      console.log(error);
    }
  );
};
