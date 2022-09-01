import React from "react";
import { View, Text, TouchableNativeFeedback, Image, StyleSheet } from 'react-native'

export default function ApresValidationScreen() {

    return (
        <>
            <View style={styles.notfoundContainer}>
                <Image source={require('../../../assets/images/errors1.png')} style={{ width: '70%', height: '70%',resizeMode:"center", justifyContent: "center", alignItems: "center" }} />



                <Text style={{ color: 'red', textAlign: "center",fontSize:15 }} >Ce rendez-vous a été traité avec success </Text>
            </View>
        </>




    )

}
const styles = StyleSheet.create({

    notfoundContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        //marginBottom: 95
        marginVertical: 180
    },

})

