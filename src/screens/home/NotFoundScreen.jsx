import React from "react";
import { View, Text, TouchableNativeFeedback, Image, StyleSheet} from 'react-native'
import NotFound from "../../components/NotFound";
import {Ionicons} from '@expo/vector-icons';
import { useNavigation, useRoute } from "@react-navigation/native";
import { userSelector } from '../../store/selectors/userSelector';
import {useSelector } from "react-redux";
export default function NotFoundScreen(){
        const navigation = useNavigation()
        const route = useRoute()
        const user = useSelector(userSelector)
        const {donnees} = route.params
        return(
                <>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignContent: "center", alignItems: "center", paddingHorizontal: 20, }}>
                                <TouchableNativeFeedback onPress={() => navigation.goBack()} useForeground>
                                        <View style={{ borderRadius: 50, padding: 10, overflow: 'hidden', opacity: 0.8, backgroundColor: '#0a5744' }}>
                                                <Ionicons name="arrow-back-outline" size={24} color="#0a5744" />
                                        </View>
                                </TouchableNativeFeedback>
                                <View style={{ justifyContent: "center", alignItems: "center", alignSelf: "center" }}>
                                <Text style={styles.titleHistorique}>
                                                {user.user.USER_FNAME} {user.user.USER_LNAME}
                                </Text>
                                </View>
                        </View>
                <View style={styles.notfoundContainer}>
                        <Image source={require('../../../assets/errors-removebg-preview.png')}  style={styles.notfoundImage}/>
                        <Text style={styles.notfoundText}>
                                {donnees}
                        </Text>
                </View>
                </>
        )
}

const styles = StyleSheet.create({
        titleHistorique: {
                fontWeight: "bold",
                color: '#0a5744',
                fontSize:15,
                marginHorizontal: 20,
                //marginHorizontal: 70
        },
        notfoundContainer: {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 95
         },
         notfoundImage: {
                width: "60%",
                height: "50%",
         },
         notfoundText: {
                marginTop: 20,
                fontWeight: 'bold',
                opacity: 0.6,
                fontSize: 16,
                textAlign: 'center',
                paddingHorizontal: 20
         }
})


  