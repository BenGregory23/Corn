import React from "react"
import {View, Text, StyleSheet} from "react-native"


const CommonMovies = ({name}) =>{

    return (
        <View style={styles.container}>
            <Text>Common Movies</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black",
        display: "flex",
        justifyContent: "center",   
        alignItems:"center"
    }
})

export default CommonMovies;