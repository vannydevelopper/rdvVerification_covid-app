import React, { useState, useEffect, useRef } from 'react'
import { View, Text, StyleSheet, useWindowDimensions, TouchableOpacity, ScrollView, ImageBackground, TouchableNativeFeedback, Image, TouchableWithoutFeedback, ActivityIndicator, BackHandler } from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons, Ionicons, FontAwesome5, AntDesign, FontAwesome, Entypo, Foundation } from '@expo/vector-icons';
import { Button, Center, Icon, Input, useToast } from 'native-base';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as Location from 'expo-location'
import { manipulateAsync, FlipType, SaveFormat } from 'expo-image-manipulator';
import fetchApi from '../../helpers/fetchApi'
import moment from 'moment'
import { userSelector } from '../../store/selectors/userSelector';
import { useDispatch, useSelector } from "react-redux";
import * as Device from 'expo-device';
import { Fontisto } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
moment.updateLocale('fr', {
        calendar: {
                sameDay: "[Aujourd'hui]",
                lastDay: '[Hier]',
                nextDay: 'DD-M-YYYY',
                lastWeek: 'DD-M-YYYY',
                sameElse: 'DD-M-YYYY',
        },
})

export default function PhotoScreen() {
        const [imagepassport, setImagepassport] = useState(null)
        const [imagebordereaux, setImagebordereaux] = useState(null)
        const photoTypeSelectRef = useRef(null)
        const navigation = useNavigation()
        const route = useRoute()
        const [location, setLocation] = useState(null)
        const toast = useToast()
        const [isLoading, setIsLoading] = useState(false)

        const { donnees } = route.params

        const dispatch = useDispatch()
        const user = useSelector(userSelector)
        //console.log(user)

        let today = new Date();
        let datenow = moment(today).calendar(null, {})
        let date1 = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();

        const phone = Device.uniqueId
        console.log(phone)

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

        const sendData = async () => {
                setIsLoading(true)
                if (!location) {
                        let { status: locationStatus } = await Location.requestForegroundPermissionsAsync();
                        if (locationStatus !== 'granted') {
                                return setLoading(false)
                        }
                        var loc = await Location.getCurrentPositionAsync({});
                        setLocation(loc)
                }

                const form = new FormData()
                form.append('TEMPO_REQUERANT_ID', donnees.requerantRDV.TEMPO_REQUERANT_ID)
                form.append('LONGITUDE', location.coords.longitude)
                form.append('LATITUDE', location.coords.latitude)

                if (imagebordereaux) {
                        const manipResult = await manipulateAsync(
                                imagebordereaux.uri,
                                [
                                        { resize: { width: 500 } }
                                ],
                                { compress: 0.7, format: SaveFormat.JPEG }
                        );
                        let localUri = manipResult.uri;
                        let filename = localUri.split('/').pop();
                        let match = /\.(\w+)$/.exec(filename);
                        let type = match ? `image/${match[1]}` : `image`;
                        form.append('PHOTO_BRD', {
                                uri: localUri, name: filename, type
                        })

                }

                if (imagepassport) {
                        const manipResult = await manipulateAsync(
                                imagepassport.uri,
                                [
                                        { resize: { width: 500 } }
                                ],
                                { compress: 0.8, format: SaveFormat.JPEG }
                        );
                        let localUri = manipResult.uri;
                        let filename = localUri.split('/').pop();
                        let match = /\.(\w+)$/.exec(filename);
                        let type = match ? `image/${match[1]}` : `image`;
                        form.append('PHOTO_PRS', {
                                uri: localUri, name: filename, type
                        })

                }

                //console.log(form)

                try {
                        const data = await fetchApi("/historique/ajouter", {
                                method: "POST",
                                body: form

                        })
                        navigation.navigate("Home")
                        setIsLoading(false)
                        toast.show({
                                title: "L'enregistrement est faite avec succès",
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
                                title: "La connexion a echoue",
                                placement: "bottom",
                                status: 'success',
                                duration: 6000,
                                width: '90%',
                                minWidth: 300
                        })
                        setIsLoading(false)
                }
                setIsLoading(false)


        }

        const onTakePictureSelect = async () => {
                photoTypeSelectRef.current?.close()
                const photo = await ImagePicker.launchCameraAsync({
                        mediaTypes: ImagePicker.MediaTypeOptions.Images,
                        allowsMultipleSelection: true
                })
                if (!photo.cancelled) {
                        setImagepassport(photo)
                }
        }

        const onTakePictureBordereaux = async () => {
                photoTypeSelectRef.current?.close()
                const photo = await ImagePicker.launchCameraAsync({
                        mediaTypes: ImagePicker.MediaTypeOptions.Images,
                        allowsMultipleSelection: true
                })
                if (!photo.cancelled) {
                        setImagebordereaux(photo)
                }
        }

        const onCameraSelect = () => {
                photoTypeSelectRef.current?.open()
        }

        const onPhotoRemove = (photo) => {
                const newImages = imagepassport.filter(image => image.uri != photo.uri)
                setImages(newImages)

                const newImagesBorderaux = imagebordereaux.filter(image => image.uri != photo.uri)
                setImagebordereaux(newImagesBorderaux)
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
                        <ScrollView keyboardShouldPersistTaps={"handled"}>


                                <View style={styles.cardPrincipal}>
                                        <View style={styles.titleDetails}>
                                                <Text style={{ fontSize: 15, fontWeight: "bold" }}> Informations du voyageur</Text>
                                        </View>
                                        <View style={styles.ligne}></View>
                                        <View style={{ flexDirection: "row", alignContent: "center", alignItems: "center", marginTop: 5 }}>
                                                <View style={styles.cardImage}>
                                                        <FontAwesome5 name="user" size={24} color="#0a5744" />

                                                </View>
                                                <View style={{ marginLeft: 13 }}>
                                                        <Text style={styles.titleNom}>Identification</Text>
                                                        <Text style={styles.titleResponse}>{donnees.requerantRDV.NOM}  {donnees.requerantRDV.PRENOM}</Text>
                                                </View>
                                        </View>
                                        <View style={{ flexDirection: "row", alignContent: "center", alignItems: "center", marginTop: 5 }}>
                                                <View style={styles.cardImage}>
                                                        <MaterialCommunityIcons name="ski-cross-country" size={24} color="#0a5744" />

                                                </View>
                                                <View style={{ marginLeft: 13 }}>
                                                        <Text style={styles.titleNom}>Nationalité</Text>
                                                        <Text style={styles.titleResponse}>{donnees.requerantRDV.CommonName}</Text>
                                                </View>
                                        </View>
                                        <View style={{ flexDirection: "row", alignContent: "center", alignItems: "center", marginTop: 5 }}>
                                                <View style={styles.cardImage}>
                                                        <Fontisto name="passport-alt" size={24} color="#0a5744" />

                                                </View>
                                                <View style={{ marginLeft: 13 }}>
                                                        <Text style={styles.titleNom}>Document</Text>
                                                        <Text style={styles.titleResponse}>{donnees.requerantRDV.DOCUMENT_DESCR}</Text>
                                                </View>
                                        </View>

                                        <View style={{ flexDirection: "row", alignContent: "center", alignItems: "center", marginTop: 5 }}>
                                                <View style={styles.cardImage}>
                                                        <Fontisto name="passport-alt" size={24} color="#0a5744" />

                                                </View>
                                                <View style={{ marginLeft: 13 }}>
                                                        <Text style={styles.titleNom}>Numéro du document</Text>
                                                        <Text style={styles.titleResponse}>{donnees.requerantRDV.NUMERO_DOCUMENT}</Text>
                                                </View>
                                        </View>


                                        <View style={{ flexDirection: "row", alignContent: "center", alignItems: "center", marginTop: 5 }}>
                                                <View style={styles.cardImage}>
                                                        <AntDesign name="phone" size={24} color="#0a5744" />

                                                </View>
                                                <View style={{ marginLeft: 13 }}>
                                                        <Text style={styles.titleNom}>Téléphone</Text>
                                                        <Text style={styles.titleResponse}>{donnees.requerantRDV.TELEPHONE}</Text>
                                                </View>
                                        </View>
                                        <View style={{ flexDirection: "row", alignContent: "center", alignItems: "center", marginTop: 5 }}>
                                                <View style={styles.cardImage}>
                                                        <Entypo name="mail" size={24} color="#0a5744" />

                                                </View>
                                                <View style={{ marginLeft: 13 }}>
                                                        <Text style={styles.titleNom}>Adresse Email</Text>
                                                        <Text style={styles.titleResponse}>{donnees.requerantRDV.EMAIL}</Text>
                                                </View>

                                        </View>

                                        <View style={{ flexDirection: "row", alignContent: "center", alignItems: "center", marginTop: 5 }}>
                                                <View style={styles.cardImage}>
                                                        <AntDesign name="calendar" size={24} color="#0a5744" />

                                                </View>
                                                <View style={{ marginLeft: 13 }}>
                                                        <Text style={styles.titleNom}>Date de Naissance</Text>
                                                        <Text style={styles.titleResponse}>

                                                                {moment(donnees.requerantRDV.DATE_NAISSANCE).format('DD-MM-YYYY')}
                                                        </Text>
                                                </View>
                                        </View>



                                        <View style={{ flexDirection: "row", alignContent: "center", alignItems: "center", marginTop: 5 }}>
                                                <View style={styles.cardImage}>
                                                        <AntDesign name="calendar" size={24} color="#0a5744" />

                                                </View>
                                                <View style={{ marginLeft: 13 }}>
                                                        <Text style={styles.titleNom}>Date de Rendez-vous</Text>
                                                        <Text style={styles.titleResponse}>

                                                                {moment(donnees.requerantRDV.DATE_RENDEVOUS).format('DD-M-YYYY  HH:MM:SS')}
                                                        </Text>
                                                </View>
                                        </View>
                                </View>

                                {donnees.payement && <View style={styles.cardPrincipal}>
                                        <View style={styles.titleDetails}>
                                                <Text style={{ fontSize: 15, fontWeight: "bold" }}>{donnees.message}</Text>
                                        </View>
                                        <View style={styles.ligne}></View>
                                        <View style={{ flexDirection: "row", alignContent: "center", alignItems: "center", marginTop: 5 }}>
                                                <View style={styles.cardImage}>
                                                        <Entypo name="mail" size={24} color="#0a5744" />

                                                </View>
                                                <View style={{ marginLeft: 13 }}>
                                                        <Text style={styles.titleNom}>Adresse Email</Text>
                                                        <Text style={styles.titleResponse}>{donnees.payement.EMAIL_PAYE}</Text>
                                                </View>

                                        </View>

                                        <View style={{ flexDirection: "row", alignContent: "center", alignItems: "center", marginTop: 5 }}>
                                                <View style={styles.cardImage}>
                                                        <FontAwesome name="cc-visa" size={24} color="#0a5744" />

                                                </View>
                                                <View style={{ marginLeft: 13 }}>
                                                        <Text style={styles.titleNom}>Carte de Crédit</Text>
                                                        <Text style={styles.titleResponse}>{donnees.payement.CARTE_TYPE}</Text>
                                                </View>

                                        </View>


                                        <View style={{ flexDirection: "row", alignContent: "center", alignItems: "center", marginTop: 5 }}>
                                                <View style={styles.cardImage}>
                                                        <Foundation name="dollar-bill" size={24} color="#0a5744" />

                                                </View>
                                                <View style={{ marginLeft: 13 }}>
                                                        <Text style={styles.titleNom}>Montant</Text>
                                                        <Text style={styles.titleResponse}>{donnees.payement.MONTANT} {donnees.payement.DEVISE}</Text>
                                                </View>

                                        </View>

                                        <View style={{ flexDirection: "row", alignContent: "center", alignItems: "center", marginTop: 5 }}>
                                                <View style={styles.cardImage}>
                                                        <AntDesign name="calendar" size={24} color="#0a5744" />

                                                </View>
                                                <View style={{ marginLeft: 13 }}>
                                                        <Text style={styles.titleNom}>Date de payement</Text>
                                                        <Text style={styles.titleResponse}>
                                                                {moment(donnees.payement.DATE_INSERT_PAYEMENT).calendar(null, {
                                                                        sameDay: `[Aujourd'hui]`,
                                                                        lastDay: `[Hier]`,
                                                                        nextDay: 'DD-M-YYYY',
                                                                        lastWeek: 'DD-M-YYYY',
                                                                        sameElse: 'DD-M-YYYY',
                                                                })}
                                                                {moment(donnees.payement.DATE_INSERT_PAYEMENT).format('  HH:mm:ss')}
                                                        </Text>
                                                </View>

                                        </View>
                                </View>}


                                {(moment().isSame(moment(donnees.requerantRDV.DATE_RENDEVOUS), 'days')) ?
                                        <View style={{ flexDirection: "row", justifyContent: 'space-between', paddingHorizontal: 20 }}>
                                                <View style={{ flex: 1 }}>
                                                        <View>
                                                                <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
                                                                        <Text style={styles.image}>
                                                                                Photo du voyageur
                                                                        </Text>
                                                                        <Text style={styles.validation}>*</Text>
                                                                </View>
                                                        </View>
                                                        <View style={styles.addImageContainer}>
                                                                {!imagepassport ? <TouchableWithoutFeedback onPress={onTakePictureSelect}>
                                                                        <View style={{ ...styles.addImage }}>
                                                                                <Image source={require('../../../assets/images/man.png')} style={{ width: '60%', height: '60%' }} />
                                                                        </View>
                                                                </TouchableWithoutFeedback> :

                                                                        <TouchableWithoutFeedback onPress={onTakePictureSelect}>
                                                                                <View style={{ ...styles.addImage, borderWidth: 0 }} >
                                                                                        <Image source={{ uri: imagepassport.uri }} style={{ width: '100%', height: '100%', borderRadius: 5 }} />
                                                                                </View>
                                                                        </TouchableWithoutFeedback>}


                                                        </View>
                                                </View>

                                                {!donnees.payement && <View style={{ flex: 1 }}>

                                                        <View>
                                                                <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
                                                                        <Text style={styles.image}>
                                                                                Image du bordereau
                                                                        </Text>
                                                                        <Text style={styles.validation}>*</Text>
                                                                </View>
                                                        </View>
                                                        <View style={styles.addImageContainer}>
                                                                {!imagebordereaux ? <TouchableWithoutFeedback onPress={onTakePictureBordereaux}>
                                                                        <View style={{ ...styles.addImage }}>
                                                                                <Image source={require('../../../assets/images/documentIcon1.png')} style={{ width: '60%', height: '60%' }} />
                                                                        </View>
                                                                </TouchableWithoutFeedback> :

                                                                        <TouchableWithoutFeedback onPress={onTakePictureBordereaux}>
                                                                                <View style={{ ...styles.addImage, borderWidth: 0 }} >
                                                                                        <Image source={{ uri: imagebordereaux.uri }} style={{ width: '100%', height: '100%', borderRadius: 5 }} />
                                                                                </View>
                                                                        </TouchableWithoutFeedback>}


                                                        </View>
                                                </View>}
                                        </View> :
                                        <View style={styles.errorCard}>
                                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                                        <View style={{ ...styles.addImage2 }}>
                                                                <Image source={require('../../../assets/images/errors.png')} style={{ width: '70%', height: '70%' }} />
                                                        </View>
                                                        <View style={{ flex: 1 }}>
                                                                <Text style={{
                                                                        color: 'red', fontSize: 15,
                                                                        fontWeight: 'bold', textAlign: 'center'
                                                                }}>ATTENTION!!!!</Text>
                                                                <Text style={{ color: 'red', textAlign: "center" }}>
                                                                        Votre date de demamde de  rendez-vous ({moment(donnees.requerantRDV.DATE_RENDEVOUS).format('DD-M-YYYY')})
                                                                        ne correspond  pas à la date d'aujourd'hui({moment().format('DD-M-YYYY')})
                                                                </Text>
                                                        </View>
                                                </View>
                                        </View>
                                }
                        </ScrollView>
                        {(moment().isSame(moment(donnees.requerantRDV.DATE_RENDEVOUS), 'days')) &&
                                <Button
                                        borderRadius={15}
                                        isDisabled={imagepassport == null}
                                        isLoading={isLoading}
                                        onPress={sendData}
                                        marginHorizontal={20}
                                        mt={5}
                                        backgroundColor={"#0a5744"}
                                        py={3.5}
                                        _text={{ color: '#fff', fontWeight: 'bold' }}
                                >
                                        Enregistrer
                                </Button>}
                </>
        )
}

