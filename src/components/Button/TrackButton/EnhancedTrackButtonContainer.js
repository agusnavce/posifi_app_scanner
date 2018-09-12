import { connect } from "react-redux";
import { EnhancedTrackButton } from "./EnhancedTrackButton";
import { trackFingerprints } from "../../../state/actions";

var mapStateToProps = state => ({});

var mapActionsToProps = {
  onPressButton: () => ({
    type: `TRACK_FINGERPRINTS`
  }),
  trackFingerprints
};

export var EnhancedTrackButtonContainer = connect(
  mapStateToProps,
  mapActionsToProps
)(EnhancedTrackButton);
EnhancedTrackButtonContainer.displayName = "connect(EnhancedTrackButton)";
