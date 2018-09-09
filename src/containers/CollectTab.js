import React, { Fragment } from "react";
import { Card } from "native-base";
import { Item } from "../components/CardItem";
import { EnhancedCustomInputContainer as Input } from "../components/Input";
import { EnhancedCustomButtonContainer as Button } from "../components/Button";

export var CollectTab = () => (
  <Fragment>
    <Input id={"host"} />
    <Input id={"family"} />
    <Input id={"device"} />
    <Input id={"place"} />
    <Button id={"scan"} text={"scan fingerprints"} />
    <Card>
      <Item
        head={"Collect Information"}
        id={"collect"}
        text={"scan Fingerprints"}
      />
    </Card>
  </Fragment>
);
