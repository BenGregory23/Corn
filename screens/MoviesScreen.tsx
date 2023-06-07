import React, { useEffect, useState } from 'react'
import {View, Text, StyleSheet, RefreshControl, TouchableOpacity} from "react-native"
import AnimatedLottieView from 'lottie-react-native'
import UserGenres from '../components/UserGenres'
import { ScrollView } from 'react-native-gesture-handler'
import UserMovies from '../components/UserMovies'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserMovies } from '../redux/actions/userMoviesAction'
import { Settings } from 'lucide-react-native'
import Loader from '../components/Loader'


const MoviesScreen = ({navigation}) => {
    // @ts-ignore
    const user = useSelector(state => state.appReducer.user);
    // @ts-ignore
    const userM = useSelector((state) => state.appReducer.userMovies);

    const dispatch = useDispatch();

    const [loaded, setLoaded] = useState(false);

   

    useEffect(() => {
      const loadMovies = async () =>{
        await dispatch(fetchUserMovies(user._id));
        setLoaded(true)
      }
      loadMovies();
      
    },[dispatch]);

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

    return(
        <ScrollView style={styles.container}
            onScrollEndDrag={handleRefresh}
            refreshControl={
                <RefreshControl refreshing={!loaded} onRefresh={handleRefresh} />
            }
        >
            <TouchableOpacity onPress={goToSettings} style={styles.settingsButton}>
                <Settings size={30} color="white" />
            </TouchableOpacity>
        
            <View style={styles.header}>
                {
                    <AnimatedLottieView source={require("../assets/bucket.json")} autoPlay loop style={{width: 200, height: 200, marginLeft:7}}/>
                }
                <Text style={styles.Title}>My Movies</Text>
                <UserGenres userId={user._id}/>
            </View>
            <UserMovies movies={userM} />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black"
    } ,
    Title: {
        color: "white",
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

export default MoviesScreen