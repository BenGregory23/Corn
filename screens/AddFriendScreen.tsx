import {View, StyleSheet, Platform, TouchableHighlight, Text, TextInput, Dimensions, KeyboardAvoidingView} from "react-native"
import { useSelector } from "react-redux"
import { darkTheme, lightTheme } from "../theme/theme"
import { TouchableOpacity } from "react-native-gesture-handler"
import AnimatedLottieView from "lottie-react-native"
import { useState } from "react"
import URL_BACKEND from "../constants/constants"
import store from "../redux/store"
import { CornerDownLeft } from "lucide-react-native"

const AddFriendScreen = () =>{
  // @ts-ignore
  const lightMode = useSelector(state => state.appReducer.lightMode);
  const theme = (lightMode === true) ? lightTheme : darkTheme;
  const [friendMail, setFriendMail] = useState("")
  const user = store.getState().appReducer.user;

  

  const addFriend = () => {
    if(friendMail === ""){
        console.log("Please select a friend")
    }

    fetch(URL_BACKEND + `/users/${user._id}/friends`,{
        method: 'POST',
        body: friendMail
    }).then(response => {
        console.log(response)
    })
    .catch(err => console.error(err))

    }

    const styles = StyleSheet.create({
        container:{
            flex: 1,
            paddingTop: 40,
            backgroundColor: theme.background,
            alignItems: "center",
            justifyContent:"space-around",
        },
        button:{
            backgroundColor: theme.button,
            justifyContent:"center",
            alignItems: "center",
            paddingVertical: 12,
            paddingHorizontal: 80,
            borderRadius: 10,
            width: 250,
            marginVertical: 5,
        },
        text:{
            color: theme.buttonTextColor,
            fontWeight: "700",
            fontSize: 20
        },
        textInput:{
            borderBottomColor: theme.button,
            borderBottomWidth: 2,
            width: 250,
            paddingVertical: 10,
            margin: 20,
            color: theme.text,
            fontSize: 17,
            
        },
        info:{
            flexDirection: "row",
            justifyContent:"center",
            alignContent: "center",
            
        },
        title:{
            color: theme.text,
            fontWeight: "700",
            fontSize: 50,
            textAlign: "center",
            width: 320, 
            marginTop: 20
        },
        infoText:{
            color: theme.text,
            fontWeight: "500",
            fontSize: 20,
            width:320,
            textAlign: "justify"
        },
        backButton:{
           marginTop: 50,
        }
    })

    return (
        <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
         style={styles.container}>

            <View style={{alignItems:"center", height:"60%", minHeight: 200, justifyContent:"center", marginBottom: 30}}>
                <AnimatedLottieView source={require("../assets/speaker.json")} autoPlay loop style={{width: 180, height: 180}}/>
                <Text style={styles.title}>
                    Add friends!
                </Text>

                <View style={styles.info}>
                    <Text style={styles.infoText}>
                        Add friends by entering their email address. You can then see what movies you both want to watch.
                    </Text>
                </View>
            </View>
            
            <View style={{alignItems:"center", height:"40%"}}>
                    <TextInput style={styles.textInput} keyboardType="email-address" placeholderTextColor={theme.text} placeholder="example@service.com" onChangeText={setFriendMail}/>

                    <TouchableOpacity style={styles.button} onPress={addFriend}>
                        <Text style={styles.text}>Add</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.backButton}>
                        <CornerDownLeft color={theme.text} />
                    </TouchableOpacity>
            </View>


            

        

        </KeyboardAvoidingView>
    )
}

export default AddFriendScreen;