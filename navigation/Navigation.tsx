
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';




const Navigation = () => {
    const BottomTabNavigator = createBottomTabNavigator();

    return (
        <NavigationContainer>
                    <BottomTabNavigator.Navigator initialRouteName="Home">
                        <BottomTabNavigator.Screen name="Home" component={HomeScreen}
                                                   options={{
                                                       title: 'Home',
                                                   }}/>
                        <BottomTabNavigator.Screen name="Settings" component={SettingsScreen}
                                                   options={{
                                                       title: 'Settings',
                                                   }}/>
                    </BottomTabNavigator.Navigator>
                </NavigationContainer>
    )


}

export default Navigation