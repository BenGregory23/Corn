import { View,Text, TouchableOpacity, } from "react-native";
import React from "react";
import { StyleSheet } from "react-native";
import {
  Accelerometer,
  Barometer,
  DeviceMotion,
  Gyroscope,
  LightSensor,
  Magnetometer,
  MagnetometerUncalibrated,
  Pedometer,
} from 'expo-sensors';
import Movie from "../components/Movie";

export default function HomeScreen() {
  
    return (
      <View style={styles.container}>
          <Movie/>
      </View>
    )
};
  
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "black",
      display: "flex",
      justifyContent: "center",
      alignItems:"center"
    }
});