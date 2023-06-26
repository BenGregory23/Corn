import { Settings2 } from 'lucide-react-native';
import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, Image, Dimensions} from 'react-native';
import { FR, EN } from '../lang/lang';
import { useSelector } from 'react-redux';
import apple from '../assets/apple.png';
import disney from '../assets/disney.png';
import netflix from '../assets/netflix.png';
import prime from '../assets/prime.png';
import { TouchableHighlight } from 'react-native-gesture-handler';
import * as Haptics from 'expo-haptics';
import { getData, storeData } from '../utils/asyncStore';



const Preferences = ({theme}) => {
    
    // @ts-ignore
    const language = useSelector(state => state.appReducer.language);

    const lang = (language == "EN") ? EN : FR;


    const [userMovieProviders, setUserMovieProviders] = useState([]);


    useEffect(() => {
        console.log("Preferences mounted");
        // get providers from async storage 
        // @ts-ignore
        getData("userMovieProviders").then((data) => {
            if(data != null){
                setUserMovieProviders(JSON.parse(data));
            }
        });
    }, []);

    const movieProviders = [
        {
            Name: "Netflix",
            Logo: netflix,
            URL: "https://www.netflix.com/",
        },
        {
            Name: "Amazon Prime Video",
            Logo: prime,
            URL: "https://www.primevideo.com/",
        },
        {
            Name: "Disney+",
            Logo: disney,
            URL: "https://www.disneyplus.com/",
        },
        {
            Name: "Apple TV+",
            Logo: apple,
            URL: "https://www.apple.com/apple-tv-plus/",
        },       
    ]


    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: "center",
            alignItems: "flex-start",
            margin: 10,
            width: Dimensions.get('window').width,
        },
        section:{
            justifyContent: "center",
            alignItems: "flex-start",   
            padding: 10,
        
            width: "100%",
        },
        sectionTitle:{
            color: theme.text,
            fontSize: 20,
            fontWeight: 'bold',
            textAlign: 'center',
            margin: 0,
            marginBottom: 10,
        },
        description:{
            color: theme.text,
            fontSize: 15,
            fontWeight: 300,
            textAlign: 'left',
            margin: 0,
            marginBottom: 10,
        },
        provider:{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            margin: 7,
            opacity: 0.4,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: "transparent",
            padding: 7,
            aspectRatio: 1,
        },
        active:{
            transform: [{ scale: 1.2 }],
            opacity: 1,

        },
        
    });


    const updateProviders = (provider:string) => {
        if(userMovieProviders.includes(provider)){
            // remove
            // @ts-ignore
            storeData("userMovieProviders", JSON.stringify(userMovieProviders.filter((item) => item != provider)));
            setUserMovieProviders(userMovieProviders.filter((item) => item != provider));
        }else{
            // store 
            // @ts-ignore
            storeData("userMovieProviders", JSON.stringify([...userMovieProviders, provider]));
            setUserMovieProviders([...userMovieProviders, provider]);
        }
    }


    return(
        <View style={styles.container}>
            {
            //<Settings2 size={30} color={theme.text} />

            }
            <View style={styles.section}>
                <Text  style={styles.sectionTitle}>{lang.movieProviders}</Text>
                <Text  style={styles.description}>{lang.movieProvidersText}</Text>


                <View style={{flexDirection: "row", flexWrap: "wrap", justifyContent: "center", alignItems: "center", width: "100%"}}>
                {
                    movieProviders.map((provider, index) => {
                        return(
                            <TouchableHighlight key={index} style={[styles.provider, (userMovieProviders.includes(provider.Name)) ? styles.active : null]}
                            onPress={() => {
                                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                                updateProviders(provider.Name);
                            }}
                            >
                                <Image source={provider.Logo} style={{width: 45, height: 45, marginRight: 10}} />
                            </TouchableHighlight>
                        )
                    })

                }
                </View>
            </View>
            
        </View>
    )
}

export default Preferences;