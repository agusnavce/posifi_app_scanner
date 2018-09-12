import { connect } from "react-redux";
import { TrackTab } from "./TrackTab";

var mapStateToProps = state => ({
  text:
    state.data.trackTitle +
    "\n" +
    state.data.trackText +
    "\n" +
    state.data.trackError
});

var mapActionsToProps = {};

export var TrackTabContainer = connect(
  mapStateToProps,
  mapActionsToProps
)(TrackTab);
TrackTabContainer.displayName = "connect(TrackTab)";
