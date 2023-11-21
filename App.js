import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Navigation from './navigation/Navigation';
import React, { useEffect, useState } from 'react';
import store from './redux/store';
import { Provider,useSelector } from 'react-redux';
import 'react-native-gesture-handler';

export default function App() {
 
  

  return (
    <>
      <Provider store={store}>
        <StatusBar style="light" /> 
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
