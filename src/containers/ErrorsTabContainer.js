import { connect } from "react-redux";
import { ErrorsTab } from "./ErrorsTab";

var mapStateToProps = state => ({
  text: state.data.errorsTitle + "\n" + state.data.errorsSamples
});

var mapActionsToProps = {};

export var ErrorsTabContainer = connect(
  mapStateToProps,
  mapActionsToProps
)(ErrorsTab);
ErrorsTabContainer.displayName = "connect(ErrorsTab)";
