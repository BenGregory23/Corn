import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MoviesScreen from "../screens/MoviesScreen";
import SettingsScreen from "../screens/SettingsScreen";


export default function UsersNavigator() {
    const Stack = createStackNavigator();
    return (
    
        <Stack.Navigator screenOptions={{
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: '#fff',
          //if route is Movies, headerShown: false
            headerShown: false

        }} initialRouteName="Movies">
          <Stack.Screen name="Movies" component={MoviesScreen}/>
          <Stack.Screen name="Settings" component={SettingsScreen}/>
        </Stack.Navigator>
  
    )
  }