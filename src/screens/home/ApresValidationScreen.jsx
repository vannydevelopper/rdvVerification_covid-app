import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, Text, View, StatusBar,TouchableNativeFeedback, Modal, Image, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Button, Icon, Input, FormControl, WarninrgOutlineIcon, useToast, ScrollView } from 'native-base'
import fetchApi from "../../helpers/fetchApi";
import * as WebBrowser from 'expo-web-browser';
import * as Location from 'expo-location'
import { useDispatch, useSelector } from "react-redux";
import { MaterialIcons, Ionicons, FontAwesome5, AntDesign, MaterialCommunityIcons, Fontisto, FontAwesome, Entypo, Foundation } from '@expo/vector-icons';
import { userSelector } from '../../store/selectors/userSelector';
import { Alert } from 'react-native-web';
import moment from 'moment'
import ImageViewer from 'react-native-image-zoom-viewer';
moment.updateLocale('fr', {
        calendar: {

                nextDay: 'DD-MM-YYYY',
                lastWeek: 'DD-MM-YYYY',
                sameElse: 'DD-MM-YYYY',
        },
})
export default function ApresValidationScren() {
        const route = useRoute()
        const [location, setLocation] = useState(null)
        const { donnees } = route.params
        // console.log(donnees)
        const toast = useToast()
        const navigation = useNavigation()
        const [showImageModal, setShowImageModal] = useState(false)
        const [imageIndex, setImageIndex] = useState(0)
        const user = useSelector(userSelector)
        const [isLoading, setIsLoading] = useState(false)

        const cancel = () => navigation.navigate("Home");
        const isProd = false
        const bordereauPath = isProd ? "https://app.mediabox.bi/covid_v2_dev/uploads/image_bordereau/" : "http://192.168.43.84:8000/images/photo_brd/"
        const candidatPath = isProd ? "https://app.mediabox.bi/covid_v2_dev/uploads/image_candidat/" : "http://192.168.43.84:8000/images/photo_prs/"

        var imageUrls = []

        if (donnees.requerantRDV.PATH_PASSEPORT) imageUrls.push(`${candidatPath}${donnees.requerantRDV.PATH_PASSEPORT}`)
        if (donnees.requerantRDV.PATH_BORDEREAU) imageUrls.push(`${bordereauPath}${donnees.requerantRDV.PATH_BORDEREAU}`)

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




        return (
                <>     
                <View style={{ flexDirection: "row", paddingHorizontal: 20 }}>
                        <TouchableNativeFeedback onPress={() => navigation.goBack()} useForeground>
                                <View style={{ borderRadius: 50, padding: 10, overflow: 'hidden', opacity: 0.8, backgroundColor: '#0a5744' }}>
                                        <Ionicons name="arrow-back-outline" size={24} color="#000" />
                                </View>
                        </TouchableNativeFeedback>
                        <View style={{ justifyContent: "center", alignItems: "center", alignSelf: "center" }}>
                                        <Text style={styles.titleHistorique}>
                                        {user.user.USER_FNAME} {user.user.USER_LNAME}
                                        </Text>
                                </View>
                </View>
                        <ScrollView>
                                <StatusBar backgroundColor="#ddd" barStyle="dark-content" />

                                <View style={styles.ligne}></View>
                                <View style={{ backgroundColor: '#f1f1f1', justifyContent: "center", alignItems: "center" }}>
                                        <View style={styles.titleDetails}>
                                                <Text style={{ fontSize: 15, fontWeight: "bold" }}> Informations du voyageur</Text>
                                        </View>
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
                                                                <AntDesign name="calendar" size={24} color="#0a5744" />
                                                        </View>
                                                        <View style={{ marginLeft: 13 }}>
                                                                <Text style={styles.titleNom}>Date rendez-vous</Text>
                                                                <Text style={styles.titleResponse}>

                                                                        {moment(donnees.requerantRDV.DATE_RENDEVOUS).format('DD-MM-YYYY HH:mm:ss')}
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
                                                                <MaterialCommunityIcons name="ski-cross-country" size={24} color="#0a5744" />

                                                        </View>
                                                        <View style={{ marginLeft: 13 }}>

                                                                <Text style={styles.titleNom}>Nationalité</Text>

                                                                <Text style={styles.titleResponse}>

                                                                        {donnees.requerantRDV.CommonName}
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





                                        </View>




                                        <View style={styles.titleDetails}>
                                                <Text style={{ fontSize: 15, fontWeight: "bold" }}>Prélèvement du voyageur</Text>
                                        </View>

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
                                                                <AntDesign name="calendar" size={24} color="#0a5744" />
                                                        </View>
                                                        <View style={{ marginLeft: 13 }}>
                                                                <Text style={styles.titleNom}>Date prélèvement</Text>
                                                                <Text style={styles.titleResponse}>

                                                                        {moment(donnees.requerantRDV.DATE_PRELEVEMENT).format('DD-MM-YYYY HH:mm:ss')}
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
                                                                <FontAwesome5 name="user" size={24} color="#0a5744" />
                                                        </View>
                                                        <View style={{ marginLeft: 13 }}>
                                                                <Text style={styles.titleNom}>Laborantin</Text>
                                                                <Text style={styles.titleResponse}>

                                                                        {donnees.requerantRDV.USER_FNAME} {donnees.requerantRDV.USER_LNAME}
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
                                                                <Fontisto name="laboratory" size={24} color="#0a5744" />
                                                        </View>
                                                        <View style={{ marginLeft: 13 }}>
                                                                <Text style={styles.titleNom}>Laboratoire</Text>
                                                                <Text style={styles.titleResponse}>

                                                                        {donnees.requerantRDV.STRUCTURE_NOM}
                                                                </Text>
                                                        </View>
                                                </View>
                                                <View style={styles.imagePrincipal}>

                                                        <Text style={styles.titleImages}>Image du candidat</Text>
                                                        {donnees.requerantRDV.PATH_PASSEPORT != null && <TouchableOpacity activeOpacity={0.8} onPress={() => {
                                                                setImageIndex(0)
                                                                setShowImageModal(true)
                                                        }}>
                                                                <Image source={{ uri: `${candidatPath}${donnees.requerantRDV.PATH_PASSEPORT}` }} style={styles.DetaImage} />
                                                        </TouchableOpacity>}

                                                        {donnees.requerantRDV.PATH_BORDEREAU != null &&
                                                                <>
                                                                        <Text style={styles.titleImages}>Image du bordereau</Text>
                                                                        <TouchableOpacity activeOpacity={0.8} onPress={() => {
                                                                                setImageIndex(1)
                                                                                setShowImageModal(true)
                                                                        }}>
                                                                                <Image source={{ uri: `${bordereauPath}${donnees.requerantRDV.PATH_BORDEREAU}` }} style={styles.DetaImage} />
                                                                        </TouchableOpacity>
                                                                </>}
                                                </View>



                                        </View>



                                        <View style={styles.titleDetails}>
                                                <Text style={{ fontSize: 15, fontWeight: "bold" }}>Résultat / Validation</Text>
                                        </View>
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
                                                                <Text style={styles.titleNom}>Laborantin</Text>
                                                                <Text style={styles.titleResponse}>

                                                                        {donnees.requerantRDV.USER_FNAME} {donnees.requerantRDV.USER_LNAME}
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
                                                                <Fontisto name="laboratory" size={24} color="#0a5744" />
                                                        </View>
                                                        <View style={{ marginLeft: 13 }}>
                                                                <Text style={styles.titleNom}>Laboratoire</Text>
                                                                <Text style={styles.titleResponse}>

                                                                        {donnees.requerantRDV.STRUCTURE_NOM}
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
                                                                {donnees.requerantRDV.RESULTAT_ID == 5 ?
                                                                        <Text style={[styles.titleNom, { color: 'red' }]}>Résultat</Text> : null}
                                                                {donnees.requerantRDV.RESULTAT_ID == 5 ? <Text style={[styles.titleResponse, { color: "red" }]}>
                                                                        Positif
                                                                </Text> : null}
                                                                {donnees.requerantRDV.RESULTAT_ID == 12 ?
                                                                        <Text style={[styles.titleNom, { color: 'green' }]}>Resultat</Text> : null}
                                                                {donnees.requerantRDV.RESULTAT_ID == 12 ? <Text style={[styles.titleResponse, { color: "green" }]}>
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
                                                                <AntDesign name="calendar" size={24} color="#0a5744" />
                                                        </View>
                                                        <View style={{ marginLeft: 13 }}>
                                                                <Text style={styles.titleNom}>Date résultat</Text>
                                                                <Text style={styles.titleResponse}>

                                                                        {moment(donnees.requerantRDV.DATE_RESULTAT).format('DD-MM-YYYY HH:mm:ss')}
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
                                                                <Text style={styles.titleNom}>Date Validation résultat</Text>
                                                                <Text style={styles.titleResponse}>

                                                                        {moment(donnees.requerantRDV.DATE_VALIDATION_RESULTAT).format('DD-MM-YYYY HH:mm:ss')}
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
                                                                <Text style={styles.titleNom}>Date  téléchargement certificat</Text>
                                                                <Text style={styles.titleResponse}>

                                                                        {moment(donnees.requerantRDV.DATE_TELECHARGEMENT_CERTIFICAT).format('DD-MM-YYYY HH:mm:ss')}
                                                                </Text>
                                                        </View>
                                                </View>



                                        </View>


                                </View>



                        </ScrollView>
                        <Modal visible={showImageModal} transparent={true} onRequestClose={() => setShowImageModal(false)}>
                                <ImageViewer
                                        renderHeader={() => {
                                                return (
                                                        <View style={{ padding: 20, width: '100%', position: 'absolute', zIndex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', flexDirection: 'row', alignItems: 'center' }}>
                                                                <TouchableOpacity onPress={() => setShowImageModal(false)}>
                                                                        <View style={styles.tBtn}>
                                                                                <Ionicons name="arrow-back-outline" size={24} color="#fff" />
                                                                        </View>
                                                                </TouchableOpacity>
                                                                <Text style={{ color: '#fff', marginLeft: 20, opacity: 0.8 }}>Images</Text>
                                                        </View>
                                                )
                                        }}
                                        index={imageIndex}
                                        renderIndicator={() => <Text></Text>}
                                        loadingRender={() => <Text>loading image</Text>}
                                        imageUrls={imageUrls.map(image => ({ url: image }))}
                                        enableSwipeDown={true}
                                        onSwipeDown={() => setShowImageModal(false)}
                                        onCancel={() => setShowImageModal(false)}
                                        saveToLocalByLongPress={false}
                                        enablePreload={true}
                                        swipeDownThreshold={100}
                                />
                        </Modal>
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
        titleHistorique: {
                fontWeight: "bold",
                color: '#0a5744',
                fontSize: 15,
                marginHorizontal: 20,
                //marginHorizontal: 70
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
        titleImages: {
                fontSize: 15,
                fontWeight: "bold",
                marginBottom: 10,
                textAlign: 'center'
        },
        imagePrincipal: {
                paddingHorizontal: 10,
                marginTop: 15
        },
        titleImages: {
                fontSize: 15,
                fontWeight: "bold",
                marginBottom: 10,
                textAlign: 'center'
        },
        DetaImage: {
                minHeight: 250,
                maxHeight: 250,
                marginBottom: 20,
                borderRadius: 5
        },
        titleDetails: {
                justifyContent: "center",
                alignItems: "center",
                marginTop: 15,
                borderBottomColor: "#ddd",

        },
})