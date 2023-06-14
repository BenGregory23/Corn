import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import FriendsScreen from "../screens/FriendsScreen";
import CommonMovies from "../screens/CommonMovies";
import  AddFriendScreen from "../screens/AddFriendScreen";


export default function FriendsNavigator() {
    const Stack = createStackNavigator();
    return (
    
        <Stack.Navigator screenOptions={{
          headerStyle: {
            backgroundColor: 'black',

          },
          headerShown:false,
            
        }} initialRouteName="Friends">
          <Stack.Screen name="Movies" component={CommonMovies}/>
          <Stack.Screen name="Friends" component={FriendsScreen}/>
          <Stack.Screen name="Add" component={AddFriendScreen}/>
        </Stack.Navigator>
  
    )
  }