
import React from 'react'
import {View, Text} from "react-native"
import { FlatList } from 'react-native-gesture-handler'
import { StyleSheet, TouchableHighlight } from 'react-native'
import FriendCard from '../components/FriendCard'




const FriendsScreen = ({navigation}) => {
    

    return(
        <View style={styles.container}>
            
            <TouchableHighlight onPress={() => navigation.navigate("Movies")}>
                <FriendCard/>   
            </TouchableHighlight>
            <TouchableHighlight onPress={() => navigation.navigate("Movies")}>
                <FriendCard/>   
            </TouchableHighlight>
                   
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