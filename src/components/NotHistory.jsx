import React from "react";
import { StyleSheet, Text, Image, View } from "react-native";

export default function NotHistory(){
        return(
                <View style={styles.notfoundContainer}>
                        <Image source={require('../../assets/images/not-found.png')} style={styles.notfoundImage}/>
                        <Text style={styles.notfoundText}> 
                            Rendez vous invalide
                     </Text>  
                </View>
        )
}

const styles = StyleSheet.create({
        notfoundContainer: {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 25
         },
         notfoundImage: {
                width:60,
                height:60
         },
})