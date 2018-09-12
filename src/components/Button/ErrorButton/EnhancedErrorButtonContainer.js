import { connect } from "react-redux";
import { EnhancedErrorButton } from "./EnhancedErrorButton";
import { calculateErrors } from "../../../state/actions";

var mapStateToProps = state => ({});

var mapActionsToProps = {
  onPressButton: () => ({
    type: `CALCULATE_ERROR`
  }),
  calculateErrors
};

export var EnhancedErrorButtonContainer = connect(
  mapStateToProps,
  mapActionsToProps
)(EnhancedErrorButton);
EnhancedErrorButtonContainer.displayName = "connect(EnhancedErrorButton)";
