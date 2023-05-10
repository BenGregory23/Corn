import { View,Text } from "react-native";
import React from "react";
import { StyleSheet } from "react-native";


export default function HomeScreen() {
    return (
      <View style={styles.container}>
        <View style={styles.centered}>
          <Text style={styles.title}>Page d'accueil avec les imports PAS automatique (merci VSCODE)</Text>
        </View>
      </View>
    )
};
  
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "darksalmon",
      display: "flex",
      justifyContent: "center",
      alignItems:"center"
    },
    centered: {
      alignItems: "center"
    },
    title: {
      fontSize: 20
    }
});