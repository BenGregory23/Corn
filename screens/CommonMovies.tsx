import React, { useEffect, useState } from "react"
import {View, Text, StyleSheet, TouchableOpacity} from "react-native"
import CustomModal from "../components/CustomModal"
import URL_BACKEND from "../constants/constants";
import { ChevronLeft } from 'lucide-react-native';
import { useNavigation } from "@react-navigation/native";
import { darkTheme, lightTheme} from "../theme/theme";
import { useSelector } from "react-redux";


const CommonMovies = ({id}) =>{

    const navigation = useNavigation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    // @ts-ignore
    const lightMode = useSelector(state => state.appReducer.lightMode);
    const theme = (lightMode === true) ? lightTheme : darkTheme;


    const closeModal = () => {
        setIsModalOpen(false);
    }

    useEffect(()=>{
        console.log(id)
        fetch(URL_BACKEND + `/users/${4}`)

    },[])


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:theme.background,
        paddingTop: 40,
    },
    header:{
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: "row",
        margin: 20,
    },
    title:{
        color:theme.text,
        fontSize: 29,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 0,
        
    }, 
    backButton:{
     
        marginRight: 10,
         zIndex: 100,
     },
})

    return (
        <View style={styles.container}>
            <View style={styles.header}>
              
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate("Friends")}>
                <ChevronLeft size={30} color={theme.text} />
                
            </TouchableOpacity>
            <Text style={styles.title}>Shared Movies</Text>
            </View>
            

            <CustomModal visible={isModalOpen} onClose={closeModal} title={""}>

            </CustomModal>
        </View>
    )
}



export default CommonMovies;