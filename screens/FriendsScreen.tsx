
import React, { useState } from 'react'
import {View, Text, SafeAreaView, TextInput, TouchableOpacity, Dimensions} from "react-native"
import { FlatList } from 'react-native-gesture-handler'
import { StyleSheet, TouchableHighlight, ScrollView } from 'react-native'
import FriendCard from '../components/FriendCard'
import "../assets/speaker.json"
import { Plus } from 'lucide-react-native'
import URL_BACKEND from '../constants/constants'





const FriendsScreen = ({navigation}) => {
    const [friendMail, setFriendMail] = useState("")


    const addFriend = () => {
        fetch(URL_BACKEND + "/")

    }

    return(
        <View style={styles.container}>
          
          <View style={styles.search}>
                <TextInput style={styles.searchInput} placeholder='Enter the mail of a friend' placeholderTextColor={"white"} />
                <TouchableOpacity style={styles.searchButton}>
                    <Plus width={30} fill='transparent' color='white'/> 
                </TouchableOpacity>
            </View>
    
            <ScrollView style={styles.scrollView}>
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
    scrollView:{
     
       
    },
    search:{
        backgroundColor:"transparent",
        flexDirection: "row",
        borderColor: "#34D1BF",
        borderWidth: 2,
        borderRadius: 100,
        paddingLeft: 20,
        paddingRight: 5,
        paddingVertical: 5,
        margin: 25,
        height: 55,
        zIndex:100,
    },
    searchInput:{
        flex: 1,
     
     height: "100%",
    },
    searchButton:{
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 30,
        backgroundColor: "#34D1BF"
    },
});

export default FriendsScreen;