const styles = StyleSheet.create({

        addImageContainer: {
                flex: 1,
               // backgroundColor: 'blue'
        },
        addImage: {
                width: '80%',
                height: 130,
                borderRadius: 5,
                justifyContent: 'center',
                alignItems: 'center',
                borderColor: '#777',
                borderWidth: 1,
                alignSelf: 'center'
        },
        removeFavoritesBadge: {
                position: 'absolute',
                right: -8,
                top: -8,
                backgroundColor: '#F54748',
                width: 25,
                height: 25,
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
                alignContent: 'center',
                zIndex: 20
        },
        favBadgeText: {
                color: '#fff',
                fontSize: 25,
                marginTop: -13,
                fontWeight: 'bold'
        },
        cardPrincipal: {
                marginHorizontal: 20,
                padding: 10,
                backgroundColor: "#fff",
                borderRadius: 10,
                elevation: 8,
                borderWidth: 2,
                borderColor: "#fff",
                marginTop: 10,
                marginBottom: 10
        },
        ligne: {
                borderTopWidth: 1,

                marginVertical: 10,
                borderTopColor: "#F58424"
        },
        titleDetails: {
                justifyContent: "center",
                alignItems: "center",
        },
        cardImage: {
                width: 40,
                height: 40,
                backgroundColor: "#DCE4F7",
                borderRadius: 40,
                alignItems: "center",
                justifyContent: "center"
        },
        titleNom: {
                fontSize: 13,
                fontWeight: "bold"
        },
        validation: {
                fontSize: 22,
                color: "red",
                marginLeft: 2
        },
        titleResponse: {
                fontSize: 13,
                fontWeight: "bold",
                color: "#777"
        },
        titleHistorique: {
                fontWeight: "bold",
                color: '#0a5744',
                fontSize: 15,
                marginHorizontal: 20,
                //marginHorizontal: 70
        },
        errorCard: {
                marginHorizontal: 20,
                padding: 10,
                backgroundColor: "#fff",
                borderRadius: 10,
                elevation: 8,
                borderWidth: 2,
                borderColor: "#fff",
                marginTop: 10,
                marginBottom: 10
        },
        addImage2: {
                width: 60,
                height: 60,
                borderRadius: 5,
                justifyContent: 'center',
                alignItems: 'center',
                borderColor: '#777',
                borderWidth: 1
        },
        title: {

                fontWeight: 'bold',
                fontSize: 16,
                color: 'black',
                fontWeight: 'bold',
                //  marginTop: 10, 
                textAlign: "left"

        },
        image: {

                fontWeight: 'bold',
                fontSize: 14,
                color: 'black',
                fontWeight: 'bold',
                //  marginTop: 10, 
                textAlign: "center",
                alignSelf: 'center'

        }

})