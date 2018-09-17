import React, { Fragment } from "react";
import { StyleSheet } from "react-native";
import { Card } from "native-base";
import { Item } from "../components/CardItem";
import { EnhancedCustomInputContainer as Input } from "../components/Input";
import { EnhancedTrackButtonContainer as Button } from "../components/Button/TrackButton";

export var TrackTab = ({ text }) => (
  <Fragment>
    <Input id={"host"} />
    <Input id={"device"} />
    <Button id={"scan"} text={"Track Phone"} />
    <Card>
      <Item head={"Track Information"} id={"track"} text={text} />
    </Card>
  </Fragment>
);

const styles = StyleSheet.create({
  card: {
    height: 150
  }
});
