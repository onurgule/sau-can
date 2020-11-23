import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NotEkleStackNavigator } from "./StackNavigator";
import TabNavigator from "./TabNavigator";
const Drawer = createDrawerNavigator();
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={TabNavigator} />
      <Drawer.Screen name="NotEkle" component={NotEkleStackNavigator} />
    </Drawer.Navigator>
  );
};
export default DrawerNavigator;