import { connect } from "react-redux";
import { CollectTab } from "./CollectTab";

var mapStateToProps = state => ({
  text:
    state.data.collectTitle +
    "\n" +
    state.data.collectText +
    "\n" +
    state.data.collectError
});

var mapActionsToProps = {};

export var CollectTabContainer = connect(
  mapStateToProps,
  mapActionsToProps
)(CollectTab);
CollectTabContainer.displayName = "connect(CollectTab)";
