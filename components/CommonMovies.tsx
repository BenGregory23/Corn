import React, { useEffect, useState } from "react"
import {View, Text, StyleSheet, TouchableOpacity} from "react-native"
import CustomModal from "./CustomModal"
import URL_BACKEND from "../constants/constants";
import { ChevronLeft } from 'lucide-react-native';
import { useNavigation } from "@react-navigation/native";



const CommonMovies = ({id}) =>{

    const navigation = useNavigation();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const closeModal = () => {
        setIsModalOpen(false);
    }

    useEffect(()=>{
        console.log(id)
        fetch(URL_BACKEND + `/users/${4}`)

    },[])

    return (
        <View style={styles.container}>
            <View style={styles.header}>
              
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate("Friends")}>
                <ChevronLeft size={30} color="white" />
                
            </TouchableOpacity>
            <Text style={styles.title}>Shared Movies</Text>
            </View>
            

            <CustomModal visible={isModalOpen} onClose={closeModal} title={""}>

            </CustomModal>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black",
       
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
    backButton:{
     
        marginRight: 10,
         zIndex: 100,
     },
})

export default CommonMovies;