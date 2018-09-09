import React, { Fragment } from "react";
import { Text, CardItem, Body, Ca } from "native-base";
import { StyleSheet } from "react-native";

export var Item = ({ id, text, head }) => (
  <Fragment>
    <CardItem header>
      <Text>{head}</Text>
    </CardItem>
    <CardItem id={id} style={styles.card}>
      <Body>
        <Text>{text}</Text>
      </Body>
    </CardItem>
  </Fragment>
);
const styles = StyleSheet.create({
  card: {
    height: 150
  }
});
