import { connect } from "react-redux";
import { EnhancedCustomButton } from "./EnhancedCustomButton";

var mapStateToProps = (state, ownProps) => ({
  text: state.data[ownProps.id]
});

var mapActionsToProps = {};

export var CardItemContainer = connect(
  mapStateToProps,
  mapActionsToProps
)(EnhancedCustomButton);
EnhancedCustomButtonContainer.displayName = "connect(EnhancedCustomButton)";
