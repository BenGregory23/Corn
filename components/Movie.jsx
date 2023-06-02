import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, Dimensions} from 'react-native';
import Swiper from 'react-native-deck-swiper';


const Movie = () => {
 
  const [movies, setMovies] = useState([]);
  const [loaded, setLoaded] = useState(false)
  const [showDetails, setShowDetails] = useState(false);
  const [cardIndexState, setCardIndexState] = useState(0);

  useEffect(() => {
    if(loaded == false){
      fetchRandomMovies();
    }
  }, [loaded]);

  
  const swipeRight = (title, poster_path, id) => {
    const url = "https://evening-shore-83627.herokuapp.com/users/6464ca0fea2801eac89e4d23/movies";

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
      const apiKey = '42b8a7922cc2d03ed720a24cba029744';
      const genres = '12,28'; // Specify your desired genre IDs (e.g., 12 for Adventure, 28 for Action)
      const page = Math.floor(Math.random() * 100) + 1; // Generate a random page number between 1 and 100
     
      const apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genres}&page=${page}`;

      const response = await fetch(apiUrl);
      const data = await response.json();

      if (response.ok) {
        
        setLoaded(false); // Reset loaded state to false
        setMovies(data.results); // Set movies state to the results
        
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
        <></>
    )
  }

  return (
    <View style={styles.container}>
      <Image style={styles.backgroundImage} source={{uri: `https://image.tmdb.org/t/p/w500/${movies[cardIndexState].backdrop_path}`}} blurRadius={6}/>
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

              console.log(cardIndex, cardIndexState)
              setCardIndexState(cardIndex+1)
              if(cardIndex == movies.length - 3){
                setLoaded(false);
              }
            }}
            onSwipedRight={(cardIndex, card) => {
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
    alignItems: 'flex-start',
    width: "100%",
    height: "100%",
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
    borderWidth: 1,
    width: "100%",
    height: "100%",
    maxHeight: "85%",
    backgroundColor: 'white',
    margin: 0,
    borderRadius: 20,
},
image: {
  minWidth: "100%",
  width: "100%",
  height: "100%",
  borderRadius: 20,
},
  swiper:{
    height:"100%",
    width:"100%",
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },
 
  cardPoster: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    objectFit: "cover",
  },
  details: {
    display: "none",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  detailsActive: {
     
    position: "relative",
    top: 0,
    left: 0,
    width: "90%",
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 10,
    zIndex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    
  }
});

export default Movie;
