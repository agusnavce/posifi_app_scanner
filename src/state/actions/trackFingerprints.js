import wifi from "react-native-android-wifi";
import timer from "react-native-timer";
import DeviceInfo from "react-native-device-info";
import {
  TRACK_SEND_WIFI_ERROR,
  TRACK_SEND_WIFI_SUCCESS,
  FETCH_PREDICTIONS_SUCCESS,
  FETCH_PREDICTIONS_START,
  FETCH_PREDICTIONS_END,
  FETCH_PREDICTIONS_ERROR
} from "./actions";

export const trackFingerprints = () => {
  return async (dispatch, getState) => {
    var state = getState().data;
    var host = state.host;
    var device = state.device;
    var family = state.family;
    if (host === undefined || host === "") host = "http://api.posifi.live";
    if (device === undefined || device === "") {
      var mac = await DeviceInfo.getMACAddress();
      var device = mac.replace(/:/g, "").toLowerCase();
    }
    if (family === "" || family === undefined) family = "posifi";
    if (timer.intervalExists("newTimer")) {
      timer.clearInterval("newTimer");
      dispatch({ type: FETCH_PREDICTIONS_END });
    } else {
      timer.setInterval(
        "newTimer",
        getAndSendWifi(dispatch, host, device, family),
        2000
      );
      dispatch({ type: FETCH_PREDICTIONS_START });
    }
  };
};

var getAndSendWifi = (dispatch, host, name, family) => () => {
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
          d: name,
          f: family
        })
      })
        .then(() => {
          dispatch({ type: TRACK_SEND_WIFI_SUCCESS });
          fetch(host + `/api/v1/location/${family}/${name}`)
            .then(res => {
              res.json().then(data => {
                return dispatch({
                  type: FETCH_PREDICTIONS_SUCCESS,
                  payload: data.analysis.guesses
                });
              });
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
