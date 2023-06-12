import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import { Film } from 'lucide-react-native';

const FriendCard = ({navigation}) => {
    const friend = {
        name: 'John Doe',
    };

    return (
        <View style={styles.container} >
            <Text style={styles.Text}>{friend.name}</Text>
            <TouchableHighlight style={styles.button} onPress={() => navigation.navigate("Movies")}>
                   <Text style={{color: "white"}}> Movies</Text>
            </TouchableHighlight>
     
        </View>
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
    button:{
        backgroundColor: "transparent",
        borderRadius: 100,
        
        color: "black",
        alignItems: "center",
        justifyContent: "center",
    }
})

export default FriendCard;
