import React from "react";
import { View, Text, TouchableNativeFeedback, Image, StyleSheet} from 'react-native'
import NotFound from "../../components/NotFound";
import {Ionicons} from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
``
export default function NotFoundScreen(){
        const navigation = useNavigation()
        return(
                <>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignContent: "center", alignItems: "center", paddingHorizontal: 20, }}>
                                <TouchableNativeFeedback onPress={() => navigation.goBack()} useForeground>
                                        <View style={{ borderRadius: 50, padding: 10, overflow: 'hidden', opacity: 0.8, backgroundColor: '#F58424' }}>
                                                <Ionicons name="arrow-back-outline" size={24} color="#000" />
                                        </View>
                                </TouchableNativeFeedback>
                                <Text style={styles.titleHistorique}>
                                        Pas de rendez vous
                                </Text>
                        </View>
                <NotFound/>
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
})