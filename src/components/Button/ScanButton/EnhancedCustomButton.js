import withHandlers from "recompose/withHandlers";
import compose from "recompose/compose";
import { CustomButton } from "./CustomButton";

var enhance = compose(
  withHandlers({
    onPressButton: ({ scanFingerprints }) => () => {
      scanFingerprints();
    }
  })
);

export var EnhancedCustomButton = enhance(CustomButton);
EnhancedCustomButton.displayName = "enhance(CustomButton)";
