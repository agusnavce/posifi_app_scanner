import { connect } from "react-redux";
import { EnhancedCustomSwitch } from "./EnhancedCustomSwitch";
import { TOGGLE_TRACKING } from "../../state/actions";

var mapStateToProps = state => ({
  value: state.data.toggle
});

var mapActionsToProps = {
  onToggle: key => ({
    type: TOGGLE_TRACKING,
    payload: key
  })
};

export var EnhancedCustomSwitchContainer = connect(
  mapStateToProps,
  mapActionsToProps
)(EnhancedCustomSwitch);
EnhancedCustomSwitchContainer.displayName = "connect(EnhancedCustomSwitch)";
