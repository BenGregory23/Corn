import React from "react";
import { Modal, View, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { useSelector } from "react-redux";
import { darkTheme, lightTheme } from "../theme/theme";
import { X } from "lucide-react-native";

const CustomModal = ({ visible, onClose, children }) => {

  // @ts-ignore
  const lightMode = useSelector(state => state.appReducer.lightMode);
  const theme = (lightMode === true) ? lightTheme : darkTheme;

  const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      shadowColor: theme.shadow,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.09,
      shadowRadius:5,
     
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
      position: "absolute",
      top: 10,
      right: 10,
      backgroundColor: "#34D1BF",
      paddingVertical: 10,
      paddingHorizontal: 10,
      borderRadius: 100,
      shadowColor: theme.shadow,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.15,
      shadowRadius: 7,
    },
    closeButtonText: {
      color: theme.buttonTextColor,
      fontWeight: "bold",
      fontSize: 16,
    },
  });


  return (
    <Modal visible={visible} animationType="slide" transparent>
      <TouchableOpacity style={styles.modalContainer} onPress={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalBody}>{children}</View>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <X size={20} color={theme.buttonTextColor} />
          </TouchableOpacity>
        </View>
      </View>
      </TouchableOpacity>
    </Modal>
  );
};



export default CustomModal;
