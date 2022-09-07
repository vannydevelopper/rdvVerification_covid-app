import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, Text, View, StatusBar, Image } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Button, Icon, Input, FormControl, WarningOutlineIcon, useToast, ScrollView } from 'native-base'
import fetchApi from "../../helpers/fetchApi";
import * as WebBrowser from 'expo-web-browser';
import * as Location from 'expo-location'
import { useDispatch, useSelector } from "react-redux";
import { MaterialIcons, Ionicons, FontAwesome5, AntDesign, Fontisto, FontAwesome, Entypo, Foundation } from '@expo/vector-icons';
import { userSelector } from '../../store/selectors/userSelector';
import { Alert } from 'react-native-web';
import moment from 'moment'
moment.updateLocale('fr', {
        calendar: {

                nextDay: 'DD-MM-YYYY',
                lastWeek: 'DD-MM-YYYY',
                sameElse: 'DD-MM-YYYY',
        },
})
export default function ValidationScren() {
        const route = useRoute()
        const [location, setLocation] = useState(null)
        const { donnees } = route.params
        const toast = useToast()
        const navigation = useNavigation()
        const user = useSelector(userSelector)
        const [isLoading, setIsLoading] = useState(false)

        const cancel = () => navigation.navigate("Home");

        const askLocationPermission = async () => {
                let {
                        status: locationStatus,
                } = await Location.requestForegroundPermissionsAsync()
                if (locationStatus !== 'granted') {
                        console.log('Permission to access location was denied')
                        setLocation(false)
                        return
                }
                var location = await Location.getCurrentPositionAsync({})
                setLocation(location)
        }

        useEffect(() => {
                askLocationPermission()
        }, [])

        if (location === false) {
                return (
                        <View
                                style={{
                                        alignContent: 'center',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        flex: 1,
                                }}
                        >
                                <Text style={{ fontWeight: 'bold', fontSize: 16, opacity: 0.8 }}>
                                        Pas d'accès à la localisation
                                </Text>
                                <Text
                                        style={{
                                                textAlign: 'center',
                                                color: '#777',
                                                marginTop: 10,
                                                paddingHorizontal: 10,
                                        }}
                                >
                                        L'application a besoin de votre localisation pour fonctionner
                                </Text>
                                <TouchableNativeFeedback
                                        background={TouchableNativeFeedback.Ripple('#ddd')}
                                        useForeground={true}
                                        onPress={() => askLocationPermission()}
                                >
                                        <View
                                                style={{
                                                        backgroundColor: '#fff',
                                                        borderRadius: 10,
                                                        padding: 10,
                                                        marginTop: 20,
                                                }}
                                        >
                                                <Text>Autoriser l'accès</Text>
                                        </View>
                                </TouchableNativeFeedback>
                        </View>
                )
        }

        const CreateCertificat = async () => {
                if (!location) {
                        let { status: locationStatus } = await Location.requestForegroundPermissionsAsync();
                        if (locationStatus !== 'granted') {
                                return setLoading(false)
                        }
                        var loc = await Location.getCurrentPositionAsync({});
                        setLocation(loc)
                }
                const form = new FormData()
                form.append('latitude', location.coords.latitude)
                form.append('longitude', location.coords.longitude)
                form.append('user_id', user.user.USER_ID)
                // console.log(form)

                setIsLoading(true)
                try {
                        let resultat = await fetch(`https://app.mediabox.bi/covid_v2_dev/requerant/Voyageurs_es/edit_changer_mobile/${donnees.requerant_Id.REQUERANT_ID}`, {
                                method: "POST",
                                body: form



                        })

                        const data = await resultat.text()
                        console.log(data)
                        navigation.navigate("Home")
                        setIsLoading(false)
                        toast.show({
                                title: "La generation du certificat faite   avec succès",
                                placement: "bottom",
                                status: 'success',
                                duration: 6000,
                                width: '90%',
                                minWidth: 300
                        })
                }
                catch (error) {
                        console.log(error)
                        toast.show({
                                title: "Echec de generation certificat",
                                placement: "bottom",
                                status: 'success',
                                duration: 6000,
                                width: '90%',
                                minWidth: 300
                        })
                }
                setIsLoading(false)

        };


        return (
                <><ScrollView>



                        <StatusBar backgroundColor="#ddd" barStyle="dark-content" />
                        <View style={{ flex: 1, backgroundColor: '#f1f1f1', justifyContent: "center", alignItems: "center" }}>
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
                                                        <FontAwesome5 name="user" size={24} color="#0a5744" />

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
                                                        <Entypo name="mail" size={24} color="#0a5744" />

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
                                                        <FontAwesome name="phone" size={24} color="#0a5744" />
                                                </View>
                                                <View style={{ marginLeft: 13 }}>
                                                        <Text style={styles.titleNom}>Téléphone</Text>
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
                                                        <Fontisto name="passport-alt" size={24} color="#0a5744" />
                                                </View>
                                                <View style={{ marginLeft: 13 }}>
                                                        <Text style={styles.titleNom}>Document</Text>
                                                        <Text style={styles.titleResponse}>

                                                                {donnees.requerantRDV.DOCUMENT_DESCR}
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
                                                        <Fontisto name="passport-alt" size={24} color="#0a5744" />
                                                </View>
                                                <View style={{ marginLeft: 13 }}>
                                                        <Text style={styles.titleNom}>Numéro du document</Text>
                                                        <Text style={styles.titleResponse}>

                                                                {donnees.requerantRDV.NUMERO_DOCUMENT}
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
                                                        <AntDesign name="calendar" size={24} color="#0a5744" />
                                                </View>
                                                <View style={{ marginLeft: 13 }}>
                                                        <Text style={styles.titleNom}>Date prélèvement</Text>
                                                        <Text style={styles.titleResponse}>

                                                                {moment(donnees.requerantRDV.DATE_PRELEVEMENT).format('DD-MM-YYYY')}
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
                                                        <Foundation name="results" size={24} color="#0a5744" />
                                                </View>
                                                <View style={{ marginLeft: 13 }}>
                                                        {donnees.requerantRDV.REQUERANT_STATUT_ID == 5 ?
                                                                <Text style={[styles.titleNom, { color: 'red' }]}>Résultat</Text> : null}
                                                        {donnees.requerantRDV.REQUERANT_STATUT_ID == 5 ? <Text style={[styles.titleResponse, { color: "red" }]}>
                                                                Positif
                                                        </Text> : null}
                                                        {donnees.requerantRDV.REQUERANT_STATUT_ID == 12 ?
                                                                <Text style={[styles.titleNom, { color: 'green' }]}>Resultat</Text> : null}
                                                        {donnees.requerantRDV.REQUERANT_STATUT_ID == 12 ? <Text style={[styles.titleResponse, { color: "green" }]}>
                                                                Négatif
                                                        </Text> : null}
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
                                                        <FontAwesome5 name="user" size={24} color="#0a5744" />
                                                </View>
                                                <View style={{ marginLeft: 13 }}>
                                                        <Text style={styles.titleNom}>Laborantin</Text>
                                                        <Text style={styles.titleResponse}>

                                                                {user.user.USER_FNAME} {user.user.USER_LNAME}
                                                        </Text>
                                                </View>
                                        </View>
                                </View>
                                <View style={styles.header}>
                                        <Image source={require('../../../assets/login.png')} style={styles.image} />
                                        <Text style={{ fontSize: 16 }}>Validation des résultats  de test covid-19</Text>
                                        <View style={{ marginTop: 10 }}>
                                                <Text style={{}}>Voulez-vous valider ces resultats ?</Text>
                                        </View>
                                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 15 }}>




                                                <Button
                                                        // backgroundColor={"#ddd"}
                                                        onPress={cancel}

                                                >
                                                        Annuler
                                                </Button>
                                                <View style={{ padding: 10 }}></View>
                                                <Button
                                                        isLoading={isLoading}
                                                        backgroundColor={"#0a5744"} onPress={CreateCertificat}
                                                >
                                                        valider
                                                </Button>
                                        </View>
                                </View>
                        </View>
                </ScrollView>
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