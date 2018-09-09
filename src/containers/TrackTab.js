import React, { Fragment } from "react";
import { StyleSheet } from "react-native";
import { Card } from "native-base";
import { Item } from "../components/CardItem";
import { EnhancedCustomInputContainer as Input } from "../components/Input";
import { EnhancedCustomButtonContainer as Button } from "../components/Button";

export var TrackTab = () => (
  <Fragment>
    <Input id={"host"} />
    <Input id={"family"} />
    <Input id={"device"} />
    <Input id={"place"} />
    <Button id={"scan"} text={"scan fingerprints"} />
    <Card>
      <Item head={"Track Information"} id={"track"} text={"Tracking phone"} />
    </Card>
  </Fragment>
);

const styles = StyleSheet.create({
  card: {
    height: 150
  }
});
