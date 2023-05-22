
import React from 'react'
import {View, Text} from "react-native"
import { FlatList } from 'react-native-gesture-handler'
import { StyleSheet, TouchableHighlight } from 'react-native'
import FriendCard from '../components/FriendCard'




const FriendsScreen = ({navigation}) => {
    

    return(
        <View style={styles.container}>
            
            
                <FriendCard navigation={navigation}/>   
        
            
                <FriendCard navigation={navigation}/>   
            
                   
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