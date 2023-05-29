import React from 'react'
import {View, Text, StyleSheet} from "react-native"
import AnimatedLottieView from 'lottie-react-native'
import UserGenres from '../components/UserGenres'
import { ScrollView } from 'react-native-gesture-handler'
import UserMovies from '../components/UserMovies'

const MoviesScreen = () => {
    return(
        <View style={styles.container}>
        
            <View style={styles.header}>
                <AnimatedLottieView source={require("../assets/bucket.json")} autoPlay loop style={{width: 200, height: 200, marginLeft:7}}/>
                <Text style={styles.Title}>My Movies</Text>

                <UserGenres />
            </View>

            <UserMovies />

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
        fontWeight: "bold",
        marginVertical: 10,
    },header:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: "30%",
        width: "100%",
    }
})

export default MoviesScreen