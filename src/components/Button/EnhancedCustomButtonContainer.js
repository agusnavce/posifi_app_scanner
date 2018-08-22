import { connect } from "react-redux";
import { EnhancedCustomButton } from "./EnhancedCustomButton";
import upperCase from "lodash/upperCase";
import { scanFingerprints } from "../../state/actions";

var mapStateToProps = state => ({
  active: state.data.toggle
});

var mapActionsToProps = {
  onPressButton: key => ({
    type: `${upperCase(key)}_FINGERPRINTS`
  }),
  scanFingerprints
};

export var EnhancedCustomButtonContainer = connect(
  mapStateToProps,
  mapActionsToProps
)(EnhancedCustomButton);
EnhancedCustomButtonContainer.displayName = "connect(EnhancedCustomButton)";
