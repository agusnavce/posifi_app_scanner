import { connect } from "react-redux";
import { EnhancedCustomButton } from "./EnhancedCustomButton";
import { scanFingerprints } from "../../../state/actions";

var mapStateToProps = state => ({});

var mapActionsToProps = {
  onPressButton: () => ({
    type: `SCAN_FINGERPRINTS`
  }),
  scanFingerprints
};

export var EnhancedCustomButtonContainer = connect(
  mapStateToProps,
  mapActionsToProps
)(EnhancedCustomButton);
EnhancedCustomButtonContainer.displayName = "connect(EnhancedCustomButton)";
