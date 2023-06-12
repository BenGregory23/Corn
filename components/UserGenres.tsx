import Loader from "./Loader"
import React, {useEffect, useState} from 'react'
import {View, Text, StyleSheet, ScrollView, TouchableHighlight} from "react-native"
import { FlatList } from 'react-native-gesture-handler'

const UserGenres = ({userId}) => {
    const genres = ["Action", "Adventure", "Animation", "Comedy", "Crime", "Documentary", "Drama", "Family", "Fantasy", "History", "Horror", "Music", "Mystery", "Romance", "Science Fiction", "TV Movie", "Thriller", "War", "Western"] 
    const [userGenres, setUserGenres] = useState([])
    const [genresFetched, setGenresFetched] = useState(false)


    useEffect(() => {
            if(!genresFetched){
                console.log("fetching")
            fetch(`https://evening-shore-83627.herokuapp.com/users/${userId}/genres`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((response) => response.json())
            .then((data) => {
                setUserGenres(data)
                setGenresFetched(true)
                
            })
            .catch((error) => {
                console.error(error)
            })
        }
        
    }, [userGenres, genresFetched])

  
    // Faire les modifications dans la base de données
    const toggleGenre = (genre: string) => {
        if(userGenres.includes(genre)){
            
            const modifiedGenres = userGenres.filter((userGenre) => userGenre !== genre)
            console.log(modifiedGenres)
            setUserGenres(modifiedGenres)
            fetch( `https://evening-shore-83627.herokuapp.com/users/${userId}/genres`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(modifiedGenres)
            })
            .then((response) => {
                setGenresFetched(false)
            })
           
        }else{
            
            const modifiedGenres = [...userGenres, genre]
            //make a json object with the modified genres
            
            console.log(modifiedGenres)
            setUserGenres([...userGenres, genre])
             fetch( `https://evening-shore-83627.herokuapp.com/users/${userId}/genres`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(modifiedGenres)
            })
            .then((response) => {
                
                
                setGenresFetched(false)
            })
        }
    }

   
    
    return(

        
        <ScrollView style={styles.container} directionalLockEnabled={true} horizontal={true}>
           
            {
               userGenres != undefined && userGenres.length >= 0 ? 
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
                : null
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
        
        width: "100%",
        height: 70,
        maxHeight: 70,
        overflow: "scroll",
        flexWrap: "wrap",
        flexDirection: "row",
    }
})

export default UserGenres