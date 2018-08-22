import React from "react";
import { Switch } from "react-native-switch";

export var CustomSwitch = ({ onToggle, value }) => (
  <Switch
    value={value}
    onValueChange={onToggle}
    circleSize={30}
    barHeight={30}
    circleBorderWidth={3}
    backgroundActive={"green"}
    backgroundInactive={"gray"}
    circleActiveColor={"#30a566"}
    circleInActiveColor={"#000000"}
  />
);
