import React, { useEffect, useRef } from 'react';
import { Animated, Image, View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import { useState } from 'react';
import AnimatedLottieView from 'lottie-react-native';

const Welcome = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;


  const [infos, setInfos] = useState([
    {
      info: "Discover a world of movies at your fingertips",
      lottie: require('../assets/bucket.json'),
    },
    {
      info: "Create your own movie list",
      lottie: require('../assets/popcorn.json'),
    },
    {
      info: "Unveil your movie connections with friends",
      lottie: require('../assets/speaker.json'),
    },
  ]);

  const [currentInfo, setCurrentInfo] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentInfo((prevInfo) => (prevInfo + 1) % infos.length); // Increment and loop through infos array
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {

    fadeAnim.setValue(0); // Reset the animation value
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000, // Adjust the duration as needed
      useNativeDriver: true,
    }).start();
  }, [currentInfo, fadeAnim]);



  return (
    <View style={styles.container}>
      
      <Image source={require('../assets/corn.png')} style={{ width: 250, height: 120 }} />
      <Animated.View style={[styles.infoBox, { opacity: fadeAnim }]}>
        <AnimatedLottieView style={{ width: 200, height: 200 }} source={infos[currentInfo].lottie} autoPlay loop />
        <Text style={{ color: "white", fontSize: 40, fontWeight: "bold", margin: 20, textAlign: "center" }}>{infos[currentInfo].info}</Text>
      </Animated.View>

      <TouchableHighlight style={styles.button} onPress={() => navigation.navigate('Login')}>
        <Text style={{ color: "black", fontWeight: "bold", fontSize: 20 }}>Get started</Text>
      </TouchableHighlight>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "black",
  },
  button: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 12,
    width: 270,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 50,
  },
  infoBox: {
    height: "50%",
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default Welcome;
