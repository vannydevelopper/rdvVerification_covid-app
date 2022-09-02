import React, { useEffect, useRef, useState } from "react";
import { ScrollView, StyleSheet, BackHandler, TouchableNativeFeedback, Animated, TouchableOpacity, TouchableWithoutFeedback, StatusBar, Text, View } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker'
import { Entypo, FontAwesome5, AntDesign, Fontisto, MaterialCommunityIcons, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { Host, Portal } from 'react-native-portalize';

import { Modalize } from "react-native-modalize";
import { Button, Icon, Input, FormControl, WarningOutlineIcon, useToast } from 'native-base'
import useFetch from "../../hooks/useFetch";
import { useNavigation, useRoute } from "@react-navigation/native";
import fetchApi from "../../helpers/fetchApi";
import * as Location from 'expo-location'
import moment from 'moment'
moment.updateLocale('fr', {
        calendar: {

                nextDay: 'DD-MM-YYYY',
                lastWeek: 'DD-MM-YYYY',
                sameElse: 'DD-MM-YYYY',
        },
})

export default function ResultatTestSCreens() {
        const [commentaire, SetCommentaire] = useState("")
        const typeRef = useRef(null)
        const [location, setLocation] = useState(null)
        const resultatRef = useRef(null)
        const testRef = useRef(null)
        const [resultat, setResultat] = useState(null)
        const [isLoading, setIsLoading] = useState(false)
        const toast = useToast()
        const route = useRoute()
        const navigation = useNavigation()
        const { donnees } = route.params
        //console.log(donnees.requerantRDV.DATE_PRELEVEMENT)
        //recuperation des dates
        // const [mydate, setDate] = useState(new Date());
        // const [displaymode, setMode] = useState('date');
        // const [isDisplayDate, setShow] = useState(false);
        // const changeSelectedDate = (event, selectedDate) => {
        //         const currentDate = selectedDate || mydate;
        //         setShow(Platform.OS === "ios");
        //         setDate(currentDate);

        // };
        // const showMode = (currentMode) => {
        //         setShow(true);
        //         setMode(currentMode);
        // };
        // const displayDatepicker = () => {
        //         showMode('date');
        // };


        //recuperation des dates
        const [myNewdate, setmyNewdate] = useState(new Date());
        const [displaymodetype, setModeType] = useState('date');
        const [isDisplayDateNew, setShowNew] = useState(false);
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

        const changeSelectedDateNew = (event, selectedDateNew) => {
                const currentDate = selectedDateNew || mydate;
                setShowNew(Platform.OS === "ios");
                setmyNewdate(currentDate);

        };
        const showModeNew = (currentMode) => {
                setShowNew(true);
                setModeType(currentMode);null
        };
        const displayDatepickerNew = () => {
                showModeNew('date');
        };

        const [selectedTests, setselectedTests] = useState(null)
        const [selectedResultat, setSelectedResultat] = useState(null)
        const [selectedEchantillion, setSelectedEchantillion] = useState(null)
        const [selectedMethode, setSelectedMethode] = useState(null)


        const [loading, typeTests] = useFetch(`/type/afficher/${selectedMethode?.METHODE_TEST_ID}`)
        //const [loading2, typeResultats] = useFetch("/resultat/afficher")
        const [loading3, typeEchantillions] = useFetch(`/echantillon/afficher/${selectedMethode?.METHODE_TEST_ID}`)
        const [loading4, methodeTests] = useFetch("/test/afficher")
        //Selection du methode par defaut
        useEffect(() => {
                if (!loading4) {
                        const defautmethode = methodeTests.find(methode => methode.METHODE_TEST_ID == 1)
                        setSelectedMethode(defautmethode)
                }

        }, [methodeTests])


        const CreateResultat = async () => {
                if (!location) {
                        let { status: locationStatus } = await Location.requestForegroundPermissionsAsync();
                        if (locationStatus !== 'granted') {
                                return setLoading(false)
                        }
                        var loc = await Location.getCurrentPositionAsync({});
                        setLocation(loc)
                }
                setIsLoading(true)
                try {
                        const data = await fetchApi("/resultats", {
                                method: "POST",
                                body: JSON.stringify(
                                        {
                                                METHODE_ID: selectedMethode.METHODE_TEST_ID,
                                                DATE_PRELEVEMENT: moment(donnees.requerantRDV.DATE_PRELEVEMENT).format('YYYY/MM/DD HH:mm:ss'),
                                                DATE_RECEPTION:moment(myNewdate).format("YYYY/MM/DD"),
                                                TYPE_ECHANTILLON_ID: selectedEchantillion.TYPE_ECHANTILLON_ID,
                                                TYPE_TEST_ID: selectedTests.TYPE_TEST_ID,
                                                RESULTAT_ID:resultat,
                                                LATITUDE: location?.coords?.latitude,
                                                LONGITUDE: location?.coords?.longitude,
                                                CONCLUSION:commentaire,
                                                TEMPO_REQUERANT_ID: donnees.requerantRDV.TEMPO_REQUERANT_ID,
                                                COMMENT: commentaire,
                                                REQUERANT_STATUT_ID:resultat
                                        }
                                ),
                                headers: { "Content-Type": "application/json" },
                        });
                   
                        navigation.navigate("Home")
                        setIsLoading(false)
                        toast.show({
                                title: "L'enregistrement est faite avec succes",
                                placement: "bottom",
                                status: 'success',
                                duration: 2000,
                                width: '90%',
                                minWidth: 300
                        })

                }

                catch (error) {
                        console.log(error)
                        toast.show({
                                title: "L'enregistrement a echoue",
                                placement: "bottom",
                                status: 'success',
                                duration: 2000,
                                width: '90%',
                                minWidth: 300
                        })
                }
                setIsLoading(false)

        }

        const onTestSelect = (test) => {
                setselectedTests(test)
                testRef.current.close()
        }

        //types de resultat
        const onResultatSelect = (resultat) => {
                setSelectedResultat(resultat)
                resultatRef.current.close()
        }

        //types echantillions
        const onEchantillionSelect = (echantillion) => {
                setSelectedEchantillion(echantillion)
                typeRef.current.close()
        }

        //check methode
        const onCheckSelect = (methode) => {
                setSelectedMethode(methode)
                setSelectedEchantillion(null)
                setselectedTests(null)
                setSelectedResultat(null)



        }


        const TypesModalize = () => {
                return (
                        <View style={styles.modalContent}>
                                <View style={styles.modalList}>
                                        {typeEchantillions.map((echantillion, index) => {
                                                return (
                                                        <TouchableNativeFeedback key={index} onPress={() => onEchantillionSelect(echantillion)}>
                                                                <View style={styles.modalItem} >
                                                                        {selectedEchantillion?.TYPE_ECHANTILLON_ID == echantillion.TYPE_ECHANTILLON_ID ? <MaterialCommunityIcons name="radiobox-marked" size={24} color="#007bff" /> :
                                                                                <MaterialCommunityIcons name="radiobox-blank" size={24} color="#777" />
                                                                        }

                                                                        <Text numberOfLines={1} style={{...styles.modalText, marginLeft:5}}>{echantillion.DESCRIPTION}</Text>
                                                                </View>
                                                        </TouchableNativeFeedback>
                                                )
                                        })}
                                </View>
                        </View>
                )
        }

        const ResultatModalize = () => {
                return (
                        <View style={styles.modalContent}>
                                <View style={styles.modalList}>

                                        <TouchableNativeFeedback onPress={() => {
                                                setResultat(5)
                                                resultatRef.current.close()
                                        }} >

                                                <View style={styles.modalItem}>
                                                        {resultat == 5 ? <MaterialCommunityIcons name="radiobox-marked" size={24} color="#007bff" /> :
                                                                <MaterialCommunityIcons name="radiobox-blank" size={24} color="#777" />}
                                                        <Text numberOfLines={1} style={{...styles.modalText, marginLeft:7}}>Positif</Text>
                                                </View>
                                        </TouchableNativeFeedback>
                                        <TouchableNativeFeedback onPress={() => {
                                                setResultat(12)
                                                resultatRef.current.close()
                                        }}>
                                                <View style={styles.modalItem}>
                                                        {resultat == 12 ? <MaterialCommunityIcons name="radiobox-marked" size={24} color="#007bff" /> :
                                                                <MaterialCommunityIcons name="radiobox-blank" size={24} color="#777" />}
                                                        <Text numberOfLines={1} style={{...styles.modalText, marginLeft:7}}>Negatif</Text>
                                                </View>
                                        </TouchableNativeFeedback>


                                </View>
                        </View>
                )
        }

       // console.log(resultat)
        const Test = () => {
                return (
                        <View style={styles.modalContent}>
                                <View style={styles.modalList}>
                                        {typeTests.map((test, index) => {
                                                return (
                                                        <TouchableNativeFeedback key={index} onPress={() => onTestSelect(test)}>
                                                                <View style={styles.modalItem} >
                                                                        {selectedTests?.TYPE_TEST_ID == test.TYPE_TEST_ID ? <MaterialCommunityIcons name="radiobox-marked" size={24} color="#007bff" /> :
                                                                                <MaterialCommunityIcons name="radiobox-blank" size={24} color="#777" />}
                                                                        <Text numberOfLines={1} style={{...styles.modalText, marginLeft:5}}>{test.DESCRIPTION}</Text>
                                                                </View>
                                                        </TouchableNativeFeedback>
                                                )
                                        })}
                                </View>
                        </View>
                )
        }

        return (

                <View style={{ marginBottom: 20 }}>
                        <ScrollView>
                                <>
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
                                        </View>
                                        <View style={styles.ligne}></View>
                                        <View style={styles.container}>
                                                <View style={styles.cardPrincipal}>
                                                        {methodeTests.map((methode, index) => {
                                                                return (
                                                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} key={index}>
                                                                                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                                                                        <TouchableWithoutFeedback onPress={() => onCheckSelect(methode)}>
                                                                                                <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 15 }} >
                                                                                                        {selectedMethode?.METHODE_TEST_ID == methode.METHODE_TEST_ID ? <MaterialCommunityIcons name="radiobox-marked" size={20} color="#007bff" style={{ marginLeft: -7 }} /> :
                                                                                                                <MaterialCommunityIcons name="radiobox-blank" size={20} color="#777" style={{ marginLeft: -7 }} />}
                                                                                                        <Text style={{...styles.title, color: "#777" }}>{methode.DESCRIPTION}</Text>
                                                                                                </View>
                                                                                        </TouchableWithoutFeedback>
                                                                                </View>
                                                                        </View>
                                                                )
                                                        })}
                                                        <View style={styles.formGroup}>
                                                                <View style={{flexDirection:"row"}}>
                                                                <Text style={styles.title}>Date de Prélèvement des échantillons </Text>
                                                                <Text style={styles.validation}>*</Text>
                                                                </View>
                                                                <TouchableOpacity style={styles.datePickerButton}>
                                                                        <View style={styles.iconDebutName}>
                                                                                <MaterialIcons name="calendar-today" size={18} color="#777" style={styles.icon} />
                                                                                <Text style={styles.debutName}>
                                                                                        Date
                                                                                </Text>
                                                                        </View>
                                                                        <View style={styles.rightDate}>
                                                                                <Text>
                                    
                                                                                        {moment(donnees.requerantRDV.DATE_PRELEVEMENT).format('DD-MM-YYYY HH:mm:ss')}
                                                                                </Text>

                                                                        </View>
                                                                </TouchableOpacity>
                                                        </View>
                                                        {/* {isDisplayDate && <DateTimePicker
                                                        testID="dateTimePicker"
                                                        value={mydate}
                                                        mode={displaymode}
                                                        is24Hour={true}
                                                        display="default"
                                                        onChange={changeSelectedDate}
                                                />} */}
                                                        <View style={styles.formGroup}>
                                                                <View style={{flexDirection:"row"}}>
                                                                <Text style={styles.title}>
                                                                        Types d'échantillons
                                                                </Text>
                                                                <Text style={styles.validation}>*</Text>
                                                                </View>
                                                                <TouchableOpacity style={styles.openModalize} onPress={() => typeRef.current.open()}>
                                                                        <Text style={styles.openModalizeLabel} numberOfLines={1}>
                                                                                {selectedEchantillion != null ? selectedEchantillion.DESCRIPTION : "--Select--"}
                                                                        </Text>
                                                                        <AntDesign name="caretdown" size={16} color="#777" />
                                                                </TouchableOpacity>
                                                        </View>

                                                        <View style={styles.formGroup}>
                                                                <View style={{flexDirection:"row"}}>
                                                                <Text style={styles.title}>
                                                                        Type de test
                                                                </Text>
                                                                <Text style={styles.validation}>*</Text>
                                                                </View>
                                                                <TouchableOpacity style={styles.openModalize} onPress={() => testRef.current.open()}>
                                                                        <Text style={styles.openModalizeLabel} numberOfLines={1}>
                                                                                {selectedTests != null ? selectedTests.DESCRIPTION : "--Select--"}
                                                                        </Text>
                                                                        <AntDesign name="caretdown" size={16} color="#777" />
                                                                </TouchableOpacity>
                                                        </View>

                                                        <View style={styles.formGroup}>
                                                                <View style={{flexDirection:"row"}}>
                                                                <Text style={styles.title}>
                                                                        Résultat de test
                                                                </Text>
                                                                <Text style={styles.validation}>*</Text>
                                                                </View>
                                                                <TouchableOpacity style={styles.openModalize} onPress={() => resultatRef.current.open()}>
                                                                        {resultat == 5 && <Text style={styles.openModalizeLabel} numberOfLines={1}>
                                                                                Positif
                                                                        </Text>}
                                                                        {resultat == 12 && <Text style={styles.openModalizeLabel} numberOfLines={1}>
                                                                                Négatif
                                                                        </Text>}
                                                                        {resultat == null && <Text style={styles.openModalizeLabel} numberOfLines={1}>
                                                                                --Select--
                                                                        </Text>}
                                                                        <AntDesign name="caretdown" size={16} color="#777" />
                                                                </TouchableOpacity>
                                                        </View>
                                                        <View style={{flexDirection:"row"}}>
                                                        <Text style={styles.title}>Date de réception des échantillons</Text>
                                                        <Text style={styles.validation}>*</Text>
                                                        </View>
                                                        <TouchableOpacity style={styles.datePickerButton} onPress={displayDatepickerNew}>
                                                                <View style={styles.iconDebutName}>
                                                                        <MaterialIcons name="calendar-today" size={18} color="#777" style={styles.icon} />
                                                                        <Text style={styles.debutName}>
                                                                                Date
                                                                        </Text>
                                                                </View>
                                                                <View style={styles.rightDate}>
                                                                        <Text>{moment(myNewdate).format("DD-MM-YYYY")}</Text>
                                                                </View>
                                                        </TouchableOpacity>
                                                        {isDisplayDateNew && <DateTimePicker
                                                                testID="dateTimePicker"
                                                                value={myNewdate}
                                                                mode={displaymodetype}
                                                                is24Hour={true}
                                                                display="default"
                                                                onChange={changeSelectedDateNew}
                                                        />}


                                                        <View style={styles.formGroup}>
                                                                <Text style={styles.title}>
                                                                        Commentaire
                                                                </Text>
                                                                <Input
                                                                        placeholder="Tapez votre commentaire"
                                                                        size='md'
                                                                        borderRadius={10}
                                                                        backgroundColor={"#dde1ed"}
                                                                        multiline={true}
                                                                        onChangeText={(comm) => SetCommentaire(comm)}
                                                                        value={commentaire}
                                                                />
                                                        </View>

                                                </View>
                                        </View>
                                        <Button
                                                //onPress={() => onSubmit()}
                                                isLoading={isLoading}
                                                isDisabled={ !selectedTests || !selectedEchantillion || !selectedMethode}
                                                borderRadius={30}
                                                marginHorizontal={20}
                                                px={0}
                                                py={2}
                                                // width={"100%"}
                                                marginTop={5}
                                                onPress={CreateResultat}
                                                size="lg"
                                                backgroundColor={"#0a5744"}
                                                marginBottom={15}
                                                _text={{
                                                        fontWeight: 'bold'
                                                }}ss
                                        >
                                                Enregistrer
                                        </Button>
                                </>
                        </ScrollView>


                        <Portal>
                                <Modalize ref={typeRef} adjustToContentHeight handleStyle={{ display: 'none' }} modalStyle={{ borderTopRightRadius: 20, borderTopLeftRadius: 20 }}>
                                        <TypesModalize />
                                </Modalize>
                        </Portal>
                        <Portal>
                                <Modalize ref={resultatRef} adjustToContentHeight handleStyle={{ display: 'none' }} modalStyle={{ borderTopRightRadius: 20, borderTopLeftRadius: 20 }}>
                                        <ResultatModalize />
                                </Modalize>
                        </Portal>
                        <Portal>
                                <Modalize ref={testRef} adjustToContentHeight handleStyle={{ display: 'none' }} modalStyle={{ borderTopRightRadius: 20, borderTopLeftRadius: 20 }}>
                                        <Test />
                                </Modalize>
                        </Portal>


                </View>
        )
}

