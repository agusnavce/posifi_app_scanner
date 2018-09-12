import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Provider } from "react-redux";
import {
  Container,
  Header,
  Body,
  Left,
  Right,
  Title,
  Tab,
  Tabs
} from "native-base";
import {
  CollectTabContainer as CollectTab,
  TrackTabContainer as TrackTab,
  ErrorTab
} from "./containers";
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
              <CollectTab />
            </Tab>
            <Tab heading="Track">
              <TrackTab />
            </Tab>
            <Tab heading="Errors">
              <ErrorTab />
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
