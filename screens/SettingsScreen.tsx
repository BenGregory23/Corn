
import React from 'react'
import {View, Text} from "react-native"
import { FlatList } from 'react-native-gesture-handler'
import { StyleSheet } from 'react-native'


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

const SettingsScreen = () => {

    return(
        <View>
            <FlatList style={styles.list} data={listOfSettings} renderItem={({item}) => <Text style={styles.item}>{item.name}</Text>} keyExtractor={(item) => item.name} />
        </View>
    )

}

const styles = StyleSheet.create({
    list: {
        height: "100%",
        width: "100%",
    },
    item: {
        backgroundColor: "#f7f7f7",
        padding: 20,       
    },
});

export default SettingsScreen