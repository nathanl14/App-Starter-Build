import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome } from '@expo/vector-icons';
import { Image, StyleSheet } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import React, { useState, useEffect } from 'react';
import Ionicons from "react-native-vector-icons/Ionicons";
import { RFValue } from "react-native-responsive-fontsize";
const Tab = createMaterialBottomTabNavigator();
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Phone from "./Phone"
import Training from "./Training"
import Actdashboard from "../components/Actdashboard"
import Assets from "../components/Assets"
import Relationships from "./Relationships"




import Home from "../Home";
import OtherScreen from  "./OtherScreen";
import StartCareerScreen from "./StartCareerScreen"
import Teams from "./Teams"
import Character from "../components/Character"
import Auditions from "./Auditions"
import Settings from "./Settings"


const BottomTabNavigator = () => {
  const [u, setU]= useState(false)
 const [initialRouteName, setInitialRouteName] = useState('Phone');

 useEffect(() => {
    const isLoggedIn = false; // or false, depending on your condition
    setInitialRouteName(isLoggedIn ? 'Training' : 'Phone');
  }, []);


  return (
    <Tab.Navigator initialRouteName="Home"
      labeled={false}
      barStyle={styles.bottomTabStyle}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Phone") {
            iconName = focused ? "phone-portrait" : "phone-portrait-outline";
          }else if (route.name === "Training") {
            iconName = focused ? "barbell" : "barbell-outline";
          }else if (route.name === "Actdashboard") {
            iconName = focused ? "videocam" : "videocam-outline";
          }else if (route.name === "Assets") {
            iconName = focused ? "wallet" : "wallet-outline";
          }else if (route.name === "Relationships") {
            iconName = focused ? "heart" : "heart-outline";
          }
          
           

          
          

        


          return (
            <Ionicons
              name={iconName}
              size={RFValue(25)}
              color={color}
              style={styles.icons}
            />
          );
        }
      })}
      activeColor={"black"}
      inactiveColor={"gray"}
    >
                  <Tab.Screen name="Relationships" component={Relationships} />
                  <Tab.Screen name="Assets" component={Assets} />
                  <Tab.Screen name="Training" component={Training} />
                  <Tab.Screen name="Home" component={Home} />
                  <Tab.Screen name="Actdashboard" component={Actdashboard} />
                  <Tab.Screen name="Phone" component={Phone} />
                  <Tab.Screen name="Settings" component={Settings} />



    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  bottomTabStyle: {
    backgroundColor: "yellow",
    height: "8%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: "hidden",
    position: "absolute"
  },
  icons: {
    width: RFValue(30),
    height: RFValue(30)
  }
});

export default BottomTabNavigator;
