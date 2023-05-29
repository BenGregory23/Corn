
import React from 'react'
import {View, Text, SafeAreaView} from "react-native"
import { FlatList } from 'react-native-gesture-handler'
import { StyleSheet, TouchableHighlight, ScrollView } from 'react-native'
import FriendCard from '../components/FriendCard'
import AnimatedLottieView from 'lottie-react-native'
import "../assets/speaker.json"





const FriendsScreen = ({navigation}) => {
    

    return(
        <View style={styles.container}>
          
         


            <ScrollView>
                <FriendCard navigation={navigation}/>   
                <FriendCard navigation={navigation}/>      
                <FriendCard navigation={navigation}/>   
                <FriendCard navigation={navigation}/>
                <FriendCard navigation={navigation}/>   
                <FriendCard navigation={navigation}/>      
                <FriendCard navigation={navigation}/>   
                <FriendCard navigation={navigation}/>    
            </ScrollView>
                 
        </View>
    )

}

const styles = StyleSheet.create({
    container:{
        backgroundColor: "black",
        height: "100%",
    },
    
});

export default FriendsScreen;