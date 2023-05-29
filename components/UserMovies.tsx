import Loader from "./Loader";
import { useEffect, useState, useRef } from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";

const UserMovies = () => {
  const [loaded, setLoaded] = useState(false);
  const [userMovies, setUserMovies] = useState([
    "Action",
    "Adventure",
    "Animation",
    "Biography",
    "Comedy",
    "Animation",
    "Biography",
    "Comedy",
    "Animation",
    "Biography",
    "Comedy",
    "Crime",
  ]);

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 2000);
  }, []);

  if (!loaded) {
    return <Loader />;
  }

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        directionalLockEnabled={true}
      >
        {userMovies.map((movie, index) => {
          return (
            <View style={styles.movie} key={index}>
              <Text style={{ color: "white" }}>{movie}</Text>
            </View>
          );
        })}
        <Text style={styles.text}>
            Add more movies!
        </Text>
      </ScrollView>
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
  text:{
        color: "white",
        fontSize: 30,
        fontWeight: "bold",
        marginVertical: 50,
  }
});

export default UserMovies;
