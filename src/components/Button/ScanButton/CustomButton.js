import React from "react";
import { Button, Text } from "native-base";
import { CustomView } from "../../CustomView";
export var CustomButton = ({ text, onPressButton }) => (
  <CustomView>
    <Button onPress={onPressButton} block primary>
      <Text> {text} </Text>
    </Button>
  </CustomView>
);
