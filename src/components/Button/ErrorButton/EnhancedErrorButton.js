import withHandlers from "recompose/withHandlers";
import compose from "recompose/compose";
import { ErrorButton } from "./ErrorButton";

var enhance = compose(
  withHandlers({
    onPressButton: ({ calculateErrors }) => () => {
      calculateErrors();
    }
  })
);

export var EnhancedErrorButton = enhance(ErrorButton);
EnhancedErrorButton.displayName = "enhance(ErrorButton)";
