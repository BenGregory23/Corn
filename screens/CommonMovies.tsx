import React, {useEffect, useState} from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Image,
    Dimensions,
} from "react-native";
import CustomModal from "../components/CustomModal";
import {OLD_URL_BACKEND, URL_BACKEND} from "../constants/constants";
import {ChevronLeft} from "lucide-react-native";
import Loader from "../components/Loader";
import {useNavigation} from "@react-navigation/native";
import {darkTheme, lightTheme} from "../theme/theme";
import {useSelector} from "react-redux";
import store from "../redux/store";
import {Switch} from "react-native-gesture-handler";
import {FR, EN} from "../lang/lang";
import { getValueFor } from "../utils/secureStore";

const CommonMovies = ({route}) => {
    const navigation = useNavigation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userMovies, setUserMovies] = useState([]);
    const [friendMovies, setFriendMovies] = useState([]);
    const [displayedMovies, setDisplayedMovies] = useState([]);
    const [commonMovies, setCommonMovies] = useState([]);
    const [dataLoaded, setDataLoaded] = useState({
        user: false,
        friend: false,
    });
    const [showCommonMovies, setShowCommonMovies] = useState(true);
    const toggleSwitch = () => setShowCommonMovies(previousState => !previousState);

    // @ts-ignore
    const lightMode = useSelector((state) => state.appReducer.lightMode);
    const theme = lightMode === true ? lightTheme : darkTheme;

    // @ts-ignore
    const language = useSelector(state => state.appReducer.language);
    const lang = (language == "EN") ? EN : FR;

    const closeModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        if (dataLoaded.friend !== true) {
            fetch(URL_BACKEND + `/users/${route.params.id}/movies`,{
                method: "GET",
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + getValueFor("token"),
                }}
            ).then((res) => res.json())
            .then((data) => {
                    console.log(data);
                    setFriendMovies(data);
                    setDataLoaded({...dataLoaded, friend: true});
                    setDisplayedMovies(data);
                });

                
        }

        if (dataLoaded.user !== true) {
            fetch(URL_BACKEND + `/users/${store.getState().appReducer.user._id}/movies`,{
                method: "GET",
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + getValueFor("token")
                }
            })
                .then((res) => res.json())
                .then((data) => {
                    setUserMovies(data);
                    setDataLoaded({...dataLoaded, user: true});
                });
        }

        if (dataLoaded.user && dataLoaded.friend) {
            getCommonMovies();
            setDisplayedMovies(showCommonMovies ? commonMovies : friendMovies);
        }
    }, [dataLoaded]);


    useEffect(() => {
        setDisplayedMovies(showCommonMovies ? commonMovies : friendMovies);
    }, [showCommonMovies]);


    const getCommonMovies = () => {
        if (userMovies.length === 0 || friendMovies.length === 0) {
            return;
        }
        const commonMovies = userMovies.filter((userMovie) =>
            friendMovies.some((friendMovie) => friendMovie.id_tmdb === userMovie.id_tmdb)
        );
        setCommonMovies(commonMovies);
    };


    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.background,
            paddingTop: 40,
        },
        header: {
            justifyContent: "flex-start",
            alignItems: "center",
            flexDirection: "row",
            margin: 20,
        },
        title: {
            color: theme.text,
            fontSize: 29,
            fontWeight: "bold",
            textAlign: "center",
            margin: 0,
        },
        backButton: {
            marginRight: 10,
            zIndex: 100,
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
        poster: {
            width: 110,
            height: 160,
            borderColor: theme.border,
            borderWidth: 1,
            borderRadius: 10,
        },
        flatList: {
            maxHeight: Dimensions.get("window").height - 200, // Adjust the value as needed
        },
        flatListContainer: {
            flexGrow: 1,
            alignItems: "center",
        },
        settings: {
            zIndex: 100,
            position: "absolute",
            right: 40,
            left: 40,
            bottom: 90,
            backgroundColor: theme.button,
            padding: 20,
            borderRadius: 10,
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 10,
            shadowColor: theme.shadow,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
        },
        text: {
            color: theme.buttonTextColor,
            fontSize: 17,
            fontWeight: "bold",
            textAlign: "center",
            marginHorizontal: 10,
        },
        switch: {
            marginLeft: 10,
        }
    });

    if (!dataLoaded.user || !dataLoaded.friend) {
        return <Loader/>;
    }


    return (
        <View style={styles.container}>
            <View style={styles.header}>

                <TouchableOpacity style={styles.backButton} onPress={() => {
                    // @ts-ignore
                    navigation.navigate("Friends")
                }}>
                    <ChevronLeft size={30} color={theme.text}/>
                </TouchableOpacity>
                <Text style={styles.title}>{lang.sharedMovies}</Text>
            </View>


            <FlatList
                numColumns={3}
                data={displayedMovies}
                renderItem={({item}) => (
                    <TouchableOpacity style={styles.movie}>
                        <Image
                            source={{uri: "https://image.tmdb.org/t/p/w500/" + item.poster}}
                            style={styles.poster}
                        />
                    </TouchableOpacity>
                )}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={styles.flatListContainer}
                style={styles.flatList}
            />


            <View style={styles.settings}>
                <Text style={styles.text}>{lang.displaySharedMovies}</Text>
                <Switch
                    style={styles.switch}
                    trackColor={{false: 'white', true: 'white'}}
                    thumbColor={theme.button}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={showCommonMovies}
                />
            </View>

           
        </View>
    );
};


export default CommonMovies;
