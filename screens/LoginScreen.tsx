import AnimatedLottieView from 'lottie-react-native';
import React, {useEffect, useRef}from 'react';
import { Animated,View, Text, StyleSheet, TouchableHighlight, TextInput, Platform, Image, KeyboardAvoidingView } from 'react-native';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { setUserConnected, setUser } from '../redux/actions/userActions';
import URL_BACKEND  from '../constants/constants';
import sha256 from 'crypto-js/sha256';
import {getValueFor, save } from '../utils/secureStore'


const LoginScreen = ({navigation}) => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    const dispatch = useDispatch();

    //get userCOnnected from redux
    // @ts-ignore
    const userConnected = useSelector(state => state.appReducer.userConnected);

    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
       
        Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000, // Adjust the duration as needed
        useNativeDriver: true,
        }).start();
    }, );

    const login = () => {
        const url = URL_BACKEND + "/login";
        const hashedPassword = sha256(password).toString();
  
        fetch(url + '?email=' + email + '&password=' + hashedPassword, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((response) => { 
            setLoading(true);
            
            if(response.status === 200){
                response.json().then((data) => {
                    save("userConnected", "true");
                    save("user", JSON.stringify(data));
                    dispatch(setUser({email: email, _id: data._id}));
                    dispatch(setUserConnected(true));
                    
                })  
            }
        })

        
        
    }

    return (
        <KeyboardAvoidingView style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <View style={styles.box}>
                <AnimatedLottieView source={require("../assets/bucket.json")} autoPlay loop style={{width: 200, height: 200, marginLeft:5}}/>
                <Animated.View style={{opacity: fadeAnim}}>
                <Text style={styles.title}>
                Time to log in!
                </Text>
                </Animated.View>
            </View>
           
            <View style={styles.box}>
            <View style={styles.inputView}>
                <TextInput style={styles.input} placeholder="Email" placeholderTextColor="white" onChangeText={setEmail} />
            </View>
            <View>
             
                <TextInput style={styles.input} placeholder="Password" placeholderTextColor="white" onChangeText={setPassword}  />
            </View>
            <TouchableHighlight  onPress={() => navigation.replace('SignUp')}>
                <Text style={styles.signUpButton} >Don't have an account? Sign up</Text>
            </TouchableHighlight>

            <TouchableHighlight style={styles.logInButton} disabled={loading} onPress={()=>{
                login();
                   
                }}>
                <Text style={styles.logInText}>Log in</Text>
            </TouchableHighlight>
            </View>

        </KeyboardAvoidingView>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "black",
    },
    box:{   
        
        alignItems: 'center',
        justifyContent: 'center',
        height: "100%",
        width: "100%",
        maxHeight: 400,

    },
    title:{
        fontSize: 40,
        fontWeight: 'bold',
        marginTop: 20,
        color: 'white',
    },
    input:{
        fontSize: 17,
        borderWidth: 2,
        width: 270,
        padding: 10,
        margin: 5,
        borderRadius: 12,   
        color: 'white',
        backgroundColor: 'black',
        borderColor: 'white',
        
    },
    inputView:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logInButton:{
        backgroundColor: "#34D1BF",
        padding: 10,
        borderRadius: 12,
        width: 270,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 50,
    },
    logInText:{
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
    },
    signUpButton:{
        color: 'white',
        fontSize: 14,
        textDecorationLine: 'underline',
    },
    
});


export default LoginScreen;