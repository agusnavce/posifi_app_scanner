import withHandlers from "recompose/withHandlers";
import compose from "recompose/compose";
import { TrackButton } from "./TrackButton";

var enhance = compose(
  withHandlers({
    onPressButton: ({ trackFingerprints }) => () => {
      trackFingerprints();
    }
  })
);

export var EnhancedTrackButton = enhance(TrackButton);
EnhancedTrackButton.displayName = "enhance(TrackButton)";
