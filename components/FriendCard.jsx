import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FriendCard = () => {
    const friend = {
        name: 'John Doe',
    };

    return (
        <View style={styles.container}>
            <Text style={styles.Text}>{friend.name}</Text>

     
        </View>
    )

}

const styles = StyleSheet.create({
    container:{
        padding: 20,
        marginBottom:1,
        backgroundColor:"#232323",
    },
    Text:{
        fontSize: 20,
        fontWeight: "500",
        color: "#fff",
    }
})

export default FriendCard;
