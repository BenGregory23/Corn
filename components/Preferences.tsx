import { Settings2 } from 'lucide-react-native';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


const Preferences = ({theme}) => {
   


    const styles = StyleSheet.create({
        container: {
            justifyContent: "center",
            alignItems: "flex-start",
            margin: 10,
        },
    });


    return(
        <View style={styles.container}>
            
            <Settings2 size={30} color={theme.text} />
        </View>
    )
}

export default Preferences;