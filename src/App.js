import React, { Component } from "react";
import { StyleSheet, TextInput } from "react-native";
import { Provider } from "react-redux";
import {
  Container,
  Header,
  Text,
  Card,
  CardItem,
  Body,
  Left,
  Right,
  Title,
  Tab,
  Tabs
} from "native-base";
import { EnhancedCustomSwitchContainer as Switch } from "./components/Switch";
import { EnhancedCustomInputContainer as Input } from "./components/Input";
import { EnhancedCustomButtonContainer as Button } from "./components/Button";
import { PermissionsAndroid } from "react-native";
import configureReactotron from "./ReactotronConfig";
import configureStore from "./configureStore.js";

var idleState = {};
configureReactotron();
const store = configureStore(idleState);

export default class App extends Component {
  async askForUserPermissions() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Wifi networks",
          message: "We need your permission in order to find wifi networks"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Thank you for your permission! :)");
      } else {
        console.log(
          "You will not able to retrieve wifi available networks list"
        );
      }
    } catch (err) {
      console.warn(err);
    }
  }
  componentDidMount() {
    this.askForUserPermissions();
  }

  render() {
    return (
      <Provider store={store}>
        <Container>
          <Header hasTabs>
            <Left />
            <Body>
              <Title>Posifi Scanner</Title>
            </Body>
            <Right />
          </Header>
          <Tabs>
            <Tab heading="Collect">
              <Input style={styles.input} id={"host"} />
              <Input id={"family"} />
              <Input id={"device"} />
              <Input id={"place"} />
              <Button id={"scan"} text={"scan fingerprints"} />
              <Text> Enable Tracking</Text>
              <Switch />
              <Button hide={true} id={"track"} text={"track your phone"} />
              <Card>
                <CardItem style={styles.card}>
                  <Body>
                    <Text>{"Scanning FIngerprints"}</Text>
                  </Body>
                </CardItem>
              </Card>
            </Tab>
            <Tab heading="Errors">
              <Input style={styles.input} id={"host"} />
              <Input id={"family"} />
              <Input id={"device"} />
              <Input id={"place"} />
              <Button id={"errors"} text={"Run error"} />
              <Card>
                <CardItem style={styles.card}>
                  <Body>
                    <Text>{"Scanning FIngerprints"}</Text>
                  </Body>
                </CardItem>
              </Card>
            </Tab>
          </Tabs>
        </Container>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    marginTop: 50,
    padding: 20,
    backgroundColor: "#ffffff"
  },
  input: {
    padding: 10
  },
  card: {
    height: 150
  }
});
