
import React, { useEffect, useState } from 'react'
import {View, Text, SafeAreaView, TextInput, TouchableOpacity, VirtualizedList} from "react-native"

import { StyleSheet, TouchableHighlight, ScrollView } from 'react-native'
import FriendCard from '../components/FriendCard'
import "../assets/speaker.json"
import { Plus } from 'lucide-react-native'
import URL_BACKEND from '../constants/constants'
import { useSelector } from 'react-redux'
import { FlatList } from 'react-native-gesture-handler'






const FriendsScreen = ({navigation}) => {
    const [friendMail, setFriendMail] = useState("")

    const [friends, setFriends] = useState([]);

    // @ts-ignore
    const user = useSelector(state => state.appReducer.user)


    useEffect(() => {
        fetch(URL_BACKEND + `/users/${user._id}/friends`,{
            method: 'GET'
        })
        .then((response) => response.json()).then(response => {
            // @ts-ignore
            setFriends(response)
        
        })
        
    },[])

    const addFriend = () => {
        if(friendMail === ""){
            console.log("Please select a friend")
        }
        
        fetch(URL_BACKEND + `/users/${user._id}/friends`,{
            method: 'POST',
            body: friendMail    
        }).then(response => {
            console.log(response)
        })
        .catch(err => console.error(err))

    }

    

    const renderItem = ({ item }) => (
        <FriendCard friend={ item} navigation={navigation}/>
      );

    return(
        <View style={styles.container}>
          
          <View style={styles.search}>
                <TextInput style={styles.searchInput} placeholder='Enter the mail of a friend' placeholderTextColor={"white"} onChangeText={setFriendMail} />
                <TouchableOpacity style={styles.searchButton} onPress={()=>addFriend()}>
                    <Plus width={30} fill='transparent' color='white'/> 
                </TouchableOpacity>
            </View>


            <FlatList 
            style={styles.scrollView}
            data={friends}
            renderItem={renderItem}
            />
        
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
        borderRadius: 12,
        paddingLeft: 20,
        paddingRight: 5,
        paddingVertical: 5,
        margin: 25,
        height: 55,
        zIndex:100,
    },
    searchInput:{
        flex: 1,
        color: "white",
     height: "100%",
    },
    searchButton:{
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 30,
        backgroundColor: "#34D1BF"
    },
});

export default FriendsScreen;