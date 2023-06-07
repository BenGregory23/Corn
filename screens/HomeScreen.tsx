import { View, Dimensions, } from "react-native";
import React from "react";
import { StyleSheet } from "react-native";
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
      width: Dimensions.get("window").width,
      backgroundColor: "black",
      display: "flex",
      justifyContent: "center",
      alignItems:"center"
    }
});