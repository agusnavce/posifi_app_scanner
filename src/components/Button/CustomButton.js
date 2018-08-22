import React, { View } from "react";
import { Button, Text } from "native-base";

export var CustomButton = ({ active, id, text, onPressButton }) => (
  <Button onPress={onPressButton(id)} block primary>
    <Text> {text} </Text>
  </Button>
);
