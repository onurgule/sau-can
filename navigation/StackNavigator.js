import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from "../screens/Home";
import Notlar from "../screens/Notlar";
import NotEkle from "../screens/NotEkle";
const Stack = createStackNavigator();
const screenOptionStyle = {
  headerStyle: {
    backgroundColor: "#9AC4F8",
  },
  headerTintColor: "white",
  headerBackTitle: "Back",
};
const MainStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Dersler" component={Home} 
      options={({ navigation, route }) => ({
        headerLeft: props => <Ionicons name='md-menu' size={25} />,
      })}
      />
      <Stack.Screen name="Notlar" options={({ route }) => ({ title: route.params.name })} component={Notlar} />
    </Stack.Navigator>
  );
};
const NotEkleStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="NotEkle" component={NotEkle} />
    </Stack.Navigator>
  );
};
export { MainStackNavigator, NotEkleStackNavigator };