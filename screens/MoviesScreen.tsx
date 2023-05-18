import React from 'react'
import {View, Text, StyleSheet} from "react-native"

const MoviesScreen = () => {
    return(
        <View style={styles.container}>
            <Text style={styles.Title}>Your Movies</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black"
    } ,
    Title: {
        color: "white",
        fontSize: 30,
    }
})

export default MoviesScreen