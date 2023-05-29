import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';

const FriendCard = ({navigation}) => {
    const friend = {
        name: 'John Doe',
    };

    return (
        <View style={styles.container}>
            <Text style={styles.Text}>{friend.name}</Text>
            <TouchableHighlight style={styles.button} onPress={() => navigation.navigate("Movies")}>
                   <Text>Films</Text>  
            </TouchableHighlight>
     
        </View>
    )

}

const styles = StyleSheet.create({
    container:{
        
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    
        backgroundColor:"black",
        flexDirection: "row",
        justifyContent: "space-between",    
    },
    Text:{
        fontSize: 20,
        fontWeight: "500",
        color: "#fff",
        
    }, 
    button:{
        backgroundColor: "white",
        borderRadius: 100,
        padding: 10,
        color: "black",
        width: 100,
        alignItems: "center",
        justifyContent: "center",
    }
})

export default FriendCard;
