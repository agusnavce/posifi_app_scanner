import withHandlers from "recompose/withHandlers";
import compose from "recompose/compose";
import { CustomSwitch } from "./CustomSwitch";

var enhance = compose(
  withHandlers({
    onToggle: ({ onToggle, value }) => () => {
      onToggle(value);
    }
  })
);

export var EnhancedCustomSwitch = enhance(CustomSwitch);
EnhancedCustomSwitch.displayName = "enhance(CustomSwitch)";
