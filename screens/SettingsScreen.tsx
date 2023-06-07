import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setUserConnected } from '../redux/actions/userActions';
import { deleteValueFor, getValueFor, save } from '../utils/secureStore';
import { Sun } from 'lucide-react-native';
import { setLightMode } from '../redux/actions/themeActions';



const SettingsScreen = ({navigation}) => {

   

    const dispatch = useDispatch();
    // @ts-ignore
    const lightMode = useSelector(state => state.appReducer.lightMode);
    console.log(lightMode);

    const  logOut = () =>{
       save("userConnected",false.toString()).then(() => {
            dispatch(setUserConnected(false));
        })
    }
    
    return(
        <View style={styles.container}>
            <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Movies')}>
                <ChevronLeft size={30} color="white" />
            </TouchableOpacity>
            <Text style={styles.title}>Settings</Text>
            </View>

            <TouchableOpacity style={styles.button} onPress={() => {
                dispatch(setLightMode(!lightMode));
            }}>
                <Sun size={30} color="white" />
            </TouchableOpacity>



            <TouchableOpacity style={styles.button} onPress={ () =>  logOut()}>
                <Text style={styles.buttonText}>Log out</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black"
    },
    header:{
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: "row",
        margin: 20,
    },
    title:{
        color:'white',
        fontSize: 29,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 0,
        
    }, 
    button:{
        backgroundColor: '#34D1BF',
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderRadius: 12,
        margin: 20,
        justifyContent: "center",
        alignItems: "center",  
    },
    buttonText:{
        fontWeight: "bold",
        fontSize: 17
    },
    backButton:{
       marginRight: 10,
        zIndex: 100,
    },
});

export default SettingsScreen;