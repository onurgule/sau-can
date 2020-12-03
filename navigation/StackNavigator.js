import React from "react";
import {TouchableOpacity} from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from "../screens/Home";
import Notlar from "../screens/Notlar";
import NotEkle from "../screens/NotEkle";
import IstatistikScreen from "../screens/Istatistik";
import YapimcilarScreen from "../screens/Yapimcilar";
const Stack = createStackNavigator();
const screenOptionStyle = {
  headerStyle: {
    backgroundColor: "#9AC4F8",
  },
  headerTintColor: "white",
  headerBackTitle: "Back",
};
const MainStackNavigator = (navprops) => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Dersler" component={Home} 
      options={({ navigation, route }) => ({
        headerLeft: props => <TouchableOpacity onPress={() => {navprops.navigation.toggleDrawer()}}><Ionicons name='md-menu' size={25} style={{paddingLeft:10}} /></TouchableOpacity>,
      })}
      />
      <Stack.Screen name="Notlar" options={({ route }) => ({ title: route.params.name })} component={Notlar} />
    </Stack.Navigator>
  );
};
const NotEkleStackNavigator = (navprops) => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Not Ekle" component={NotEkle}
      options={({ navigation, route }) => ({
        headerLeft: props => <TouchableOpacity onPress={() => {navprops.navigation.toggleDrawer()}}><Ionicons name='md-menu' size={25} style={{paddingLeft:10}} /></TouchableOpacity>,
      })} />
    </Stack.Navigator>
  );
};
const IstatistikStackNavigator = (navprops) => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="İstatistikler" component={IstatistikScreen}
      options={({ navigation, route }) => ({
        headerLeft: props => <TouchableOpacity onPress={() => {navprops.navigation.toggleDrawer()}}><Ionicons name='md-menu' size={25} style={{paddingLeft:10}} /></TouchableOpacity>,
      })} />
    </Stack.Navigator>
  );
};
const YapimcilarStackNavigator = (navprops) => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Yapımcılar" component={YapimcilarScreen}
      options={({ navigation, route }) => ({
        headerLeft: props => <TouchableOpacity onPress={() => {navprops.navigation.toggleDrawer()}}><Ionicons name='md-menu' size={25} style={{paddingLeft:10}} /></TouchableOpacity>,
      })} />
    </Stack.Navigator>
  );
};
export { MainStackNavigator, NotEkleStackNavigator, YapimcilarStackNavigator, IstatistikStackNavigator };