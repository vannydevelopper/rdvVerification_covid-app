import React from "react";
import { StyleSheet, Text, View, StatusBar, Image } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Button, Icon, Input, FormControl, WarningOutlineIcon } from 'native-base'
import fetchApi from "../../helpers/fetchApi";
import { MaterialIcons, Ionicons, FontAwesome5, AntDesign, FontAwesome, Entypo, Foundation } from '@expo/vector-icons';

export default function ValidationScren() {
        const route = useRoute()
        const { donnees } = route.params
        // console.log(donnees.requerant_Id.REQUERANT_ID)

        const CreateCertificat = async () => {
                try {
                        const generation = await fetchApi(`https://app.mediabox.bi/covid_v2_dev/requerant/Voyageurs_es/edit_changer/${donnees.requerant_Id.REQUERANT_ID}`, {
                                method: 'POST',
                                headers: { "Content-Type": "application/json" },
                        })
                }
                catch (error) {
                        console.log(error)
                }
        }

        return (
                <>



                                <StatusBar backgroundColor="#ddd" barStyle="dark-content" />
                        <View style={{ flex: 1, backgroundColor: '#f1f1f1', justifyContent:"center" ,alignItems:"center"}}>
                                <View style={styles.requerant}>
                                        <View
                                                style={{
                                                        flexDirection: 'row',
                                                        alignContent: 'center',
                                                        alignItems: 'center',
                                                        marginTop: 5,
                                                }}
                                        >
                                                <View style={styles.cardImage}>
                                                        <FontAwesome5 name="user" size={24} color="#F58424" />

                                                </View>
                                                <View style={{ marginLeft: 13 }}>
                                                        <Text style={styles.titleNom}>Nom et Prénom</Text>

                                                        <Text style={styles.titleResponse}>

                                                                {donnees.requerantRDV.NOM}{' '} {donnees.requerantRDV.PRENOM}
                                                        </Text>
                                                </View>
                                        </View>
                                        <View
                                                style={{
                                                        flexDirection: 'row',
                                                        alignContent: 'center',
                                                        alignItems: 'center',
                                                        marginTop: 5,
                                                }}
                                        >


                                                <View style={styles.cardImage}>
                                                        <Entypo name="mail" size={24} color="#F58424" />

                                                </View>
                                                <View style={{ marginLeft: 13 }}>

                                                        <Text style={styles.titleNom}>Email</Text>

                                                        <Text style={styles.titleResponse}>

                                                                {donnees.requerantRDV.EMAIL}
                                                        </Text>
                                                </View>
                                        </View>
                                        <View
                                                style={{
                                                        flexDirection: 'row',
                                                        alignContent: 'center',
                                                        alignItems: 'center',
                                                        marginTop: 5,
                                                }}
                                        >
                                                <View style={styles.cardImage}>
                                                        <FontAwesome name="phone" size={24} color="#F58424" />
                                                </View>
                                                <View style={{ marginLeft: 13 }}>
                                                        <Text style={styles.titleNom}>Telephone</Text>
                                                        <Text style={styles.titleResponse}>

                                                                {donnees.requerantRDV.TELEPHONE}
                                                        </Text>
                                                </View>
                                        </View>
                                        <View
                                                style={{
                                                        flexDirection: 'row',
                                                        alignContent: 'center',
                                                        alignItems: 'center',
                                                        marginTop: 5,
                                                }}
                                        >
                                                <View style={styles.cardImage}>
                                                        <FontAwesome name="phone" size={24} color="#F58424" />
                                                </View>
                                                <View style={{ marginLeft: 13 }}>
                                                        <Text style={styles.titleNom}>Document</Text>
                                                        <Text style={styles.titleResponse}>

                                                                {donnees.requerantRDV.DOCUMENT_DESCR}
                                                        </Text>
                                                </View>
                                        </View>
                                </View>
                                <View style={styles.header}>
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
                </>
        )
}

const styles = StyleSheet.create({
        header: {
                backgroundColor: '#fff',
                padding: 10,
                width: '90%',
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
                marginBottom: 10
        },
        requerant:
        {
                backgroundColor: "#ffff",
                width: "90%",
                alignSelf: "center",
                padding: 10,
                borderRadius: 10,
                marginTop: 20,




        },
        titleNom: {
                fontSize: 15,
                fontWeight: "bold"
        },
        cardImage: {
                width: 40,
                height: 40,
                backgroundColor: "#DCE4F7",
                borderRadius: 40,
                alignItems: "center",
                justifyContent: "center"
        },
})