import withHandlers from "recompose/withHandlers";
import compose from "recompose/compose";
import { CustomButton } from "./CustomButton";

var enhance = compose(
  withHandlers({
    onPressButton: ({
      scanFingerprints,
      trackFingerprints,
      active
    }) => key => () => {
      if (!active) {
        scanFingerprints();
      } else {
        trackFingerprints();
      }
    }
  })
);

export var EnhancedCustomButton = enhance(CustomButton);
EnhancedCustomButton.displayName = "enhance(CustomButton)";
