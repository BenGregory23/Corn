import React, { useEffect, useState, useRef } from 'react'
import {View, Text, StyleSheet, RefreshControl, TouchableOpacity} from "react-native"
import AnimatedLottieView from 'lottie-react-native'
import UserGenres from '../components/UserGenres'
import { ScrollView } from 'react-native-gesture-handler'
import UserMovies from '../components/UserMovies'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserMovies } from '../redux/actions/userMoviesAction'
import { Settings } from 'lucide-react-native'
import Loader from '../components/Loader'
import {darkTheme, lightTheme} from "../theme/theme";
import {FR, EN} from "../lang/lang";
import { removeUserMovie } from '../redux/actions/userMoviesAction'

const MoviesScreen = ({navigation}) => {
    // @ts-ignore
    const user = useSelector(state => state.appReducer.user);

    // @ts-ignore
    const lightMode = useSelector( state => state.appReducer.lightMode);
    const theme = (lightMode === true) ? lightTheme : darkTheme;

    // @ts-ignore
    const userM = useSelector((state) => state.appReducer.userMovies);

    const dispatch = useDispatch();

    const [loaded, setLoaded] = useState(false);
    //const lottieRef = useRef<AnimatedLottieView|null>(null);

    // @ts-ignore
    const language = useSelector( state => state.appReducer.language);
    const lang = (language == "EN") ? EN : FR;

    useEffect(() => {
      const loadMovies = async () =>{
        await dispatch(fetchUserMovies(user._id));
        setLoaded(true)
      }
      loadMovies();
    },[dispatch]);

    

   

    const goToSettings = () => {
        navigation.navigate("Settings");
    }

    if(!loaded){
        return ( <Loader/>)
    }

    const styles = StyleSheet.create({
        container: {
            paddingTop: 0,
            flex: 1,
            backgroundColor: theme.background,
        } ,
        Title: {
            color: theme.text,
            fontSize: 30,
            fontWeight: "bold",
            marginVertical: 10,
        },header:{
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 100,
            paddingTop: 50,
            width: "100%",
            
        },
        settingsButton:{
            position: "absolute",
            top:45,
            left:10,
            margin: 20,
            zIndex: 100,
        },
        
    })

    return(
        <View style={{flex:1, backgroundColor: theme.background}}>
               <TouchableOpacity onPress={goToSettings} style={styles.settingsButton}>
                    <Settings size={30} color={theme.text} />
                </TouchableOpacity>

            <View style={styles.header}>
                <Text style={styles.Title}>Watchlist</Text>
            </View>
            <View style={styles.container}>       
        
             

               
                

                <UserMovies movies={userM} />

            </View>

        </View>
        
        
    )
}

export default MoviesScreen