import { connect } from "react-redux";
import { EnhancedCustomButton } from "./EnhancedCustomButton";
import upperCase from "lodash/upperCase";
import { sendWifiSignal } from "../../state/actions";

var mapStateToProps = () => ({});

var mapActionsToProps = {
  onPressButton: key => ({
    type: `${upperCase(key)}_FINGERPRINTS`
  }),
  sendWifiSignal
};

export var EnhancedCustomButtonContainer = connect(
  mapStateToProps,
  mapActionsToProps
)(EnhancedCustomButton);
EnhancedCustomButtonContainer.displayName = "connect(EnhancedCustomButton)";
