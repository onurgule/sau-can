import React, { Component } from "react";
import { View, Button, StyleSheet } from "react-native";
import { Container, Header, Content, List, ListItem, Text,Spinner } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';

export default class MainScreen extends Component {
  static navigationOptions = {
    header: null,
    };
    constructor(props) {
        super(props);
        this.state = {
          lectures: [],
          sauid: 0,
        };
      }
      async componentDidMount(){
        fetch("http://onurgule.com.tr/saucan/getLectures.php?semester=0&works=0").then(res => res.json()).then(ret => {
          //console.log(ret);
          this.setState({lectures:ret});
        })
        try {
          const value = await AsyncStorage.getItem('sauid')
          if(value !== null) {
            console.log(value,"sauidNot");
            this.setState({sauid:value});
            let token = await Notifications.getExpoPushTokenAsync();
            console.log(token.data);
            fetch("http://onurgule.com.tr/saucan/updateExpoID.php?sauid="+value+"&expoid="+token.data).then(res => res.text()).then(ret => {
          //console.log(ret);
          //this.setState({lectures:ret});
          })
          }
        } catch(e) {
          console.log(e)
          // error reading value
        }
      }
      goToLecture(lid,namem){
        //console.log(namem);
        this.props.navigation.navigate("Notlar", {lid:lid, name:namem})
      }
  render() {
    var semester = 0;
    return (

      <Container>
      <Content>
        {
          this.state.lectures.length == 0 &&
          <Spinner color='blue' />
        }
          {
            this.state.lectures.length > 0 &&
            
        <List>
          {
            this.state.lectures.map((lecture) => {
              console.log(semester, lecture.Semester)
              if(lecture.Semester != semester){
                semester = lecture.Semester;
                return [
                <ListItem key={"S"+lecture.Semester} itemHeader> 
                  <Text>{lecture.Semester}. Yarı Yıl</Text>
                </ListItem>,
                <ListItem key={lecture.LID} onPress={() => this.goToLecture(lecture.LID, lecture.Name)}>
                  <Text>{lecture.Code} - {lecture.Name}</Text>
                </ListItem>
                ];
              }
              return(
              <ListItem key={lecture.LID} onPress={() => this.goToLecture(lecture.LID, lecture.Name)}>
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