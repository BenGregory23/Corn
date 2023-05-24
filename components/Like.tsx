import React, { useEffect } from 'react'
import { View, StyleSheet, Button } from 'react-native'
import LottieView from 'lottie-react-native';
import { useRef } from 'react';

const Like =  () => {
    const animation = useRef(null);

    useEffect(() => {
        animation.current.play();
    }, [])


    const playAnimation = () => {
        animation.current.play();
    }

   




    return (
        <View style={styles.container} >
        <LottieView 
        source={require('../assets/362-like.json')} 
        autoPlay 
        ref={animation}
        loop={false}
        style={{
            width: 200,
            height: 200,
            backgroundColor: 'transparent',
          }}
        />
        <Button title="Play" onPress={playAnimation} />

        
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        display : 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: 'transparent',
    }
})


export default Like