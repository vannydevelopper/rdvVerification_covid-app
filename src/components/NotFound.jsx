import React from "react";
import { StyleSheet, Text, Image, View } from "react-native";

export default function NotFound(){
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
                marginBottom: 95
         },
         notfoundImage: {
                width: "40%",
                height: "40%",
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