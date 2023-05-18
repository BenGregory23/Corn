import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import FriendsScreen from "../screens/FriendsScreen";
import CommonMovies from "../components/CommonMovies";


export default function FriendsNavigator() {
    const Stack = createStackNavigator();
    return (
    
        <Stack.Navigator initialRouteName="Friends">
          <Stack.Screen name="Movies" component={CommonMovies}/>
          <Stack.Screen name="Friends" component={FriendsScreen}/>
        </Stack.Navigator>
  
    )
  }