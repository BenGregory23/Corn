
import React, { useEffect, useRef } from 'react';
import { Animated, Image, Dimensions, StyleSheet } from 'react-native';

const BackgroundImage = ({ poster_path }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  useEffect(() => {
    const fadeIn = Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    });

    const fadeOut = Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    });

    fadeIn.start();
    return () => {
      fadeOut.start(() => {
      
      });
    };
  }, [fadeAnim, poster_path]);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Image
        style={styles.backgroundImage}
        source={{ uri: `https://image.tmdb.org/t/p/w500/${poster_path}` }}
        blurRadius={6}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: -2,
    top: 0,
    left: 0,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
    position: 'relative',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    bottom: 0,
    left: 0,
    zIndex: -1,
  },
});

export default BackgroundImage;
