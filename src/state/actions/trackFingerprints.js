import wifi from "react-native-android-wifi";
import timer from "react-native-timer";
import { Alert } from "react-native";
import {
  PARAMETERS_ERROR,
  TRACK_SEND_WIFI_ERROR,
  TRACK_SEND_WIFI_SUCCESS,
  FETCH_PREDICTIONS_SUCCESS,
  FETCH_PREDICTIONS_START,
  FETCH_PREDICTIONS_END,
  FETCH_PREDICTIONS_ERROR
} from "./actions";

export const trackFingerprints = () => {
  return (dispatch, getState) => {
    var state = getState().data;
    var host = state.host;
    var device = state.device;
    if (
      host === undefined ||
      host === "" ||
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
        dispatch({ type: FETCH_PREDICTIONS_END });
      } else {
        timer.setInterval(
          "newTimer",
          getAndSendWifi(dispatch, host, device),
          2000
        );
        dispatch({ type: FETCH_PREDICTIONS_START });
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
      fetch(host + "/data", {
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
          dispatch({ type: TRACK_SEND_WIFI_SUCCESS });
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
          dispatch({ type: TRACK_SEND_WIFI_ERROR, payload: err });
        });
    },
    error => {
      console.log(error);
    }
  );
};
