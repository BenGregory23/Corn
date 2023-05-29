import React, {useState} from 'react'
import {View, Text, StyleSheet, ScrollView, TouchableHighlight} from "react-native"
import { FlatList } from 'react-native-gesture-handler'

const UserGenres = () => {
    const genres = ["Action", "Adventure", "Animation", "Comedy", "Crime", "Documentary", "Drama", "Family", "Fantasy", "History", "Horror", "Music", "Mystery", "Romance", "Science Fiction", "TV Movie", "Thriller", "War", "Western"] 
    const [userGenres, setUserGenres] = useState(["Action"])


    // Faire les modifications dans la base de données
    const toggleGenre = (genre: string) => {
        if(userGenres.includes(genre)){
            setUserGenres(userGenres.filter((userGenre) => userGenre !== genre))
        }else{
            setUserGenres([...userGenres, genre])
        }
    }

    return(
        <ScrollView style={styles.container} directionalLockEnabled={true} horizontal={true}>
            {
                genres.map((genre, index) => {
                    return(
                        <TouchableHighlight style={
                            userGenres.includes(genre) ? styles.userGenre : styles.genre
                        } key={index}
                        onPress={() => toggleGenre(genre)}
                        >
                            <Text style={
                                userGenres.includes(genre) ? {color: "black"} : {color: "white"}
                            } >{genre}</Text>
                        </TouchableHighlight>
                    )
                })
            }
        </ScrollView>
    )

}

const styles = StyleSheet.create({
    genre: {
        margin: 10,
        fontWeight: "bold",
        backgroundColor: "black",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 50,
        width: 120,
        height: 45,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "white",
    },
    userGenre:{
        margin: 10,
        backgroundColor: "white",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 50,
        width: 120,
        height: 45,
        justifyContent: "center",
        alignItems: "center",
    },
    container:{
        backgroundColor: "black",
        width: "100%",
        maxHeight: 100,
        overflow: "scroll",
        flexWrap: "wrap",
        flexDirection: "row",
    }
})

export default UserGenres