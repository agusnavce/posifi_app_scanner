import React from "react";
import { Item, Input, Label } from "native-base";
import startCase from "lodash/startCase";

export var CustomInput = ({ id, onTextChange, value }) => (
  <Item stackedLabel>
    <Label>{startCase(id)}</Label>
    <Input onChange={onTextChange(id)} value={value} />
  </Item>
);
