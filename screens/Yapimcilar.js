import React, { Component } from "react";
import { View, Button, StyleSheet } from "react-native";
import { Container, Header, Content, List, ListItem, Text, Left, Thumbnail, Body } from 'native-base';

export default class YapimcilarScreen extends Component {
  static navigationOptions = {
    header: null,
    };
    constructor(props) {
        super(props);
        this.state = {
          ready:true,
        };
      }
      async componentDidMount(){
        
      }
  render() {
    return (

        <Container>
        <Content>
          <List>
            <ListItem avatar>
              <Left>
                <Thumbnail source={{ uri: 'https://media-exp1.licdn.com/dms/image/C5603AQFB5qnw6qirMw/profile-displayphoto-shrink_200_200/0?e=1612396800&v=beta&t=7PWi16dLbI2HP24IGTAkPxCtnkR-0uXmRnrI1GxGcOw' }} />
              </Left>
              <Body>
                <Text>Onur Osman Güle</Text>
                <Text note>G171210021</Text>
              </Body>
            </ListItem>
            <ListItem avatar>
              <Left>
                <Thumbnail source={{ uri: 'https://media-exp1.licdn.com/dms/image/C4D03AQHjcLDUl5E6PQ/profile-displayphoto-shrink_800_800/0/1599042817622?e=1612396800&v=beta&t=CsyXx-iGIyLu4iG8NQJEa04HrE8PKSDyks3CfERTVd0' }} />
              </Left>
              <Body>
                <Text>Fatih Enis Kaya</Text>
                <Text note>G171210375</Text>
              </Body>
            </ListItem>
          </List>
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