import React, {Component} from 'react';
import { BackHandler, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
class Logout extends React.Component {
    constructor(props) {
        super(props);
      }
      componentDidMount(){
          console.log(this.props.navigation.getParam("logoutfunc"));
          //this.props.navigation.jumpTo(0);
      }
    render(){
        return(
          <View>
            <Text style={{textAlign:"center",marginTop:50}}>Çıkış Yapılmıştır...</Text>
         </View>
      );
    }
  }
  export { Logout };