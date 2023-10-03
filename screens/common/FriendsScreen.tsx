
import React, { useEffect, useState } from 'react'
import {View, Text, SafeAreaView, TextInput, TouchableOpacity, VirtualizedList, Dimensions} from "react-native"

import { StyleSheet, TouchableHighlight, ScrollView } from 'react-native'
import FriendCard from '../../components/FriendCard'
import "../../assets/speaker.json"
import { Plus, UserPlus2 } from 'lucide-react-native'
import {OLD_URL_BACKEND} from '../../constants/constants'
import { useSelector, useDispatch } from 'react-redux'
import { FlatList } from 'react-native-gesture-handler'

import { darkTheme, lightTheme} from "../../theme/theme";
import Loader from '../../components/Loader'
import AnimatedLottieView from "lottie-react-native";
import UserGenres from "../../components/UserGenres";
import {FR, EN} from "../../lang/lang";
import { fetchUserFriends } from '../../redux/actions/userFriendActions'
import SegmentedControl from '@react-native-segmented-control/segmented-control/js/SegmentedControl.js';



const FriendsScreen = ({navigation}) => {

    const [loaded, setLoaded] = useState(false);
    const [friends, setFriends] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0);


    // @ts-ignore
    const user = useSelector(state => state.appReducer.user)
    // @ts-ignore
    const userFriends = useSelector(state => state.appReducer.userFriends)
    const dispatch = useDispatch();
    


    useEffect(() => {

        if(!loaded){
            dispatch(fetchUserFriends(user._id))
            setFriends(userFriends);
            setLoaded(true);  
        }


    },[loaded])
    // @ts-ignore
    const lightMode = useSelector(state => state.appReducer.lightMode);
    const theme = (lightMode === true) ? lightTheme : darkTheme;

    // @ts-ignore
    const language = useSelector( state => state.appReducer.language);
    const lang = (language == "EN") ? EN : FR;

  



    const renderItem = ({ item }) => (
        <FriendCard friend={item} navigation={navigation}/>
      );

    const styles = StyleSheet.create({
        container:{
            paddingTop: 50,
            backgroundColor: theme.background,
            height: "100%",
        },
        button:{
            position: "absolute",
            bottom: 0,
            right: 0,
            marginBottom: 90,
            marginRight: 20,
            zIndex: 100,
            backgroundColor: theme.button,
            padding: 10,
            borderRadius: 10,
            width: 70,
            height: 70,
            alignItems: "center",
            justifyContent:"center",
            shadowOffset: {
                width: 2,
                height: 2
            },
            shadowOpacity: 0.2,
            shadowRadius: 8,
        },
        text:{
            color: theme.buttonTextColor,
            fontWeight: "700",
        
        },
        Title: {
            color: theme.text,
            fontSize: 30,
            fontWeight: "bold",
            marginVertical: 10,
        },
        header:{
            alignItems: 'center',
        },
    });


    if(!loaded){
        return(
            <Loader/>
        )
    }

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.Title}>{lang.friends}</Text>
            </View>

            <SegmentedControl
                style={{
                    width: 300,
                    height: 50,
                    marginHorizontal: 20,
                    marginBottom: 20,
                    alignSelf: "center",
                    backgroundColor: theme.segmentedControlBackground,

                    borderColor: theme.button,
                    
                }}
                fontStyle={{
                    color: theme.text,
                }}
                tintColor={theme.background}
                values={[lang.friends, lang.groups]}
                selectedIndex={selectedIndex}
                onChange={(event) => {
                    setSelectedIndex(event.nativeEvent.selectedSegmentIndex);
                }}
      />

            

            <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate("Add", {user: user})}>
                <UserPlus2 color={theme.buttonTextColor} width={30} height={30}/>
            </TouchableOpacity>

            {
                
                (selectedIndex == 0) ? (
                    <FlatList data={userFriends} renderItem={renderItem}/>
                ) : (
                    <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
                        <Text style={{color: theme.text}}>Groups are coming soon...</Text>
                    </View>
                )
            }
        </View>
    )

}

export default FriendsScreen;