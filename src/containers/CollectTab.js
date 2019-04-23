import React, { Fragment } from "react";
import { Card } from "native-base";
import { Item } from "../components/CardItem";
import { EnhancedCustomInputContainer as Input } from "../components/Input";
import { EnhancedCustomButtonContainer as Button } from "../components/Button/ScanButton";

export var CollectTab = ({ text }) => (
  <Fragment>
    <Input id={"host"} />
    <Input id={"place"} />
    <Button id={"scan"} text={"scan fingerprints"} />
    <Card>
      <Item head={"Collect Information"} id={"collect"} text={text} />
    </Card>
  </Fragment>
);
