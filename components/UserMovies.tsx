import Loader from "./Loader";
import { View, Text, StyleSheet, Image } from "react-native";
import {useSelector} from 'react-redux';



const UserMovies = ({movies}) => {
  

  if ( !movies && movies.length === 0) {
    return <Loader />;
  }

  if(movies.length > 0){
  return (

      <View
        style={styles.scrollContent}
      >
        {movies.reverse().map((movie, index) => {
          return (
            <View style={styles.movie} 
              
              // @ts-ignore
              key={index} onDoublePress={() => {
                console.log("double pressed");
              }}>
            
             
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
  }
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
