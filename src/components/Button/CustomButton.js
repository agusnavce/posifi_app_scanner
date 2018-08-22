import React from "react";
import { Button, Text } from "native-base";
import { CustomView } from "../CustomView";
export var CustomButton = ({
  hide = false,
  active,
  id,
  text,
  onPressButton
}) => (
  <CustomView hide={!active && hide}>
    <Button onPress={onPressButton(id)} block primary>
      <Text> {text} </Text>
    </Button>
  </CustomView>
);
