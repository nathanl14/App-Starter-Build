import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { createStackNavigator } from '@react-navigation/stack';
import Home from './Home';
import StartCareerScreen from './components/StartCareerScreen';
import Chrome from './components/Chrome';
import Phone from './components/Phone';
import Instagram from './components/Instagram';
import BottomNavigator from './components/BottomNavigator';  
import Training from './components/Training';
import Splash from './components/Splash';
import Week from './components/Week';   
import Character from './components/Character';
import College from './components/College';                           
import Auditions from './components/Auditions';      
import Actdashboard from './components/Actdashboard';      
import Actingprofile from './components/Actingprofile';   
import AssetExample from './components/AssetExample';
import Assets from './components/Assets';  
import Realestate from './components/Realestate';
import Cars from './components/Cars';  
import Bank from './components/Bank'; 
import Acting from './components/Acting';     
import LoginScreen from './components/LoginScreen';   
import Beginnerauditions from './components/Beginnerauditions';
import Driverslicense from './components/Driverslicense';    
import Ownedhomes from './components/Ownedhomes';      
import Tindr from './components/Tindr';      
import Relationships from './components/Relationships';   
import Shopping from './components/Shopping'; 
import Allshoppingstuff from './components/Allshoppingstuff';       
import Stuff from './components/Stuff';     
import Ownedcars from './components/Ownedcars';
import Jobs from './components/Job';
import Twittr from './components/Twittr';
import Network from './components/Network';
import Syndication from './components/Sydication';
import Settings from './components/Settings';
import Sponsorship from './components/Sponsorship';
import Staff from './components/Staff'; 
import Production from './components/Production'; 


import { Easing, StatusBar, StyleSheet, Text, View } from 'react-native';

import { 
  TransitionSpecs,
  HeaderStyleInterpolators,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import firebase from 'firebase';

const Stack = createStackNavigator();

const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 50,
    mass: 3,
    overshootClamping: false,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

const closeConfig = {
  animation: 'timing',
  config: {
    duration: 160,       
    easing: Easing.linear,
  },
};

const customTransition = {
  gestureEnabled: true, 
  gestureDirection: 'horizontal',
  transitionSpec: {
    open: TransitionSpecs.TransitionIOSSpec,
    close: TransitionSpecs.TransitionIOSSpec,
  },
  cardStyleInterpolator: ({ current, next, layouts }) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
          {
            rotate: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: ['180deg', '0deg'],
            }),
          },
          {
            scale: next
              ? next.progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 0.7],
                })
              : 1,
          },
        ],
      },
      opacity: current.opacity,
    };
  },
};

const AppStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name="BottomNavigator" component={BottomNavigator} options={{ gestureEnabled: false }} />
      <Stack.Screen name="StartCareerScreen" component={StartCareerScreen} options={{ gestureEnabled: false }} />
      <Stack.Screen name="Home" component={Home} options={{ gestureEnabled: false }} />
      <Stack.Screen name="Chrome" component={Chrome} options={{ gestureEnabled: false }} />
      <Stack.Screen name="Phone" component={Phone} options={{ gestureEnabled: false }} />
      <Stack.Screen name="Training" component={Training} options={{ gestureEnabled: false }} />
      <Stack.Screen name="Splash" component={Splash} options={{ gestureEnabled: false }} />
      <Stack.Screen name="College" component={College} options={{ gestureEnabled: false }} />
      <Stack.Screen name="Instagram" component={Instagram} options={{ gestureEnabled: false }} />
      <Stack.Screen name="Character" component={Character} options={{ gestureEnabled: false }} />
      <Stack.Screen name="Auditions" component={Auditions} options={{ gestureEnabled: false }} />
      <Stack.Screen name="Actingprofile" component={Actingprofile} options={{ gestureEnabled: false }} />
      <Stack.Screen name="Actdashboard" component={Actdashboard} options={{ gestureEnabled: false }} />
      <Stack.Screen name="AssetExample" component={AssetExample} options={{ gestureEnabled: false }} />
      <Stack.Screen name="Assets" component={Assets} options={{ gestureEnabled: false }} />
      <Stack.Screen name="Realestate" component={Realestate} options={{ gestureEnabled: false }} />
      <Stack.Screen name="Cars" component={Cars} options={{ gestureEnabled: false }} />
      <Stack.Screen name="Bank" component={Bank} options={{ gestureEnabled: false }} />
      <Stack.Screen name="Acting" component={Acting} options={{ gestureEnabled: false }} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ gestureEnabled: false }} />
      <Stack.Screen name="Beginnerauditions" component={Beginnerauditions} options={{ gestureEnabled: false }} />
      <Stack.Screen name="Driverslicense" component={Driverslicense} options={{ gestureEnabled: false }} />
      <Stack.Screen name="Ownedhomes" component={Ownedhomes} options={{ gestureEnabled: false }} /> 
      <Stack.Screen name="Tindr" component={Tindr} options={{ gestureEnabled: false }} />
      <Stack.Screen name="Relationships" component={Relationships} options={{ gestureEnabled: false }} />
      <Stack.Screen name="Shopping" component={Shopping} options={{ gestureEnabled: false }} />
      <Stack.Screen name="Allshoppingstuff" component={Allshoppingstuff} options={{ gestureEnabled: false }} />
      <Stack.Screen name="Stuff" component={Stuff} options={{ gestureEnabled: false }} />
      <Stack.Screen name="Ownedcars" component={Ownedcars} options={{ gestureEnabled: false }} />
      <Stack.Screen name="Jobs" component={Jobs} options={{ gestureEnabled: false }} />
      <Stack.Screen name="Twittr" component={Twittr} options={{ gestureEnabled: false }} />
      <Stack.Screen name="Network" component={Network} options={{ gestureEnabled: false }} />
      <Stack.Screen name="Syndication" component={Syndication} options={{ gestureEnabled: false }} />
      <Stack.Screen name="Settings" component={Settings} options={{ gestureEnabled: false }} />
      <Stack.Screen name="Sponsorship" component={Sponsorship} options={{ gestureEnabled: false }} />
      <Stack.Screen name="Staff" component={Staff} options={{ gestureEnabled: false }} />

 <Stack.Screen name="Production" component={Production} options={{ gestureEnabled: false }} />


      <Stack.Screen
        name="Week"
        component={Week}
        options={{
          gestureDirection: 'vertical',
          transitionSpec: {
            open: config,
            close: closeConfig,
            edgeWidth: 0,
          },
          cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
        }} 
      />
          </Stack.Navigator>
  );
};
    


const App = () => {
  return (
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
  );
};

export default App;
