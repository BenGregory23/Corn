import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, Dimensions } from 'react-native'
import AnimatedLottieView from 'lottie-react-native'
import { useSelector } from 'react-redux'
import { lightTheme, darkTheme } from '../theme/theme'

const Loader = () => {

        // @ts-ignore
        const lightMode = useSelector(state => state.appReducer.state)
        const theme = (lightMode === true) ? lightTheme : darkTheme;

    const [loadingSentences, setLoadingSentences] = useState([
        "Loading recommendations...",
        "Finding movies for you...",
        "Just a moment...",
        "Almost there...",
        "Hold on tight...",
        "Fetching personalized movies...",
        "Preparing your movie list...",
        "Scanning our database...",
        "Matching your preferences...",
        "Searching for movie gems...",
      ]);



      const [loadingLotties, setLoadingLotties] = useState([
        require("../assets/speaker.json"),
        require("../assets/bucket.json"),
        require("../assets/popcorn.json"),
      ]);

      const [randomSentence, setRandomSentence] = useState(loadingSentences[Math.floor(Math.random() * loadingSentences.length)]);
   
      useEffect(() => {
        
        const interval = setInterval(() => {
            setRandomSentence(loadingSentences[Math.floor(Math.random() * loadingSentences.length)]);

        }, 5000); 
        return () => clearInterval(interval);   
        }, []);


    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            backgroundColor: theme.background,
            justifyContent: 'center',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: Dimensions.get("window").height,
        } ,
        text:{
            color:theme.text,
            fontSize: 16,
            margin: 20,
            fontWeight: "bold",
        }
})
    

    return(
        //fading animation
    <View style={styles.container}>
        <AnimatedLottieView source={
            loadingLotties[Math.floor(Math.random() * loadingLotties.length)]
        } autoPlay loop style={{width: 120, height: 120}}/>
        <Text style={styles.text}>
            {randomSentence}
        </Text>
    </View>)

}

export default Loader