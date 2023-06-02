import Loader from "./Loader";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useIsFocused } from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import { fetchUserMovies } from "../redux/actions/userMoviesAction";



const UserMovies = () => {
  const [loaded, setLoaded] = useState(false);
  const [userMovies, setUserMovies] = useState([
    "Action",
    
  ]);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  //  @ts-ignore
  const userM = useSelector((state) => state.appReducer.userMovies);

  useEffect(() => {
    const loadMovies = async () =>{
      await dispatch(fetchUserMovies());
      setLoaded(true);  
    }
    loadMovies();
  
    setUserMovies(userM);


  },[dispatch]);




  
  if (!loaded) {
    return <Loader />;
  }

  return (

      <View
        style={styles.scrollContent}
      >


        {userM.reverse().map((movie, index) => {
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
