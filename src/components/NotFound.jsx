import React from "react";
import { StyleSheet, Text, Image, View } from "react-native";

export default function NotFound() {
        return (<>
                <View style={styles.notfoundContainer}>
                        <Image source={require('../../assets/images/not-found.png')} style={styles.notfoundImage} />

                </View>
                <Text style={styles.textNotfound}>Pas d'historiques</Text>
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
        notfoundImage: {
                width: 170,
                height: 170,
                opacity: 0.6
        },
        textNotfound: {
                marginTop: -70,
                fontWeight: 'bold',
                opacity: 0.6,
                fontSize: 16,
                textAlign: 'center',
                paddingHorizontal: 20
        }

})