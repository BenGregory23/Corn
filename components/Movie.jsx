import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Heart, Send } from 'lucide-react-native';
import Swiper from 'react-native-deck-swiper';
import Loader from "./Loader";
import AnimatedLottieView from 'lottie-react-native';

import CustomSwiper from "./CustomSwiper";

const Movie = () => {
 
  const [movies, setMovies] = useState([]);
  const [loaded, setLoaded] = useState(false)
  const [showDetails, setShowDetails] = useState(false);




  useEffect(() => {
    if(loaded == false){
      fetchRandomMovies();
    }
    
  }, [loaded]);


  useEffect(() => {
    console.log("showDetails", showDetails)
  }, [showDetails]);

  
  const swipeRight = (title, poster_path) => {
    const url = "https://evening-shore-83627.herokuapp.com/users/6464ca0fea2801eac89e4d23/movies";

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({name: title, poster: poster_path})
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
        const randomIndex = Math.floor(Math.random() * data.results.length); // Choose a random movie from the results
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
      
      <View style={styles.swiper}>

        {//<CustomSwiper movies={movies}   refresh={refresh}/>
        }
          
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
           
              if(cardIndex == movies.length - 3){
                setLoaded(false);
              }
            }}
            onSwipedRight={(cardIndex, card) => {
              console.log("swiped right")
              console.log(card)
            
              swipeRight(card.title, card.poster_path)
            }}
            cardIndex={0}
            backgroundColor="transparent"
            stackSize= {3}
            disableBottomSwipe={true}
            disableTopSwipe={true}
            verticalSwipe={false}
            stackSeparation={10}
            animateCardOpacity={true}
            onTapCard={(cardIndex) =>{ 
              setShowDetails(!showDetails);
              // re render the card
           
            }}
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
  card: {
    borderColor: "white",
    borderWidth: 1,
    width: "100%",
    height: "100%",
    maxHeight: "85%",
    backgroundColor: 'white',
    margin: 0,
    borderRadius: 10,
},
image: {
  minWidth: "100%",
  width: "100%",
  height: "100%",
  borderRadius: 10,
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
