import React, {useState} from 'react';
import {View, TouchableOpacity, Text} from "react-native"
import CustomModal from '../CustomModal';
import {HelpCircle} from "lucide-react-native";

const Help = ({title, icon, buttonWhite, children}) => {
    const [visible, setVisible] = useState(false);

    const onClose = () => {
        setVisible(false);
    }

    return (
        <View style={{flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginHorizontal: 5}}>
            <TouchableOpacity onPress={() => setVisible(true)}>

                {
                    icon === true ? (
                        <HelpCircle color={buttonWhite ? "white" : "black"} size={30}/>
                    ) : (
                        <Text style={{color: "white", marginRight: 10, textDecorationLine: 'underline'}}>
                            Help
                        </Text>
                    )
                }
              
            
            </TouchableOpacity>

            <CustomModal visible={visible} onClose={onClose} >
                {children}
            </CustomModal>
        </View>
    );

}


export default Help;

