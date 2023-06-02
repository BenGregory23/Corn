import React from 'react';
import { View, Dimensions, Animated } from 'react-native';
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
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: screenOptions.tabBarStyle,
          tabBarIcon: ({ focused, color, size }) => {
           
            size = 30;

            if (route.name === 'Home') {
              return <View style={screenOptions.tabView}>
                  <Clapperboard size={size} color={color} fill={focused ? "black" : "white"}  />
                </View>
            }
            else if (route.name === "Movie"){
              return <View style={screenOptions.tabView}><LayoutList size={size} color={color} fill={focused ? "black" : "white"}  /></View>
            }
            else if(route.name === "FriendsNavigator"){
              return <View style={screenOptions.tabView}>
                      <Users2 size={size} color={color} fill={focused ? "black" : "white"} />
                    </View>
            }

            // You can return any component that you like here!
            return <View><Home size={size} color={color} /></View>;
          },
          tabBarActiveTintColor: 'black',
          tabBarItemStyle: screenOptions.tabBarItemStyle,
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
      padding:14,
      flex:1,
      alignItems:'center',
      justifyContent:'center',
      position:'absolute',
      borderRadius:50,
      margin:50,
      backgroundColor:'white',
      height:60,
      borderTopWidth:0,
    },
    tabBarItemStyle:{
      margin:5,
      borderRadius:10,
      height:40,
      width:30,
  
    },
    tabView:{
      
    },
  };


export default Navigation