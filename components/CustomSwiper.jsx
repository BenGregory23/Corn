import Swiper from "react-native-deck-swiper";
import {Button, Image, Text, View, StyleSheet} from "react-native";
import React, { useEffect } from "react";
import { Loader } from "lucide-react-native";

const CustomSwiper = ({movies, refresh}) => {
    const [counter, setCounter] = React.useState(0)

    useEffect(() => {
        console.log(movies)
    }, [movies])

    if(movies.length === 0){
        return (
            <Loader size={50} color="#000" />
        )
    }

    return (
        <Swiper
            cards={movies}
            renderCard={(card) => {
                return (
                    <View style={styles.card}>
                        <Image style={styles.image} source={{uri: `https://image.tmdb.org/t/p/w500/${card.poster_path}`}}/>
                    </View>
                )
            }}
            onSwiped={(cardIndex) => {
                console.log(cardIndex)
                setCounter(counter + 1)
            }}
            onSwipedAll={() => {
                // go back to the beginning
                setCounter(0)
            }}
            cardIndex={counter}
            backgroundColor="transparent"
            stackSize= {3}
            disableBottomSwipe={true}
            disableTopSwipe={true}
            verticalSwipe={false}
            onTapCard={(cardIndex) => console.log(cardIndex)}
            >
               
        </Swiper>
        
    )
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        width: "100%",
        height: "100%",
        maxHeight: "90%",
        backgroundColor: 'white',
        margin: 0,
        borderRadius: 10,
     
    },
    image: {
        minWidth: "100%",
        width: "100%",
        height: "100%",
        borderRadius: 10,
    }
});

export default CustomSwiper;