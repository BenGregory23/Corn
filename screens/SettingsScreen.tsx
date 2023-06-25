import React from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setUserConnected } from '../redux/actions/userActions';
import { deleteValueFor, getValueFor, save } from '../utils/secureStore';
import { Sun, Moon } from 'lucide-react-native';
import { setLightMode } from '../redux/actions/themeActions';
import {lightTheme, darkTheme} from "../theme/theme";
import Preferences from '../components/Preferences';
import {FR, EN} from "../lang/lang";
import {setLanguage} from "../redux/actions/langActions";
import { storeData, getData } from '../utils/asyncStore';

const SettingsScreen = ({navigation}) => {
    const dispatch = useDispatch();
    // @ts-ignore
    const lightMode = useSelector(state => state.appReducer.lightMode);
    const theme = (lightMode === true) ? lightTheme : darkTheme;

    // @ts-ignore
    const language = useSelector( state => state.appReducer.language);
    const lang = (language == "EN") ? EN : FR;

    const  logOut = () => {
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
        bigButtonContainer:{
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            margin: 10,
        },
        bigButton:{
            backgroundColor: theme.button,
            paddingVertical: 30,
            paddingHorizontal: 30,
            borderRadius: 12,
            margin: 10,
            height: Dimensions.get('window').width / 2 - 50,
            width: Dimensions.get('window').width / 2 - 50,
            justifyContent: "center",
            alignItems: "center",
        },
        button:{
            backgroundColor: theme.button,
            paddingVertical: 20,
            paddingHorizontal: 30,
            borderRadius: 12,
            margin: 10,
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
        <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: 120}}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Movies')}>
                    <ChevronLeft size={30} color={theme.text} />
                </TouchableOpacity>
                <Text style={styles.title}>{lang.settings}</Text>
            </View>

       
            <View style={styles.bigButtonContainer}>
                <TouchableOpacity style={styles.bigButton} onPress={() => {
                    
                    storeData("lightMode", String(!lightMode));

                    dispatch(setLightMode(!lightMode));
                }}>
                    {
                        lightMode === true ? <Moon size={40} color={theme.buttonTextColor} /> : <Sun size={40} color={theme.buttonTextColor} />
                    }
                </TouchableOpacity>

                <TouchableOpacity style={styles.bigButton} onPress={ () =>  {
                    dispatch(setLanguage((language == "EN") ? "FR" : "EN"));
                }}>
                    <Text style={[styles.buttonText, {fontSize: 22}]}>{(language == "EN") ? "English" : "Français"}</Text>
                </TouchableOpacity>
            </View>
        

            


            <Preferences theme={theme}/>

            <TouchableOpacity style={styles.button} onPress={ () =>  logOut()}>
                <Text style={styles.buttonText}>{lang.logout}</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}

export default SettingsScreen;