import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import { useDispatch, useSelector } from 'react-redux';
import { removeUserMovie } from '../redux/actions/userMoviesAction';
import { darkTheme, lightTheme } from "../theme/theme";

const RemoveMovies = ({ moviesToRemove, setMoviesToRemove, removeMovie }) => {
  // @ts-ignore
  const lightMode = useSelector(state => state.appReducer.lightMode);
  const theme = lightMode === true ? lightTheme : darkTheme;

  const dispatch = useDispatch();

  const removeMovies = () => {
    for (let i = 0; i < moviesToRemove.length; i++) {
      removeMovie(moviesToRemove[i]);
    }
    setMoviesToRemove([]);
  }

  const styles = StyleSheet.create({
    modal: {
      //Center modal
      position: 'absolute',
      bottom: 50,
      left: 0,
    
      width: "90%",
      right: 0,
      
    },
    deleteMovie: {
      backgroundColor: theme.background,
      borderColor: theme.border,
      borderWidth: 1,
      borderRadius: 10,
      padding: 15,
      margin: 10,
      justifyContent: "center",
      alignItems: "center",
    },
    deleteText: {
      color: theme.text,
      fontSize: 20,
      fontWeight: "bold",
    },
    deleteButton: {
      backgroundColor: theme.button,
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 20,

      margin: 10,

    },
    deleteButtonText: {
      color: theme.buttonTextColor,
      fontSize: 16,
      fontWeight: "bold",
      

    }
  });

  return (
    <Modal  isVisible={moviesToRemove.length > 0} 
            animationIn={"bounceInUp"} 
            animationOut={"fadeOutDown"} 
            coverScreen={false} 
            onBackdropPress={()=>{setMoviesToRemove([])}} 
            hasBackdrop={false} style={styles.modal} >
        <View style={styles.deleteMovie} pointerEvents="box-none">
          <Text style={styles.deleteText}>
            Delete {moviesToRemove.length} movie{moviesToRemove.length > 1 ? "s" : ""}
          </Text>

          <View style={{ flexDirection: "row", justifyContent: "center", width: "100%" }}>
            <TouchableOpacity onPress={() => removeMovies()} style={styles.deleteButton}>
              <Text style={styles.deleteButtonText}>
                Delete
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setMoviesToRemove([])} style={styles.deleteButton}>
              <Text style={styles.deleteButtonText}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
   
    </Modal>
  )
}

export default RemoveMovies;
