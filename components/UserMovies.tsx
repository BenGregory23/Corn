import Loader from "./Loader";
import { View, Text, StyleSheet, Image, Platform, Dimensions, TouchableHighlight, Pressable, TouchableOpacity } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import URL_BACKEND from "../constants/constants";
import { useSelector } from "react-redux";
import {darkTheme, lightTheme} from "../theme/theme";
import {useState} from "react"
import CustomModal from "./CustomModal";




const UserMovies = ({movies}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMovie, setModalMovie] = useState({});

  // @ts-ignore
  const user = useSelector(state => state.appReducer.user)
  // @ts-ignore
  const lightMode = useSelector(state => state.appReducer.lightMode)

  const theme = lightMode === true ? lightTheme : darkTheme


  const closeModal = () => {
    setIsModalOpen(false);
  }

  const showMovieDetails = (movie) => {
    setIsModalOpen(true)
    setModalMovie(movie);
    

  }

  
  const removeMovie = (movie) => {
  
    console.log(URL_BACKEND + `/users/${user._id}/movies`)

    console.log(movie.name, movie.poster, movie.id_tmdb)
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

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "black",
      justifyContent: "center",
      alignItems: "center"
    },
    scrollContent:{
      justifyContent: "center"
    },
    movie: {
      height: 150,
      width: 100,
      borderWidth: 1,
      borderColor: theme.border,
      backgroundColor: "white",
      justifyContent: "center",
      borderRadius: 10,
      alignItems: "center",
      margin: 15,
    },
    poster:{
      width: 110,
      height: 160,
      borderColor: theme.border,
      borderWidth: 1,
      borderRadius: 10,
    },
    text:{
      color: theme.text,
      fontSize: 20,
      fontWeight: "bold",
      marginVertical: 10,
      textAlign: "center",
    },
    list:{
      flex:1,
      alignItems:"center",
      justifyContent:"center",
      flexDirection: "row",
      maxWidth: "100%",
      flexWrap: "wrap",
    },
    seenButton:{
      backgroundColor: "green",
      padding: 10,

      
    }
    
  });

  if(movies.length > 0){
  return (
      <View style={styles.scrollContent}>
       

<View style={styles.list}>
  {movies.map((item, index) => (
    <TouchableHighlight
      style={styles.movie}
      onPress={() => showMovieDetails(item)}
      key={index}
    >
      <Image
        source={{ uri: "https://image.tmdb.org/t/p/w500/" + item.poster }}
        style={styles.poster}
      />
    </TouchableHighlight>
  ))}
</View>




      <CustomModal visible={isModalOpen} onClose={closeModal} >
          
          <Text style={styles.text}>
            {modalMovie.name}
          </Text>

          <TouchableHighlight style={styles.seenButton}>
           <Text style={styles.text} > I've seen it !</Text>
          </TouchableHighlight>
        
        </CustomModal>
     
      
       
    </View>);
}};




export default UserMovies;
