import React from "react";
import { Modal, View, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { useSelector } from "react-redux";
import { darkTheme, lightTheme } from "../theme/theme";

const CustomModal = ({ visible, onClose, children }) => {

  // @ts-ignore
  const lightMode = useSelector(state => state.appReducer.lightMode);
  const theme = (lightMode === true) ? lightTheme : darkTheme;

  const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.1)",
     
    },
    modalContent: {
      backgroundColor: theme.background,
      borderColor: theme.menuBorder,
      borderWidth: 1,
      padding: 20,
      borderRadius: 10,
      alignItems: "center",
      width: Dimensions.get("window").width * 0.9,
      minHeight: Dimensions.get("window").height * 0.4,
    },
    modalBody: {
      marginBottom: 20,
    },
    closeButton: {
      backgroundColor: "#34D1BF",
      paddingVertical: 10,
      paddingHorizontal: 30,
      borderRadius: 10,
    },
    closeButtonText: {
      color: theme.buttonTextColor,
      fontWeight: "bold",
      fontSize: 16,
    },
  });


  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
        
          <View style={styles.modalBody}>{children}</View>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};



export default CustomModal;
