import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, Image, Dimensions, Animated} from 'react-native';
import Swiper from 'react-native-deck-swiper';
import BackgroundImage from './BackgroundImage';
import Loader from './Loader';
import { useSelector, useDispatch } from 'react-redux';
import { addUserMovie } from '../redux/actions/userMoviesAction';
import AnimatedLottieView from "lottie-react-native"
import { URL_BACKEND } from '../constants/constants';
import { getValueFor } from '../utils/secureStore';

const Movie = () => {
 
  const [movies, setMovies] = useState([]);
  const [loaded, setLoaded] = useState(false)
  const [cardIndexState, setCardIndexState] = useState(0);
  const [animateSwipeRight, setAnimateSwipeRight] = useState(false);

  // add ref for the lottie
  const lottieRef = useRef(null);

  const user = useSelector(state => state.appReducer.user);
  const dispatch = useDispatch();

 

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
      const url = URL_BACKEND + '/movies/random/' + user._id;
      
      

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + getValueFor('token')
        },
      });
     
      const data = await response.json();
      // log the length
     

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
      <View style={{
        position: "absolute",
        top: 150,
        display: animateSwipeRight ? "flex" : "none",
        zIndex: 10,
        
      }}>
       <AnimatedLottieView source={require("../assets/popcorn.json")}
       loop={false} 
        ref={lottieRef}
        onAnimationFinish={() => {
          setAnimateSwipeRight(false);
          lottieRef.current.reset();
        }}
        duration={1500}
        speed={0.5}
        resizeMode='contain'
                                    style={{width: 300, height: 150, 
                                    zIndex: 10,
                                    
                                    }}/>
      </View>
    
      {//<Image style={styles.backgroundImage} source={{uri: `https://image.tmdb.org/t/p/w500/${movies[cardIndexState].backdrop_path}`}} blurRadius={6}/>
}
      <BackgroundImage poster_path={movies[cardIndexState].poster_path} />
      <View style={styles.swiper}>
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
              setCardIndexState(cardIndex+1)
              
              if(cardIndex == movies.length - 3){
                setLoaded(false);
              }
            }}
            onSwipedRight={(cardIndex, card) => {
              setAnimateSwipeRight(true);
              swipeRight(card.title, card.poster_path, card.id)
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
