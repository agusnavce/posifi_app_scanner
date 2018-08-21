import wifi from "react-native-android-wifi";
import { SEND_WIFI_ERROR, SEND_WIFI_SUCCESS, SEND_WIFI_START } from "./actions";

export const sendWifiSignal = () => {
  return dispatch => {
    dispatch({ type: SEND_WIFI_START });
    var wifiList = [];
    wifi.reScanAndLoadWifiList(
      wifiStringList => {
        wifiList = [].concat(JSON.parse(wifiStringList));
        var lis = wifiList.reduce((previous, item) => {
          previous[item.BSSID] = item.level;
          return previous;
        }, {});
        fetch("http://google.com" + "/data", {
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
};
