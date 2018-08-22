import React from "react";
import { View } from "react-native";

export var CustomView = props => {
  const { children, hide, style } = props;
  if (hide) {
    return null;
  }
  return (
    <View {...this.props} style={style}>
      {children}
    </View>
  );
};
