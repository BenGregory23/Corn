import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignUpScreen from '../screens/SignUpScreen';
import LoginScreen from '../screens/LoginScreen';
import Welcome from '../screens/Welcome';
import { NavigationContainer } from '@react-navigation/native';

const ConnectionNavigation = () => {
    const Stack = createStackNavigator();

    return(
        <NavigationContainer>
        <Stack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: 'black',
            },
            header: () => null,
            headerTintColor: '#fff',
        }} initialRouteName="Welcome">
            <Stack.Screen name="Welcome" component={Welcome} />
            <Stack.Screen name="SignUp" component={SignUpScreen}/>
            <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
        </NavigationContainer>

    )
}

export default ConnectionNavigation;
