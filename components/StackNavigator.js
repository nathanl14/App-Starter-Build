import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import BottomNavigator from "./BottomNavigator";
import Home from "../Home";
import Phone from "./Phone"
import Chrome from "./Chrome"
import Instagram from "./Instagram"


const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Tab"
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="BottomNavigator" component={BottomNavigator} />
      <Stack.Screen name="Home" component={Home} />
       <Stack.Screen name="Phone" component={Phone} />
       <Stack.Screen name="Chrome" component={Chrome} />
        <Stack.Screen name="Instagram" component={Instagram} />
        <Stack.Screen name="Training" component={Training} />


    </Stack.Navigator>
  );
};

export default StackNavigator;
