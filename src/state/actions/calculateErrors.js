import wifi from "react-native-android-wifi";
import timer from "react-native-timer";
import { Alert } from "react-native";
import {
  PARAMETERS_ERROR,
  ERROR_SEND_WIFI_ERROR,
  COLLECT_ERROR_SUCCESS,
  COLLECT_ERROR_START,
  COLLECT_ERROR_END,
  COLLECT_ERROR_ERROR
} from "./actions";

export const calculateErrors = () => {
  return (dispatch, getState) => {
    var state = getState().data;
    var host = state.host;
    var family = state.family;
    var device = state.device;
    var place = state.place;
    if (
      host === undefined ||
      host === "" ||
      family === undefined ||
      family == "" ||
      device === undefined ||
      device === "" ||
      place === undefined ||
      place === ""
    ) {
      dispatch({ type: PARAMETERS_ERROR });
      Alert.alert(
        "Error en los parametros",
        "Se deben completar todos los campos",
        [{ text: "OK", onPress: () => {} }],
        { cancelable: false }
      );
    } else {
      timer.setTimeout("errorTimeOut", endCollect(dispatch), 10000);
      timer.setInterval("errorTimer", getAndSendWifi(dispatch), 2000);
      dispatch({ type: COLLECT_ERROR_START });
    }
  };
};

var endCollect = dispatch => () => {
  timer.clearInterval("errorTimer");
  dispatch({ type: COLLECT_ERROR_END });
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
          fetch(
            "https://cloud.internalpositioning.com" +
              "/api/v1/location/posifi/nuevo"
          )
            .then(res => {
              res.json().then(data =>
                dispatch({
                  type: COLLECT_ERROR_SUCCESS,
                  payload: data.analysis.guesses
                })
              );
            })
            .catch(err => {
              dispatch({ type: COLLECT_ERROR_ERROR, payload: err });
            });
        })
        .catch(err => {
          dispatch({ type: ERROR_SEND_WIFI_ERROR, payload: err });
        });
    },
    error => {
      console.log(error);
    }
  );
};
