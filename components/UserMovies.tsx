import Loader from "./Loader";
import { View, Text, StyleSheet, Image, Platform, Dimensions, TouchableHighlight, Pressable, TouchableOpacity } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import URL_BACKEND from "../constants/constants";
import { useSelector } from "react-redux";
import {darkTheme, lightTheme} from "../theme/theme";
import {useState} from "react"
import CustomModal from "./CustomModal";
import { useDispatch } from "react-redux";
import { removeUserMovie } from "../redux/actions/userMoviesAction";
import RemoveMovies from "./RemoveMovies";




const UserMovies = ({movies}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMovie, setModalMovie] = useState({});
  const [moviesToRemove, setMoviesToRemove] = useState([]);

  // @ts-ignore
  const user = useSelector(state => state.appReducer.user)
  // @ts-ignore
  const lightMode = useSelector(state => state.appReducer.lightMode)

  const theme = lightMode === true ? lightTheme : darkTheme

  const dispatch = useDispatch();


  const closeModal = () => {
    setIsModalOpen(false);
  }

  const showMovieDetails = (movie) => {

    const url = `https://api.themoviedb.org/3/movie/${movie.id_tmdb}?language=en-US`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MmI4YTc5MjJjYzJkMDNlZDcyMGEyNGNiYTAyOTc0NCIsInN1YiI6IjY0NDEzOGEzZTJiY2E4MDQ2MTQyY2M4NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.y41XlBVWlXLlH-mfLkuMHFhwkh_bdp7q3EyG0-_KH_s'
      }
    };
    
    fetch(url, options)
      .then(res => res.json())
      .then(json => {
        setModalMovie(json)
        setIsModalOpen(true)
      })
      .catch(err => console.error('error:' + err));
  }

  
  const removeMovie = (movie) => {
    dispatch(removeUserMovie(user._id, movie))
    closeModal();
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
    toRemove:{
      opacity: 0.5,
    },
  });



  const modalStyles = StyleSheet.create({
    title:{
      color: theme.text,
      fontSize: 20,
      fontWeight: "bold",
      marginVertical: 10,
      textAlign: "center",
    },
    overview:{
      color: theme.text,
      fontSize: 15,
      marginVertical: 10,
      textAlign: "justify",
    },
    genres:{
      flexDirection: "row",
      flexWrap: "wrap",
    },
    genre:{
      margin: 3,
      backgroundColor: theme.button,
      paddingVertical: 5,
      paddingHorizontal: 15,
      borderRadius: 50,
      justifyContent: "center",
      alignItems: "center",
    },

    delete:{
      backgroundColor: "transparent",
      borderWidth: 1,
      borderColor:"red",
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderRadius: 10,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 20,
      width: "100%",
      alignSelf: "center",
    },
    textDelete:{
      color: "red",
      fontSize: 15,
      fontWeight: "bold",
    }
  })

  if(movies.length > 0){
  return (
      <View style={styles.scrollContent}>
       

<View style={styles.list}>
  {movies.map((item, index) => (
    <TouchableHighlight
      style={[styles.movie, moviesToRemove.includes(item) && styles.toRemove]}
      onPress={() => showMovieDetails(item)}
      delayLongPress={200}
      onLongPress={() => {
        if(moviesToRemove.includes(item)){
          setMoviesToRemove(moviesToRemove.filter(movie => movie !== item))
          return;
        }
        setMoviesToRemove([...moviesToRemove, item])
      }}
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
          
          <Text style={modalStyles.title}>
            {modalMovie.title}
          </Text>

          <Text style={modalStyles.overview}>
            {modalMovie.overview}
          </Text>

          <View style={modalStyles.genres}>

            {
              modalMovie.genres && modalMovie.genres.map((genre, index) => (
                <View style={modalStyles.genre} key={index}>
                  <Text style={{color:theme.buttonTextColor}}>
                    {genre.name}
                  </Text>
                 
                </View>
              ))
            }
          </View>


          <TouchableOpacity style={modalStyles.delete} onPress={() => removeMovie(modalMovie)}>
            <Text style={modalStyles.textDelete}>
              Delete
            </Text>
          </TouchableOpacity>
        </CustomModal>


        

        <RemoveMovies moviesToRemove={moviesToRemove} setMoviesToRemove={setMoviesToRemove} removeMovie={removeMovie} />
     
      
       
    </View>);
}};




export default UserMovies;
