import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, Image, Dimensions, Animated} from 'react-native';
import Swiper from 'react-native-deck-swiper';
import BackgroundImage from './BackgroundImage';
import Loader from './Loader';
import { useSelector } from 'react-redux';

const Movie = () => {
 
  const [movies, setMovies] = useState([]);
  const [loaded, setLoaded] = useState(false)
  const [cardIndexState, setCardIndexState] = useState(0);

  const user = useSelector(state => state.appReducer.user);

- 

  useEffect(() => {
    console.log("Movie", user);
    if(loaded == false){
      fetchRandomMovies();
    }
  }, [loaded]);

  
  const swipeRight = (title, poster_path, id) => {
    const url = `https://evening-shore-83627.herokuapp.com/users/${user._id}/movies`;
    


    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({name: title, poster: poster_path, id_tmdb:id})
    })
    .then(data => {
      
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  }

 
  const fetchRandomMovies = async () => {
    try {
      const url = `https://evening-shore-83627.herokuapp.com/random/${user._id}`;

      const response = await fetch(url);
      const data = await response.json();

      if (response.ok) {
        console.log("RANDOM",data);
        setLoaded(false); // Reset loaded state to false
        setMovies(data); // Set movies state to the results
        
        setLoaded(true);
      } else {
        throw new Error(data.status_message);
      }
    } catch (error) {
      console.error('Error fetching random movies:', error);
    }
  };

  if(!loaded){
    return (
        <Loader/>
    )
  }
  
  return (
    <View style={styles.container}>
    
      {//<Image style={styles.backgroundImage} source={{uri: `https://image.tmdb.org/t/p/w500/${movies[cardIndexState].backdrop_path}`}} blurRadius={6}/>
}
      <BackgroundImage poster_path={movies[cardIndexState].poster} />
      <View style={styles.swiper}>
          <Swiper
            cards={movies}
            
            renderCard={(card) => {
              
                return ( 
                    <View style={styles.card}>

                        <Image style={styles.image} source={{uri: `https://image.tmdb.org/t/p/w500/${card.poster}`}}/>
                    </View>
                )
            }}
            onSwiped={(cardIndex) => {
              setCardIndexState(cardIndex+1)
              
              if(cardIndex == movies.length - 3){
                setLoaded(false);
              }
            }}
            onSwipedRight={(cardIndex, card) => {
              swipeRight(card.title, card.poster, card.id)
            }}
            onSwipedAll={() => {
              setCardIndexState(0)
              setLoaded(false);
            }}
            cardIndex={cardIndexState}
            backgroundColor="transparent"
            stackSize= {3}
            disableBottomSwipe={true}
            disableTopSwipe={true}
            verticalSwipe={false}
            stackSeparation={10}
            animateCardOpacity={true}
            >
               
        </Swiper>
      
      </View> 
    </View>
    

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  backgroundImage:{
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    bottom: 0,
    left: 0,
    zIndex: -1, 
    
  },
  card: {
    borderColor: "white",
    borderWidth: 0,
    width: Dimensions.get('window').width * 0.9,
    height: Dimensions.get('window').height * 0.7,
    backgroundColor: 'white',
    margin: 0,
    borderRadius: 25,
  },
  image: {
    width: Dimensions.get('window').width * 0.9,
    height: Dimensions.get('window').height * 0.7,
    borderRadius: 25,
  },
  swiper:{
    height:"100%",
    width:"100%",
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },  
});

export default Movie;
