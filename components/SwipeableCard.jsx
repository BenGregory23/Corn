import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, PanResponder, Text , Image} from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';

const SwipeableCard = ({movie, poster, next}) => {
  const pan = useRef(new Animated.ValueXY()).current;
  const nextRef = useRef(next);
  const swipeThreshold = 120;

  useEffect(() => {
    nextRef.current = next; // Update the ref whenever the `next` prop changes
  }, [next]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event(
        [null, { dx: pan.x, dy: pan.y }],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx > swipeThreshold) {
            
            // Swiped right
            Animated.timing(pan, {
              toValue: { x: 500, y: 0 },
              duration: 200,
              useNativeDriver: true,
            }).start(() => {
              pan.setValue({ x: 0, y: 0 });
              nextRef.current(true); // Use the ref to call `next`
            });
          } else if (gesture.dx < -swipeThreshold) {

            

              // Swiped left
            Animated.timing(pan, {
              toValue: { x: -500, y: 0 },
              duration: 200,
              useNativeDriver: true,
            }).start(() => {
              pan.setValue({ x: 0, y: 0 })
              nextRef.current(false)
            });



          
          } else {
            // Reset position
            Animated.spring(pan, {
              toValue: { x: 0, y: 0 },
              useNativeDriver: true,
            }).start();
          }
      },
    })
  ).current;

  const cardStyle = {
    transform: [{ translateX: pan.x }, { translateY: pan.y }],
  };

  return (
    
      <Animated.View
        style={[styles.card, cardStyle]}
        {...panResponder.panHandlers}
      >
        <Image style={styles.poster} source={{uri:"https://image.tmdb.org/t/p/w500" + poster}}
           
        />
      </Animated.View>

    
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 25,
    width: 350,
    maxWidth: "80%",

    height: "75%",
    borderRadius: 10,
    backgroundColor: '#FFC107',
  },
  poster:{
    width: "100%",
    height: "100%",
    borderRadius: 10,
    objectFit: "cover",
  }
});

export default SwipeableCard;