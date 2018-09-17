import React, { Fragment } from "react";
import { Card } from "native-base";
import { Item } from "../components/CardItem";
import { EnhancedCustomInputContainer as Input } from "../components/Input";
import { EnhancedErrorButtonContainer as Button } from "../components/Button/ErrorButton";

export var ErrorsTab = ({ text }) => (
  <Fragment>
    <Input id={"host"} />
    <Input id={"device"} />
    <Input id={"place"} />
    <Button id={"scan"} text={"Calculate Error"} />
    <Card>
      <Item head={"Error percentage information"} id={"errors"} text={text} />
    </Card>
  </Fragment>
);
