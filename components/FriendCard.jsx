import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import { ChevronRight} from 'lucide-react-native';
import { darkTheme, lightTheme } from '../theme/theme';
import { useSelector } from 'react-redux';

const FriendCard = ({navigation, friend}) => {

   
   
    console.log(friend._id);
    

    return (
        <TouchableHighlight  onPress={() => navigation.navigate("Movies", {id:12})}>
            <View style={styles.container}>
            <View>
                <Text style={styles.Text}>{friend.name}</Text>
                <Text style={styles.email}>{friend.email}</Text>
            </View>
         
            
                <ChevronRight height={30} width={30} color='white' />
            </View>
        </TouchableHighlight>
    )

}

const styles = StyleSheet.create({
    container:{
        backgroundColor: 'rgba(74, 78, 105, 0.35)',
        borderWidth: 2,
        borderColor: "#4a4e69",
        borderRadius: 7,
        justifyContent: "center",
        alignItems: "center",
        padding: 25,
        margin:5,
        flexDirection: "row",
        justifyContent: "space-between",    
    },
    Text:{
        fontSize: 20,
        fontWeight: "500",
        color: "#fff",
        
    }, 
    email:{
        fontSize: 12,
        color: "#fff",
    },
    button:{
        backgroundColor: "transparent",
        borderRadius: 100,
        
        color: "black",
        alignItems: "center",
        justifyContent: "center",
    }
})

export default FriendCard;
