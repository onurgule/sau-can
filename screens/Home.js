import React, { Component } from "react";
import { View, Button, Text, StyleSheet } from "react-native";

export default class MainScreen extends Component {
  static navigationOptions = {
    header: null,
    };
    constructor(props) {
        super(props);
        this.state = {
          coins: []
        };
      }
  render() {
    return (

        <View style={styles.center}>
        <Text>Dersler Listelenecek</Text>
        <Button
          title="Güncel Notları Listele"
          onPress={() => this.props.navigation.navigate("Notlar")} // We added an onPress event which would navigate to the About screen
        />
      </View>

    );
  }
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
});