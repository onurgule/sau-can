import React, {Component} from "react";
import { View, StyleSheet, } from "react-native";
import { Container, Header, Content, List, ListItem, Text, Left, Right, Body } from 'native-base';
export default class Notlar extends Component {
  static navigationOptions = {
    header: null,
    };
    constructor(props) {
        super(props);
        this.state = {
          works: []
        };
      }
      async componentDidMount(){
        this.props.navigation.setOptions({ title: this.props.route.params.name });
        console.log(this);
        fetch("http://onurgule.com.tr/saucan/getLectureWorks.php?lid="+this.props.route.params.lid).then(res => res.json()).then(ret => {
          console.log(ret);
          this.setState({works:ret});
        })
      }
      render() {
        var semester = 0;
        return (
          <Container>
      <Content>
          {
            this.state.works.length > 0 &&
            
        <List>
          {
            this.state.works.map((work) => {
              
              return(
              <ListItem onPress={() => this.goToLecture(lecture.LID)}>
                
                
                <Left>
                <Text>{work.Type}</Text>
              </Left>
              <Body>
                <Text>Ortalama</Text>
                <Text note>{work.ORT}</Text>
              </Body>
              <Right>
              <Text>%{work.Ratio}</Text>
              </Right>
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
