import React, {Component} from "react";
import { createDrawerNavigator,DrawerContentScrollView, DrawerItemList, DrawerItem } from "@react-navigation/drawer";
import { NotEkleStackNavigator, IstatistikStackNavigator, YapimcilarStackNavigator } from "./StackNavigator";
import { Logout } from "../components/Logout";
import TabNavigator from "./TabNavigator";
const Drawer = createDrawerNavigator();
function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label="Çıkış" onPress={() => props.cikis()} />
    </DrawerContentScrollView>
  );
}
class DrawerNavigator extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount(){
    //this.props.cikis()
  }
  render() {
    console.log(this);
    return (
      <Drawer.Navigator drawerContent={props => <CustomDrawerContent cikis={this.props.cikis} {...props} />}>
        <Drawer.Screen name="Dersler" component={TabNavigator} />
        <Drawer.Screen name="İstatistikler" component={IstatistikStackNavigator} />
        <Drawer.Screen name="Yapımcılar" component={YapimcilarStackNavigator} />
      </Drawer.Navigator>
    );
  }
}
export default DrawerNavigator;