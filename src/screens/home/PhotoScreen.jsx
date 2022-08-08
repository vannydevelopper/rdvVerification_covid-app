import React, { useState, useEffect, useRef } from 'react'
import { View, Text, StyleSheet, useWindowDimensions, TouchableOpacity, ScrollView, ImageBackground, TouchableNativeFeedback, Image, TouchableWithoutFeedback, ActivityIndicator, BackHandler } from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons, Ionicons, FontAwesome5, AntDesign, FontAwesome, Entypo, Foundation } from '@expo/vector-icons';
import { Button, Icon, Input, FormControl, WarningOutlineIcon } from 'native-base'
import { useNavigation, useRoute } from '@react-navigation/native';
import moment from 'moment'
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

        const { donnees, ID_RDV } = route.params
        console.log(donnees, ID_RDV)


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
                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignContent: "center", alignItems: "center", paddingHorizontal: 20, }}>
                                <TouchableNativeFeedback onPress={() => navigation.goBack()} useForeground>
                                        <View style={{ borderRadius: 50, padding: 10, overflow: 'hidden', opacity: 0.8, backgroundColor: '#F58424' }}>
                                                <Ionicons name="arrow-back-outline" size={24} color="#000" />
                                        </View>
                                </TouchableNativeFeedback>
                                <Text style={styles.titleHistorique}>
                                        Details pour les prises de rendez vous
                                </Text>
                        </View>
                        <ScrollView keyboardShouldPersistTaps={"handled"}>

                                { donnees.payement && <View style={styles.cardPrincipal}>
                                        <View style={styles.titleDetails}>
                                                <Text style={{ fontSize: 15, fontWeight: "bold" }}>{donnees.message}</Text>
                                        </View>
                                        <View style={styles.ligne}></View>
                                        <View style={{ flexDirection: "row", alignContent: "center", alignItems: "center", marginTop: 5 }}>
                                                <View style={styles.cardImage}>
                                                        <FontAwesome5 name="user" size={24} color="#F58424" />

                                                </View>
                                                <View style={{ marginLeft: 13 }}>
                                                        <Text style={styles.titleNom}>Adresse Email</Text>
                                                        <Text style={styles.titleResponse}>{donnees.payement.EMAIL_PAYE}</Text>
                                                </View>

                                        </View>

                                        <View style={{ flexDirection: "row", alignContent: "center", alignItems: "center", marginTop: 5 }}>
                                                <View style={styles.cardImage}>
                                                        <FontAwesome name="cc-visa" size={24} color="#F58424" />

                                                </View>
                                                <View style={{ marginLeft: 13 }}>
                                                        <Text style={styles.titleNom}>Carte de Crédit</Text>
                                                        <Text style={styles.titleResponse}>{donnees.payement.CARTE_TYPE}</Text>
                                                </View>

                                        </View>
                                        <View style={{ flexDirection: "row", alignContent: "center", alignItems: "center", marginTop: 5 }}>
                                                <View style={styles.cardImage}>
                                                        <Entypo name="mail" size={24} color="#F58424" />

                                                </View>
                                                <View style={{ marginLeft: 13 }}>
                                                        <Text style={styles.titleNom}>Adresse de Payement</Text>
                                                        <Text style={styles.titleResponse}>{donnees.payement.COMPTE_SIBLE}</Text>
                                                </View>

                                        </View>

                                        <View style={{ flexDirection: "row", alignContent: "center", alignItems: "center", marginTop: 5 }}>
                                                <View style={styles.cardImage}>
                                                        <Foundation name="dollar-bill" size={24} color="#F58424" />

                                                </View>
                                                <View style={{ marginLeft: 13 }}>
                                                        <Text style={styles.titleNom}>Montant</Text>
                                                        <Text style={styles.titleResponse}>{donnees.payement.MONTANT} {donnees.payement.DEVISE}</Text>
                                                </View>

                                        </View>

                                        <View style={{ flexDirection: "row", alignContent: "center", alignItems: "center", marginTop: 5 }}>
                                                <View style={styles.cardImage}>
                                                        <AntDesign name="calendar" size={24} color="#F58424" />

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
                                                                {moment(donnees.payement.DATE_INSERT_PAYEMENT).format('  HH:mm')}
                                                        </Text>
                                                </View>

                                        </View>
                                </View>}

                                <View style={styles.cardPrincipal}>
                                        <View style={styles.titleDetails}>
                                                <Text style={{ fontSize: 15, fontWeight: "bold" }}>Details de l'utilisateur</Text>
                                        </View>
                                        <View style={styles.ligne}></View>
                                        <View style={{ flexDirection: "row", alignContent: "center", alignItems: "center", marginTop: 5 }}>
                                                <View style={styles.cardImage}>
                                                        <FontAwesome5 name="user" size={24} color="#F58424" />

                                                </View>
                                                <View style={{ marginLeft: 13 }}>
                                                        <Text style={styles.titleNom}>Nom et Prénom</Text>
                                                        <Text style={styles.titleResponse}>{donnees.requerantRDV.NOM}  {donnees.requerantRDV.PRENOM}</Text>
                                                </View>
                                        </View>


                                        <View style={{ flexDirection: "row", alignContent: "center", alignItems: "center", marginTop: 5 }}>
                                                <View style={styles.cardImage}>
                                                <AntDesign name="calendar" size={24} color="#F58424" />

                                                </View>
                                                <View style={{ marginLeft: 13 }}>
                                                        <Text style={styles.titleNom}>Date de Naissance</Text>
                                                        <Text style={styles.titleResponse}>
                                                                {moment(donnees.requerantRDV.DATE_NAISSANCE).calendar(null, {
                                                                        sameDay: `[Aujourd'hui]`,
                                                                        lastDay: `[Hier]`,
                                                                        nextDay: 'DD-M-YYYY',
                                                                        lastWeek: 'DD-M-YYYY',
                                                                        sameElse: 'DD-M-YYYY',
                                                                })}
                                                                {moment(donnees.requerantRDV.DATE_NAISSANCE).format('  HH:mm')}
                                                        </Text>
                                                </View>
                                        </View>

                                        <View style={{ flexDirection: "row", alignContent: "center", alignItems: "center", marginTop: 5 }}>
                                                <View style={styles.cardImage}>
                                                <FontAwesome5 name="user" size={24} color="#F58424" />

                                                </View>
                                                <View style={{ marginLeft: 13 }}>
                                                        <Text style={styles.titleNom}>Adresse Email</Text>
                                                        <Text style={styles.titleResponse}>{donnees.requerantRDV.EMAIL}</Text>
                                                </View>
                                        </View>

                                        <View style={{ flexDirection: "row", alignContent: "center", alignItems: "center", marginTop: 5 }}>
                                                <View style={styles.cardImage}>
                                                        <AntDesign name="phone" size={24} color="#F58424" />

                                                </View>
                                                <View style={{ marginLeft: 13 }}>
                                                        <Text style={styles.titleNom}>Numero de Téléphone</Text>
                                                        <Text style={styles.titleResponse}>{donnees.requerantRDV.TELEPHONE}</Text>
                                                </View>
                                        </View>
                                        <View style={{ flexDirection: "row", alignContent: "center", alignItems: "center", marginTop: 5 }}>
                                                <View style={styles.cardImage}>
                                                <AntDesign name="calendar" size={24} color="#F58424" />

                                                </View>
                                                <View style={{ marginLeft: 13 }}>
                                                        <Text style={styles.titleNom}>Date de Rendez vous</Text>
                                                        <Text style={styles.titleResponse}>
                                                                {moment(donnees.requerantRDV.DATE_RENDEVOUS).calendar(null, {
                                                                        sameDay: `[Aujourd'hui]`,
                                                                        lastDay: `[Hier]`,
                                                                        nextDay: 'DD-M-YYYY',
                                                                        lastWeek: 'DD-M-YYYY',
                                                                        sameElse: 'DD-M-YYYY',
                                                                })}
                                                                {moment(donnees.requerantRDV.DATE_RENDEVOUS).format('  HH:mm')}
                                                        </Text>
                                                </View>
                                        </View>
                                </View>
                                <View style={{ flexDirection: "row" }}>
                                        <View>
                                                <Text style={{ paddingHorizontal: 60, color: '#777', fontWeight: 'bold', marginTop: 10 }}>
                                                        images
                                                </Text>
                                                <View style={styles.addImageContainer}>
                                                        {!imagepassport ? <TouchableWithoutFeedback onPress={onTakePictureSelect}>
                                                                <View style={{ ...styles.addImage }}>
                                                                        <Image source={require('../../../assets/images/picture.png')} style={{ width: '50%', height: '50%' }} />
                                                                </View>
                                                        </TouchableWithoutFeedback> :

                                                                <TouchableWithoutFeedback onPress={onTakePictureSelect}>
                                                                        <View style={{ ...styles.addImage, borderWidth: 0 }} >
                                                                                <Image source={{ uri: imagepassport.uri }} style={{ width: '100%', height: '100%', borderRadius: 5 }} />
                                                                        </View>
                                                                </TouchableWithoutFeedback>}


                                                </View>
                                        </View>
                                        
                                       { ! donnees.payement && <View>
                                                <Text style={{ paddingHorizontal: 50, color: '#777', fontWeight: 'bold', marginTop: 10 }}>
                                                        Bordereaux
                                                </Text>
                                                <View style={styles.addImageContainer}>
                                                        {!imagebordereaux ? <TouchableWithoutFeedback onPress={onTakePictureBordereaux}>
                                                                <View style={{ ...styles.addImage }}>
                                                                        <Image source={require('../../../assets/images/picture.png')} style={{ width: '50%', height: '50%' }} />
                                                                </View>
                                                        </TouchableWithoutFeedback> :

                                                                <TouchableWithoutFeedback onPress={onTakePictureBordereaux}>
                                                                        <View style={{ ...styles.addImage, borderWidth: 0 }} >
                                                                                <Image source={{ uri: imagebordereaux.uri }} style={{ width: '100%', height: '100%', borderRadius: 5 }} />
                                                                        </View>
                                                                </TouchableWithoutFeedback>}


                                                </View>
                                        </View>}
                                </View>
                        </ScrollView>
                        <Button
                                borderRadius={15}
                                // isDisabled={email == "" || password == ""}
                                //onPress={handleLogin}
                                marginHorizontal={20}
                                mt={5}
                                backgroundColor={"#F58424"}
                                py={3.5}
                                _text={{ color: '#fff', fontWeight: 'bold' }}
                        >
                                Enregistrer
                        </Button>
                </>
        )
}

const styles = StyleSheet.create({

        addImageContainer: {
                paddingHorizontal: 20,
                marginTop: 5,
                flexDirection: 'row',
                alignItems: 'center'
        },
        addImage: {
                width: 137,
                height: 150,
                borderRadius: 5,
                justifyContent: 'center',
                alignItems: 'center',
                borderColor: '#777',
                borderWidth: 1
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
                marginTop: 2,
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
        titleResponse: {
                fontSize: 13,
                fontWeight: "bold",
                color: "#777"
        },
        titleHistorique: {
                fontWeight: "bold",
                color: '#F58424',
                fontSize: 12,
                marginHorizontal: 10
        },


})