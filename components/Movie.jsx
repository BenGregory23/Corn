import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, Image, Dimensions, Animated} from 'react-native';
import Swiper from 'react-native-deck-swiper';
import BackgroundImage from './BackgroundImage';
import Loader from './Loader';
import { useSelector, useDispatch } from 'react-redux';
import { addUserMovie } from '../redux/actions/userMoviesAction';
import AnimatedLottieView from "lottie-react-native"

const Movie = () => {
 
  const [movies, setMovies] = useState([]);
  const [loaded, setLoaded] = useState(false)
  const [cardIndexState, setCardIndexState] = useState(0);

  // add ref for the lottie
  const lottieRef = useRef(null);

  const user = useSelector(state => state.appReducer.user);
  const dispatch = useDispatch();

- 

  useEffect(() => {
    if(loaded == false){
      fetchRandomMovies();
    }
  }, [loaded]);

  
  const swipeRight = (title, poster_path, id) => {
   
 
    lottieRef.current.play();
    dispatch(addUserMovie(user._id,title, poster_path,id));

  }

 
  const fetchRandomMovies = async () => {
    try {
      const url = `https://evening-shore-83627.herokuapp.com/random/${user._id}`;

      const response = await fetch(url);
      const data = await response.json();

      if (response.ok) {
       
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
       <AnimatedLottieView source={require("../assets/success.json")}
       loop={false} 
        ref={lottieRef}
        onAnimationFinish={() => {lottieRef.current.reset();}}
        duration={1000}             
        resizeMode='cover'
                                    style={{width: 300, height: 150, position: "absolute", top: 50,
                                    zIndex: 10,
                                    }}/>
    
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
    zIndex: 1,
  },
  image: {
    width: Dimensions.get('window').width * 0.9,
    height: Dimensions.get('window').height * 0.7,
    borderRadius: 25,
  },
  swiper:{
    marginTop: 100,
    height:"100%",
    width:"100%",
    marginBottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },  
});

export default Movie;
