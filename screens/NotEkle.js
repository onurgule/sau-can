import React, {Component} from "react";
import { View, StyleSheet, Text } from "react-native";
import { Container, Header, Content, Form, Item, Input, Label, Picker, Icon, Button, Toast } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class NotEkle extends Component {
  constructor(props) {
      super(props);
      this.state = {
        lectures: [],
        works: [],
        selectedLesson: 0,
        selectedWork: 0,
        not:-1,
        sauid:0,
      };
    }
  async componentDidMount(){
    fetch("http://onurgule.com.tr/saucan/getLectures.php?semester=0&works=1").then(res => res.json()).then(ret => {
          //console.log(ret);
          this.setState({lectures:ret});
        });
        try {
          const value = await AsyncStorage.getItem('sauid')
          if(value !== null) {
            console.log(value,"sauidNot");
            this.setState({sauid:value});
          }
        } catch(e) {
          console.log(e)
          // error reading value
        }
        //console.log(this.props.navigation.goBack());
  }
  getWorks(lid){
    this.setState({selectedLesson:lid, works:[], selectedWork:0, not:-1});
    fetch("http://onurgule.com.tr/saucan/getLectureWorks.php?lid="+lid).then(res => res.json()).then(ret => {
          //console.log(ret);
          this.setState({works:ret});
        })
  }
  notKaydet(){
    fetch("http://onurgule.com.tr/saucan/addGrade.php?ogrno="+this.state.sauid+"&wid="+this.state.selectedWork+"&grade="+this.state.not).then(res => res.text()).then(ret => {
      console.log(ret);
      console.log("http://onurgule.com.tr/saucan/addGrade.php?ogrno="+this.state.sauid+"&wid="+this.state.selectedWork+"&grade="+this.state.not);
    })
    Toast.show({
      text: 'Notunuz Kaydedildi...',
      buttonText: 'Tamam',
      position:"bottom",
      type: "success",
      style:{marginBottom:50},
      onClose:(reason) => {
        console.log(reason);
        //this.props.navigation.navigate("Notlar");
      }
    })
    
  }
  render() {
    return (
      <Container>
        <Content>
          { this.state.lectures.length > 0 &&
          <Form>
            <Item>
              <Label>Ders</Label>
              <Picker
              mode="dropdown"
              placeholder="Ders Seçiniz..."
              placeholderStyle={{ color: "#bfc6ea" }}
              placeholderIconColor="#007aff"
              iosIcon={<Icon name="arrow-down" />}
              headerStyle={{ backgroundColor: "#b95dd3" }}
              headerBackButtonTextStyle={{ color: "#fff" }}
              headerTitleStyle={{ color: "#fff" }}
              selectedValue={this.state.selectedLesson}
              onValueChange={ (sel) => this.getWorks(sel)}
            >
              <Picker.Item key={0} label={"Ders Seçiniz"} value={0} />
              {
                this.state.lectures.map((lecture) => {
                  return(
              <Picker.Item key={lecture.LID} label={lecture.Code + " - " + lecture.Name} value={lecture.LID} />
                  )
                })
              }
            </Picker>
            </Item>
            <Item>
              <Label>Görev</Label>
              <Picker
              enabled={this.state.works.length>0?true:false}
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
              headerStyle={{ backgroundColor: "#b95dd3" }}
              headerBackButtonTextStyle={{ color: "#fff" }}
              headerTitleStyle={{ color: "#fff" }}
              selectedValue={this.state.selectedWork}
              onValueChange={ (sel) => this.setState({selectedWork:sel})}
            >
               <Picker.Item key={0} label={"Görev Seçiniz"} value={0} />
              {
                this.state.works.map((work) => {
                  return(
              <Picker.Item key={work.WID} label={work.Type + " - %" + work.Ratio} value={work.WID} />
                  )
                })
              }
            </Picker>
            </Item>
            {
              this.state.selectedWork != 0 &&
            <Item style={{marginLeft:120, marginRight:120}} floatingLabel >
              <Label style={{textAlign:"center"}}>Notunuz</Label>
              <Input  keyboardType="phone-pad" style={{textAlign:"center"}} onChangeText={(val) => this.setState({not:val})} />
            </Item>
            }
           { this.state.not >= 0 &&
           <Button onPress={()=> this.notKaydet()} style={{alignSelf:"center", marginVertical:50}}  primary><Text style={{color:"#fff"}}> {"Notu Kaydet"} </Text></Button>
            }        
          </Form>
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