import React, { Component } from "react";
import { View, Button, StyleSheet } from "react-native";
import { Container, Header, Content, Card, CardItem, Text, Body } from "native-base";

export default class IstatistikScreen extends Component {
  static navigationOptions = {
    header: null,
    };
    constructor(props) {
        super(props);
        this.state = {
          ready: true,
        };
      }
  render() {
    return (

        <Container>
        <Content padder>
          <Card>
            <CardItem header bordered>
              <Text>Yarıyıl Desteği</Text>
            </CardItem>
            <CardItem bordered>
              <Body>
                <Text>
                  Şu anda yalnızca almakta olduğumuz 7. yarıyıl derslerin desteği mevcuttur. 
                </Text>
              </Body>
            </CardItem>
            <CardItem footer bordered>
              <Text>SAU ÇAN</Text>
            </CardItem>
          </Card>
        </Content>
      </Container>

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