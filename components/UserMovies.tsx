import Loader from "./Loader";
import { View, Text, StyleSheet, Image, Platform, Dimensions, TouchableHighlight, Pressable } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import URL_BACKEND from "../constants/constants";
import { useSelector } from "react-redux";
import {darkTheme, lightTheme} from "../theme/theme";




const UserMovies = ({movies}) => {

  // @ts-ignore
  const user = useSelector(state => state.appReducer.user)

  // @ts-ignore
  const lightMode = useSelector(state => state.appReducer.lightMode);
  const theme = (lightMode === true) ? lightTheme : darkTheme;
  
  const removeMovie = (movie) => {
    console.log('REMOVING', movie)
    // TODO faire la suppression du film dans le back
    fetch(URL_BACKEND + `/users/${user._id}/movies`,{
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json',
    },
    body : {
      // @ts-ignore
      "name": movie.name,
      "poster": movie.poster,
      "id_tmdb":  movie.id_tmdb
    }
  }).then(res => res.json())
  .then(res => console.log(res))
  .catch(err =>console.log(err))
  }  
  if ( !movies && movies.length === 0) {
    return <Loader />;
  }

  if(movies.length > 0){
  return (
      <View style={styles.scrollContent}>
        
        <FlatList data={movies}
                numColumns={3}
                contentContainerStyle={styles.list}
                initialNumToRender={5}
                  renderItem={({item, index, separators}) => (

                              <View style={styles.movie}    
                                    
                                   key={index} 
                                > 
                                    <Pressable
                                      onLongPress={()=>{
                                        removeMovie(item)
                                        
                                      }}
                                    >
                                      <Image source={{uri:"https://image.tmdb.org/t/p/w500/" + item.poster}} style={styles.poster}/>
                                    </Pressable>
                                </View>)}
        /> 
    </View>);
}};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center"
  },
  scrollContent: {
    
    justifyContent: "center"

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
  },
  list:{
   
    flex:1,
    alignItems:"center",
  }
  
});

export default UserMovies;
