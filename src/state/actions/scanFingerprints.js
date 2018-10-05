import wifi from "react-native-android-wifi";
import timer from "react-native-timer";
import { Alert } from "react-native";
import {
  PARAMETERS_ERROR,
  SEND_WIFI_ERROR,
  SEND_WIFI_SUCCESS,
  SEND_WIFI_START,
  SEND_WIFI_END
} from "./actions";

export const scanFingerprints = () => {
  return (dispatch, getState) => {
    var state = getState().data;
    var host = state.host;
    var device = state.device;
    var place = state.place;
    var family = state.family;
    if (
      host === undefined ||
      host === "" ||
      device === undefined ||
      device === "" ||
      place === undefined ||
      place === "" ||
      family === undefined ||
      family === ""
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
        timer.setInterval(
          "newTimer",
          getAndSendWifi(dispatch, host, device, place, family),
          2000
        );
        dispatch({ type: SEND_WIFI_START });
      }
    }
  };
};

var getAndSendWifi = (dispatch, host, device, place, family) => () => {
  wifi.reScanAndLoadWifiList(
    wifiStringList => {
      wifiList = [].concat(JSON.parse(wifiStringList));
      var lis = wifiList.reduce((previous, item) => {
        previous[item.BSSID] = item.level;
        return previous;
      }, {});
      var data = wifiList.length;
      fetch(host + "/data", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          s: { wifi: lis },
          d: device,
          l: place,
          f: family
        })
      })
        .then(() => {
          dispatch({
            type: SEND_WIFI_SUCCESS,
            payload: data
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
