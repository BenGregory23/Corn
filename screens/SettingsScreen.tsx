import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setUserConnected } from '../redux/actions/userActions';
import { deleteValueFor, getValueFor, save } from '../utils/secureStore';
import { Sun, Moon } from 'lucide-react-native';
import { setLightMode } from '../redux/actions/themeActions';
import {lightTheme, darkTheme} from "../theme/theme";

const SettingsScreen = ({navigation}) => {
    const dispatch = useDispatch();
    // @ts-ignore
    const lightMode = useSelector(state => state.appReducer.lightMode);
    const theme = (lightMode === true) ? lightTheme : darkTheme;
    console.log(lightMode);

    const  logOut = () =>{
       save("userConnected",false.toString()).then(() => {
            dispatch(setUserConnected(false));
        })
    }

    const styles = StyleSheet.create({
        container: {
            paddingTop: 40,
            flex: 1,
            backgroundColor: theme.background,
        },
        header:{
            justifyContent: 'flex-start',
            alignItems: 'center',
            flexDirection: "row",
            margin: 20,
        },
        title:{
            color: theme.text,
            fontSize: 29,
            fontWeight: 'bold',
            textAlign: 'center',
            margin: 0,

        },
        button:{
            backgroundColor: theme.button,
            paddingVertical: 15,
            paddingHorizontal: 10,
            borderRadius: 12,
            margin: 20,
            justifyContent: "center",
            alignItems: "center",
        },
        buttonText:{
            fontWeight: "bold",
            fontSize: 17,
            color: theme.buttonTextColor
        },
        backButton:{
            marginRight: 10,
            zIndex: 100,
        },
    });


    return(
        <View style={styles.container}>
            <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Movies')}>
                <ChevronLeft size={30} color={theme.text} />
            </TouchableOpacity>
            <Text style={styles.title}>Settings</Text>
            </View>

            <TouchableOpacity style={styles.button} onPress={() => {
                dispatch(setLightMode(!lightMode));
            }}>
                {
                    lightMode === true ? <Moon size={30} color={theme.buttonTextColor} /> : <Sun size={30} color={theme.buttonTextColor} />
                }
               
            </TouchableOpacity>



            <TouchableOpacity style={styles.button} onPress={ () =>  logOut()}>
                <Text style={styles.buttonText}>Log out</Text>
            </TouchableOpacity>
        </View>
    )
}

export default SettingsScreen;