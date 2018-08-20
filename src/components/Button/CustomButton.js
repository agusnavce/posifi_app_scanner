import React from "react";
import { Button, Text } from "native-base";

export var CustomButton = ({ id, text, onPressButton }) => (
  <Button onPress={onPressButton(id)} full primary>
    <Text> {text} </Text>
  </Button>
);