const styles = StyleSheet.create({
        container: {
                flex: 1,
                backgroundColor: "#ffff"

        },
        datePickerButton: {
                flexDirection: "row",
                borderWidth: 1,
                marginBottom: 8,
                borderRadius: 10,
                backgroundColor: "#dde1ed",
                borderColor: "#ddd",
                padding: 9,
                justifyContent: "space-between",
                marginTop: 10,
                // marginHorizontal: 10
        },
        iconDebutName: {
                flexDirection: "row",
                alignItems: 'center'
        },
        ligne: {
                borderTopWidth: 1,
                borderTopColor: "#f1f1f1",

        },
        debutName: {
                marginLeft: 10,
                color: '#777'
        },
        rightDateText: {
                fontWeight: 'bold',
                padding: 2,
                borderRadius: 5
        },
        cardPrincipal: {
                marginVertical: 15,
                marginHorizontal: 20
        },
        titleItem: {
                fontSize: 15,
                fontWeight: "bold",
                color: "#777"
        },
        title: {
                color: '#777',
                fontWeight: 'bold',
                fontSize: 16,
        },
        openModalize: {
                backgroundColor: '#dde1ed',
                padding: 10,
                borderRadius: 5,
                marginTop: 5,
                flexDirection: 'row',
                alignContent: 'center',
                alignItems: 'center',
                justifyContent: 'space-between'
        },
        openModalizeLabel: {
                color: '#555',
                fontSize: 14,
        },
        modalContent: {
                paddingBottom: 20
        },
        modalItem: {
                paddingVertical: 10,
                paddingHorizontal: 15,
                marginTop: 5,
                flexDirection: 'row',
                alignItems: 'center',
                alignContent: 'center'
        },
        formGroup: {
                marginBottom: 20
        },
        requerant:
        {
                backgroundColor: "#ffff",
                width: "100%",
                alignSelf: "center",
                padding: 10,
                borderRadius: 10,
                marginTop: 20,
                paddingHorizontal: 20,




        },
        titleNom: {
                fontSize: 15,
                fontWeight: "bold"
        },
        validation:{
                fontSize: 22,
                color:"red",
                marginLeft: 5
        }
})