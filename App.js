import React from 'react';
import { Root } from "native-base";
import { AppLoading, View } from 'expo';
import { Container, Text, Icon } from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigator from "./navigation/DrawerNavigator";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image } from 'react-native';
import Login from './components/Login';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      sauid: 0,
      logged:false,
    };
    this.logged = this.logged.bind(this);
    this.cikis = this.cikis.bind(this);
  }

  async logged(sauid){
    try {
      await AsyncStorage.setItem('sauid',sauid+"")
    } catch (e) {
      // saving error
    }
    this.setState({logged:true});
  }
  async cikis(){
    await AsyncStorage.clear();
    this.setState({logged:false,sauid:0});
  }
  async componentDidMount() {
    //await AsyncStorage.clear();
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    try {
      const value = await AsyncStorage.getItem('sauid')
      if(value !== null) {
        console.log(value,"sauid");
        this.setState({sauid:value, logged:true});
      }
      else{
        this.setState({logged:false});
      }
    } catch(e) {
      console.log(e)
      // error reading value
    }
    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }
    if(this.state.logged == false){ //Login sayfası
      return (<Login logged={this.logged}/>);
    }

    return (
      <Root>
      <NavigationContainer>
      <DrawerNavigator sauid={this.state.sauid} cikis={this.cikis} />
      </NavigationContainer>
      </Root>
    );
  }
}
