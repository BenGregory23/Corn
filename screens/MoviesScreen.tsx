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
    const lottieRef = useRef<AnimatedLottieView|null>(null);
   

    useEffect(() => {
      const loadMovies = async () =>{
        await dispatch(fetchUserMovies(user._id));
        setLoaded(true)
      }
      loadMovies();
    },[dispatch]);


    useEffect(() => {
        if (lottieRef.current) {
        setTimeout(() => {
            lottieRef.current?.reset();
            lottieRef.current?.play();
        }, 100);
        }
    }, [lottieRef.current]);

    const handleRefresh = () => {
        const loadMovies = async () =>{
            await dispatch(fetchUserMovies(user._id));
            setLoaded(true)
        }
        loadMovies();
    }

    const goToSettings = () => {
        navigation.navigate("Settings");
    }

    if(!loaded){
        return ( <Loader/>)
    }

    const styles = StyleSheet.create({
        container: {
            paddingTop: 40,
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
            minHeight: 350,
            width: "100%",
        },
        settingsButton:{
            top:0,
            right:0,
            margin: 20,
            zIndex: 100,
        }
    })

    return(
        <ScrollView style={styles.container}
                    contentContainerStyle={{paddingBottom: 110}}
            onScrollEndDrag={handleRefresh}
            refreshControl={
                <RefreshControl refreshing={!loaded} onRefresh={handleRefresh} />
            }
        >
            <TouchableOpacity onPress={goToSettings} style={styles.settingsButton}>
                <Settings size={30} color={theme.text} />
            </TouchableOpacity>
            
            <View style={styles.header}>
                    <AnimatedLottieView source={require("../assets/bucket.json")} ref={lottieRef} autoPlay loop style={{width: 170, height: 170, marginLeft:7}}/>    
                    <Text style={styles.Title}>My Movies</Text>
                    <UserGenres userId={user._id}/>
            </View>
            <UserMovies movies={userM} />
        </ScrollView>
        
    )
}

export default MoviesScreen