import React from "react";
import { StyleSheet, Text, View, StatusBar, Image } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Button, Icon, Input, FormControl, WarningOutlineIcon } from 'native-base'


export default function ValidationScren() {
        const route = useRoute()
        const {donnees} = route.params
        console.log(donnees)

        const CreateCertificat = async () => {
        }
        return (
                <View style={{ flex: 1, backgroundColor: '#f1f1f1' }}>
                        <StatusBar backgroundColor="#ddd" barStyle="dark-content" />
                        <View style={styles.header}>
                                <View style={styles.imageContainer}>
                                        <Image source={require('../../../assets/login.png')} style={styles.image} />
                                        <Text style={{ fontSize: 16 }}>Validation des données de test</Text>
                                        <View style={{ marginTop: 10 }}>
                                                <Text style={{}}>Voulez-vous valider ces données ?</Text>
                                        </View>
                                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 15 }}>
                                                <Button
                                                        backgroundColor={"#F58424"} onPress={CreateCertificat}
                                                >
                                                        valider
                                                </Button>
                                                <View style={{ padding: 10 }}></View>
                                                <Button
                                                        backgroundColor={"#F58424"}
                                                >
                                                        Annuler
                                                </Button>
                                        </View>
                                </View>
                        </View>
                </View>
        )
}

const styles = StyleSheet.create({
        header: {
                marginVertical: "50%",
                justifyContent: "center",
                alignItems: "center",
                marginHorizontal: 10,
        },
        imageContainer: {
                backgroundColor: '#fff',
                padding: 10,
                width: '75%',
                alignSelf: 'center',
                height: 250,
                marginTop: 20,
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center'
        },
        image: {
                width: '50%',
                height: '50%',
        },
})