import Loader from "./Loader";
import { useEffect, useState, useRef } from "react";
import { View, ScrollView, Text, StyleSheet, Image } from "react-native";
import { useIsFocused } from '@react-navigation/native';

const UserMovies = () => {
  const [loaded, setLoaded] = useState(false);
  const [userMovies, setUserMovies] = useState([
    "Action",
    
  ]);
  const isFocused = useIsFocused();

  useEffect(() => {
    
    if(!loaded){
    fetch("https://evening-shore-83627.herokuapp.com/users/6464ca0fea2801eac89e4d23/movies", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setUserMovies(data);
        
          setLoaded(true);
        
      })
      .catch((error) => {
        console.error(error);
      });
    }
  }, [loaded]);


  useEffect(() => {
    if(isFocused){
      setLoaded(false)
    }
  }, [isFocused])

  
  if (!loaded) {
    return <Loader />;
  }

  return (

      <View
        style={styles.scrollContent}
      >


        {userMovies.reverse().map((movie, index) => {
          return (
            <View style={styles.movie} key={index}>
             
              <Image source={{
                uri:"https://image.tmdb.org/t/p/w500/" + movie.poster
              }} style={styles.poster}/>
            </View>
          );
        })}
        <Text style={styles.text}>
            Add more movies!
        </Text>
      </View>
   
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  scrollContent: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100%",
  },
  movie: {
    height: 150,
    width: 100,
    borderWidth: 1,
    borderColor: "white",
    backgroundColor: "white",
    justifyContent: "center",
    borderRadius: 10,
    alignItems: "center",
    margin: 10,
  },
  poster:{
    width: 100,
    height: 150,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 10,
  },
  text:{
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
    textAlign: "center",
  }
  
});

export default UserMovies;
