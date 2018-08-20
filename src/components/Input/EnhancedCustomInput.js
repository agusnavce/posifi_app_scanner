import withHandlers from "recompose/withHandlers";
import compose from "recompose/compose";
import { CustomInput } from "./CustomInput";

var enhance = compose(
  withHandlers({
    onTextChange: ({ onChange }) => key => e => {
      onChange(key, e.nativeEvent.text);
    }
  })
);

export var EnhancedCustomInput = enhance(CustomInput);
EnhancedCustomInput.displayName = "enhance(CustomInput)";
