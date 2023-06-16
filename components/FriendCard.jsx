import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import { ChevronRight} from 'lucide-react-native';
import { darkTheme, lightTheme } from '../theme/theme';
import { useSelector } from 'react-redux';

const FriendCard = ({navigation, friend}) => {


    
    const lightMode = useSelector(state => state.appReducer.lightMode);
    const theme = (lightMode === true) ? lightTheme : darkTheme;

    
    const styles = StyleSheet.create({
        container:{
            backgroundColor: theme.button,
            borderWidth: 2,
            borderColor: theme.button,
            borderRadius: 7,
            alignItems: "center",
            padding: 20,
            margin:5,
            marginLeft: 15,
            marginRight: 15,
            flexDirection: "row",
            justifyContent: "space-between",
        },
        Text:{
            fontSize: 20,
            fontWeight: "500",
            color: theme.buttonTextColor,
            
        }, 
        email:{
            fontSize: 12,
            color: theme.buttonTextColor,
        },
        button:{
            backgroundColor: "transparent",
            borderRadius: 100,
            color: "black",
            alignItems: "center",
            justifyContent: "center",
        }
    })

    return (
        <TouchableHighlight  onPress={() => navigation.navigate("Movies", {id:friend._id})}>
            <View style={styles.container}>
                <View>
                    <Text style={styles.Text}>{friend.name}</Text>
                    <Text style={styles.email}>{friend.email}</Text>
                </View>
                <ChevronRight height={30} width={30} color={theme.buttonTextColor} />
            </View>
        </TouchableHighlight>
    )

}



export default FriendCard;
