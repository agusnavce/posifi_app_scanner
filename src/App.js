import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Provider } from "react-redux";
import { Container, Header, Switch } from "native-base";
import { EnhancedCustomInputContainer as Input } from "./components/Input";
import { EnhancedCustomButtonContainer as Button } from "./components/Button";
import configureReactotron from "./ReactotronConfig";
import configureStore from "./configureStore.js";

var idleState = {};
configureReactotron();
const store = configureStore(idleState);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Container>
          <Header />
          <Input id={"host"} />
          <Input id={"family"} />
          <Input id={"device"} />
          <Button id={"scan"} text={"scan fingerprints"} />
          <Switch value={false} />
          <Button id={"track"} text={"track your phone"} />
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
  }
});
