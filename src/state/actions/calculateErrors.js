import wifi from "react-native-android-wifi";
import timer from "react-native-timer";
import { Alert } from "react-native";
import DeviceInfo from "react-native-device-info";
import { UPLOAD } from "react-native-dotenv";
import {
  PARAMETERS_ERROR,
  ERROR_SEND_WIFI_ERROR,
  COLLECT_ERROR_SUCCESS,
  COLLECT_ERROR_START,
  COLLECT_ERROR_END,
  COLLECT_ERROR_ERROR
} from "./actions";

export const calculateErrors = () => {
  return async (dispatch, getState) => {
    var state = getState().data;
    var host = state.host;
    var device = state.device;
    var place = state.place;
    var family = state.family;
    if (host === undefined || host === "") host = "http://api.posifi.live";
    if (device === undefined || device === "")
      device = await DeviceInfo.getMACAddress();
    if (family === "" || family === undefined) family = "posifi";

    if (place === undefined || place === "") {
      dispatch({ type: PARAMETERS_ERROR });
      Alert.alert(
        "Error en los parametros",
        "Se deben completar el dispositivo",
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

var getAndSendWifi = (dispatch, host, device, place, family) => () => {
  wifi.reScanAndLoadWifiList(
    wifiStringList => {
      wifiList = JSON.parse(wifiStringList);
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
          d: device,
          f: family
        })
      })
        .then(() => {
          fetch(host + "/api/v1/location/posifi/nuevo")
            .then(res => {
              res.json().then(data =>
                fetch(UPLOAD, {
                  method: "POST",
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify({
                    data: data.analysis.guesses,
                    place: place,
                    task: "error"
                  })
                }).then(() => {
                  dispatch({
                    type: COLLECT_ERROR_SUCCESS
                  });
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
