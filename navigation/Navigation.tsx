import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import FriendsScreen from '../screens/FriendsScreen';
import MoviesScreen from '../screens/MoviesScreen';
import { Home, User2, Users2, Clapperboard, LayoutList} from 'lucide-react-native';
import FriendsNavigator from './FriendsNavigator';


const Navigation = () => {
    const Tab = createBottomTabNavigator();

    return (

          <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
           
            if(focused){
              size = 27
              
            }
            else size = 25

            if (route.name === 'Home') {
              return <View style={screenOptions.tabView}><Clapperboard size={size} color={color}   /></View>
            }
            else if (route.name === "Movie"){
              return <View style={screenOptions.tabView}><LayoutList size={size} color={color}  /></View>
            }
            else if(route.name === "FriendsNavigator"){
              return <View style={screenOptions.tabView}><Users2 size={size} color={color} /></View>
            }

            // You can return any component that you like here!
            return <View><Home size={size} color={color} /></View>;
          },
          tabBarActiveTintColor: 'red',
          tabBarInactiveTintColor: 'black',
        })}
      > 
        <Tab.Screen name="Movie" component={MoviesScreen}
          options={{
            title:"",
            
          }}
        />
        <Tab.Screen name="Home" component={HomeScreen}
          options={{
            title:"",
            
          }}
        />
        <Tab.Screen name="FriendsNavigator" component={FriendsNavigator}
          options={{
            title:"",
            
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>  
    )
}




const screenOptions = {
    tabBarStyle:{
      backgroundColor:'#0000ff',
      height:100,
    },
    tabBarItemStyle:{
      backgroundColor:'#00ff00',
      margin:5,
      borderRadius:10,
    },
    tabView:{
      margin:20
    }
  };


export default Navigation