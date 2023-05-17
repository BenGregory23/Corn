
import React from 'react'
import {View, Text} from "react-native"
import { FlatList } from 'react-native-gesture-handler'
import { StyleSheet } from 'react-native'
import FriendCard from '../components/FriendCard'


const listOfSettings = [
    {
        name: "Notifications",
        icon: "notifications"
    },
    {
        name: "Account",
        icon: "account"
    },
    {
        name: "Language",
        icon: "language"
    },
    {
        name: "About",
        icon: "about"
    }
]

const FriendsScreen = () => {

    return(
        <View style={styles.container}>
            
            <FriendCard />
            <FriendCard/>           
        </View>
    )

}

const styles = StyleSheet.create({
    container:{
        backgroundColor: "black",
        height: "100%",
    }
});

export default FriendsScreen;