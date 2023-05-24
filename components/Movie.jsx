import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Heart, Send } from 'lucide-react-native';
import CustomSwiper from "./CustomSwiper";

const Movie = () => {
  const [currentMovie, setCurrentMovie] = useState({});
  const [movies, setMovies] = useState([]);
  const [counter, setCounter] = useState(0);
  const [loaded, setLoaded] = useState(false)
  

  useEffect(() => {
    console.log("load")
    if(loaded == false){
      fetchRandomMovies();
     
    }
    
  }, [loaded]);


 

  const fetchRandomMovies = async () => {
    try {
      const apiKey = '42b8a7922cc2d03ed720a24cba029744';
      const genres = '12,28'; // Specify your desired genre IDs (e.g., 12 for Adventure, 28 for Action)
      const apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genres}`;

      const response = await fetch(apiUrl);
      const data = await response.json();

      if (response.ok) {
        setMovies(data.results);
        setCurrentMovie(data.results[0]);
        setLoaded(true)
      } else {
        throw new Error(data.status_message);
      }
    } catch (error) {
      console.error('Error fetching random movies:', error);
    }
  };

  const handleNextMovie = (like) => {
    
    if(counter === movies.length - 1){
      console.log("fetching")
      fetchRandomMovies().then(() => {
        setCounter(0) 
        setLoaded(false)
      } )
      // Reset the counter if we're at the end of the array
    } else {
      const newCounter = counter + 1;
      setCounter(newCounter); // Increment the counter
      setCurrentMovie(movies[newCounter]); // Use the newCounter value directly
    }
  };
  
  

 

  const handleSuperLikePress = () => {
    console.log('Super Like button pressed');
    // Your code for handling the super like button press
  };

  return (
    <View style={styles.container}>

      <CustomSwiper/>

      <View style={styles.buttonContainer}>
        
        <TouchableOpacity style={styles.button} onPress={handleSuperLikePress}>
          <Heart color='black' />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleNextMovie}>
          <Send color='black'/>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  poster: {
    width: 200,
    height: 300,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: 300,
    height: '10%',
  },
  button: {
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    width: 120,
    height: 50,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
  },
  cardPoster: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    objectFit: "cover",
  },
});

export default Movie;
