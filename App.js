import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Navigation from './navigation/Navigation';
import React, { useState } from 'react';
import ConnectionNavigation from './navigation/ConnectionNavigation';



export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true)

  if(!isLoggedIn) {
    return (
      <ConnectionNavigation setIsLoggedIn={setIsLoggedIn}/>
    )
  }


  return (
    <>
        <StatusBar style="light" />
        <SafeAreaView style={styles.topSafeArea} />
        <Navigation/>
    </>
  
  );
}

const styles = StyleSheet.create({
  topSafeArea: {
    flex: 0,
    backgroundColor: 'black'
  },
  
});
