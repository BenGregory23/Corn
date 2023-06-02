import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Navigation from './navigation/Navigation';
import React, { useEffect, useState } from 'react';
import ConnectionNavigation from './navigation/ConnectionNavigation';
import store from './redux/store';
import { Provider,userSelector } from 'react-redux';





export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true)



  

  if(!isLoggedIn) {
    return (
      <Provider store={store}>
        <ConnectionNavigation setIsLoggedIn={setIsLoggedIn}/>
      </Provider>
    )
  }


  return (
    <>
      <Provider store={store}>
        <StatusBar style="light" />
        <SafeAreaView style={styles.topSafeArea} />
        <Navigation/>
      </Provider>
    </>
  
  );
}

const styles = StyleSheet.create({
  topSafeArea: {
    flex: 0,
    backgroundColor: 'black'
  },
  
});
