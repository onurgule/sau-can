import React, { Component } from "react";
import { View, Button, StyleSheet } from "react-native";
import { Container, Header, Content, List, ListItem, Text } from 'native-base';

export default class MainScreen extends Component {
  static navigationOptions = {
    header: null,
    };
    constructor(props) {
        super(props);
        this.state = {
          lectures: []
        };
      }
      async componentDidMount(){
        fetch("http://onurgule.com.tr/saucan/getLectures.php?semester=0").then(res => res.json()).then(ret => {
          console.log(ret);
          this.setState({lectures:ret});
        })
      }
      goToLecture(lid,namem){
        console.log(namem);
        this.props.navigation.navigate("Notlar", {lid:lid, name:namem})
      }
  render() {
    var semester = 0;
    return (

      <Container>
      <Content>
          {
            this.state.lectures.length > 0 &&
            
        <List>
          {
            this.state.lectures.map((lecture) => {
              console.log(semester, lecture.Semester)
              if(lecture.Semester != semester){
                semester = lecture.Semester;
                return [
                <ListItem itemHeader>
                  <Text>{lecture.Semester}. Yarı Yıl</Text>
                </ListItem>,
                <ListItem onPress={() => this.goToLecture(lecture.LID, lecture.Name)}>
                  <Text>{lecture.Code} - {lecture.Name}</Text>
                </ListItem>
                ];
              }
              return(
              <ListItem onPress={() => this.goToLecture(lecture.LID, lecture.Name)}>
                <Text>{lecture.Code} - {lecture.Name}</Text>
              </ListItem>
              )
            })
          }
        </List>
      }
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