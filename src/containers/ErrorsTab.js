import React, { Fragment } from "react";
import { StyleSheet } from "react-native";
import { Card } from "native-base";
import { Item } from "../components/CardItem";
import { EnhancedCustomInputContainer as Input } from "../components/Input";
import { EnhancedErrorButtonContainer as Button } from "../components/Button/ErrorButton";

export var ErrorTab = () => (
  <Fragment>
    <Input id={"host"} />
    <Input id={"family"} />
    <Input id={"device"} />
    <Input id={"place"} />
    <Button id={"scan"} text={"Calculate Error"} />
    <Card>
      <Item
        head={"Error percentage information"}
        id={"errors"}
        text={"The percentage error is..."}
      />
    </Card>
  </Fragment>
);

const styles = StyleSheet.create({
  card: {
    height: 150
  }
});
