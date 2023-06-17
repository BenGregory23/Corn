
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { removeUserMovie } from '../redux/actions/userMoviesAction';
import {darkTheme, lightTheme} from "../theme/theme";

const RemoveMovies = ({moviesToRemove, setMoviesToRemove, removeMovie}) => {
    // @ts-ignore
    const lightMode= useSelector(state => state.appReducer.lightMode);
    const theme = lightMode === true ? lightTheme : darkTheme;

    const dispatch = useDispatch();


    const removeMovies = () => {
        for(let i = 0; i < moviesToRemove.length; i++){
          removeMovie(moviesToRemove[i]);
        }
        setMoviesToRemove([]);
    }


    const styles = StyleSheet.create({
        deleteMovie:{
            display: moviesToRemove.length > 0 ? "flex" : "none",
            position: "absolute",
            top: 30,
            
            left: (Dimensions.get("window").width / 2) - ((Dimensions.get("window").width - 40) / 2),
            padding: 15,
            width: Dimensions.get("window").width - 40,
            backgroundColor: theme.background,
            borderRadius: 10,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
            justifyContent: "center",
            alignItems: "center",
        },
        deleteText:{
          color: theme.text,
          fontSize: 19,
          fontWeight: "bold",
        },
        deleteButton:{
            backgroundColor: theme.button,
            borderRadius: 10,
            padding: 10,
            margin: 10,
        },
        deleteButtonText:{
            color: theme.buttonTextColor,
            fontSize: 17,
            fontWeight: "bold",
        }

    });

    return (
        <View style={styles.deleteMovie}>
            <Text style={styles.deleteText}>
              Delete {moviesToRemove.length} movies
            </Text>

            <View style={{flexDirection: "row", justifyContent: "center", width: "100%"}}>
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
    )
}

export default RemoveMovies;