import React from "react";
import { View, Text, TouchableNativeFeedback, Image, StyleSheet } from 'react-native'

export default function ApresValidationScreen() {

    return (
        <View style={styles.errorCard}>
            <View style={{ ...styles.addImage2 }}>
                <Image source={require('../../../assets/images/errors.png')}  style={{ width: '70%', height: '70%' ,justifyContent:"center",alignItems:"center"}} />
            </View>

            <Text style={{
                color: 'red', fontSize: 15,
                fontWeight: 'bold', textAlign: 'center'
            }}>ATTENTION!!!!</Text>
            <Text style={{ color: 'red', textAlign: "center" }} >Cet certificat est déjà validé</Text>

        </View> 




    )

}
const styles = StyleSheet.create({
    errorCard: {
        marginHorizontal: 20,
        padding: 10,
        backgroundColor: "#fff",
        borderRadius: 10,
        elevation: 8,
        borderWidth: 2,
        borderColor: "#fff",
        marginTop: 50,
        marginBottom: 20
    },
    
})

