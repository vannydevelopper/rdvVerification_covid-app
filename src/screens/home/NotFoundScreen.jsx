import React from "react";
import { View, Text, TouchableNativeFeedback, Image, StyleSheet} from 'react-native'
import NotFound from "../../components/NotFound";
import {Ionicons} from '@expo/vector-icons';
import { useNavigation, useRoute } from "@react-navigation/native";

export default function NotFoundScreen(){
        const navigation = useNavigation()
        const route = useRoute()
        const {donnees} = route.params
        return(
                <>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignContent: "center", alignItems: "center", paddingHorizontal: 20, }}>
                                <TouchableNativeFeedback onPress={() => navigation.goBack()} useForeground>
                                        <View style={{ borderRadius: 50, padding: 10, overflow: 'hidden', opacity: 0.8, backgroundColor: '#F58424' }}>
                                                <Ionicons name="arrow-back-outline" size={24} color="#000" />
                                        </View>
                                </TouchableNativeFeedback>
                                <Text style={styles.titleHistorique}>
                                        Rendez vous
                                </Text>
                        </View>
                <View style={styles.notfoundContainer}>
                        <Image source={require('../../../assets/images/errors.png')}  style={styles.notfoundImage}/>
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
                color: '#F58424',
                fontSize: 12,
                marginHorizontal: 10
        },
        notfoundContainer: {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 95
         },
         notfoundImage: {
                width: "35%",
                height: "35%",
                opacity: 0.6
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


  