import React, { useEffect, useRef, useState } from "react";
import { ScrollView, StyleSheet, BackHandler, TouchableNativeFeedback, Animated, TouchableOpacity, TouchableWithoutFeedback, StatusBar, Text, View } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker'
import { Entypo, FontAwesome5, AntDesign, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { Host, Portal } from 'react-native-portalize';
import { Modalize } from "react-native-modalize";
import { Button, Icon, Input, useToast, FormControl, WarningOutlineIcon } from 'native-base'
import useFetch from "../../hooks/useFetch";

export default function ResultatTestSCreens() {
        const typeRef = useRef(null)
        const resultatRef = useRef(null)
        const testRef = useRef(null)
        const [sexe, setSexe] = useState(null)
        //recuperation des dates
        const [mydate, setDate] = useState(new Date());
        const [displaymode, setMode] = useState('date');
        const [isDisplayDate, setShow] = useState(false);
        const changeSelectedDate = (event, selectedDate) => {
                const currentDate = selectedDate || mydate;
                setShow(Platform.OS === "ios");
                setDate(currentDate);

        };
        const showMode = (currentMode) => {
                setShow(true);
                setMode(currentMode);
        };
        const displayDatepicker = () => {
                showMode('date');
        };

        //recuperation des dates
        const [myNewdate, setmyNewdate] = useState(new Date());
        const [displaymodetype, setModeType] = useState('date');
        const [isDisplayDateNew, setShowNew] = useState(false);

        const changeSelectedDateNew = (event, selectedDateNew) => {
                const currentDate = selectedDateNew || mydate;
                setShowNew(Platform.OS === "ios");
                setmyNewdate(currentDate);

        };
        const showModeNew = (currentMode) => {
                setShowNew(true);
                setModeType(currentMode);
        };
        const displayDatepickerNew = () => {
                showModeNew('date');
        };

        const [selectedTests, setselectedTests] = useState(null)
        const [selectedResultat, setSelectedResultat] = useState(null)
        const [selectedEchantillion, setSelectedEchantillion] = useState(null)
        const [selectedMethode, setSelectedMethode] = useState(null)


        const [loading, typeTests] = useFetch("/type/afficher")
        const [loading2, typeResultats] = useFetch("/resultat/afficher")
        const [loading3, typeEchantillions] = useFetch("/echantillon/afficher")
        const [loading4, methodeTests] = useFetch("/test/afficher")
        // console.log(methodeTests)
        //type de test
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

                                                                        <Text numberOfLines={1} style={styles.modalText}>{echantillion.DESCRIPTION}</Text>
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
                                        {typeResultats.map((resultat, index) => {
                                                return (
                                                        <TouchableNativeFeedback key={index} onPress={() => onResultatSelect(resultat)}>
                                                                <View style={styles.modalItem}>
                                                                        {selectedResultat?.RESULTAT_ID == resultat.RESULTAT_ID ? <MaterialCommunityIcons name="radiobox-marked" size={24} color="#007bff" /> :
                                                                                <MaterialCommunityIcons name="radiobox-blank" size={24} color="#777" />}
                                                                        <Text numberOfLines={1} style={styles.modalText}>{resultat.DESCRIPTION}</Text>
                                                                </View>
                                                        </TouchableNativeFeedback>
                                                )
                                        })}
                                </View>
                        </View>
                )
        }

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
                                                                        <Text numberOfLines={1} style={styles.modalText}>{test.DESCRIPTION}</Text>
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
                                <View style={styles.container}>
                                        <View style={styles.cardPrincipal}>
                                                {methodeTests.map((methode, index) => {
                                                        return (
                                                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} key={index}>
                                                                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                                                                <TouchableWithoutFeedback onPress={() => onCheckSelect(methode)}>
                                                                                        <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 15 }} >
                                                                                                 { selectedMethode?.METHODE_TEST_ID == methode.METHODE_TEST_ID ? <MaterialCommunityIcons name="radiobox-marked" size={20} color="#007bff" style={{ marginLeft: -7 }} /> :
                                                                                                        <MaterialCommunityIcons name="radiobox-blank" size={20} color="#777" style={{ marginLeft: -7 }} />}
                                                                                                <Text style={{ ...styles.title, color: "#777" }}>{methode.DESCRIPTION}</Text>
                                                                                        </View>
                                                                                </TouchableWithoutFeedback>
                                                                        </View>
                                                                </View>
                                                        )
                                                })}
                                                <View style={styles.formGroup}>
                                                        <Text style={styles.title}>Date de prelevement des echantillons </Text>
                                                        <TouchableOpacity style={styles.datePickerButton} onPress={displayDatepicker}>
                                                                <View style={styles.iconDebutName}>
                                                                        <MaterialIcons name="calendar-today" size={18} color="#777" style={styles.icon} />
                                                                        <Text style={styles.debutName}>
                                                                                Date
                                                                        </Text>
                                                                </View>
                                                                <View style={styles.rightDate}>
                                                                        <Text>{(mydate.getFullYear() + '-' + mydate.getMonth() + '-' + mydate.getDate())}</Text>
                                                                </View>
                                                        </TouchableOpacity>
                                                </View>
                                                {isDisplayDate && <DateTimePicker
                                                        testID="dateTimePicker"
                                                        value={mydate}
                                                        mode={displaymode}
                                                        is24Hour={true}
                                                        display="default"
                                                        onChange={changeSelectedDate}
                                                />}
                                                <View style={styles.formGroup}>
                                                        <Text style={styles.title}>
                                                                Types d'echantillons
                                                        </Text>
                                                        <TouchableOpacity style={styles.openModalize} onPress={() => typeRef.current.open()}>
                                                                <Text style={styles.openModalizeLabel} numberOfLines={1}>
                                                                        {selectedEchantillion != null ? selectedEchantillion.DESCRIPTION : "--Select--"}
                                                                </Text>
                                                                <AntDesign name="caretdown" size={16} color="#777" />
                                                        </TouchableOpacity>
                                                </View>

                                                <View style={styles.formGroup}>
                                                        <Text style={styles.title}>
                                                                Resultat de test
                                                        </Text>
                                                        <TouchableOpacity style={styles.openModalize} onPress={() => resultatRef.current.open()}>
                                                                <Text style={styles.openModalizeLabel} numberOfLines={1}>
                                                                        {selectedResultat != null ? selectedResultat.DESCRIPTION : "--Select--"}
                                                                </Text>
                                                                <AntDesign name="caretdown" size={16} color="#777" />
                                                        </TouchableOpacity>
                                                </View>
                                                <Text style={styles.title}>Date de reception des echantillons</Text>
                                                <TouchableOpacity style={styles.datePickerButton} onPress={displayDatepickerNew}>
                                                        <View style={styles.iconDebutName}>
                                                                <MaterialIcons name="calendar-today" size={18} color="#777" style={styles.icon} />
                                                                <Text style={styles.debutName}>
                                                                        Date
                                                                </Text>
                                                        </View>
                                                        <View style={styles.rightDate}>
                                                                <Text>{(myNewdate.getFullYear() + '-' + myNewdate.getMonth() + '-' + myNewdate.getDate())}</Text>
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
                                                                Type de test
                                                        </Text>
                                                        <TouchableOpacity style={styles.openModalize} onPress={() => testRef.current.open()}>
                                                                <Text style={styles.openModalizeLabel} numberOfLines={1}>
                                                                        {selectedTests != null ? selectedTests.DESCRIPTION : "--Select--"}
                                                                </Text>
                                                                <AntDesign name="caretdown" size={16} color="#777" />
                                                        </TouchableOpacity>
                                                </View>
                                                <View style={styles.formGroup}>
                                                        <Text style={styles.title}>
                                                                Conclusion
                                                        </Text>
                                                        <Input
                                                                placeholder="Conlusion"
                                                                size='md'
                                                                borderRadius={10}
                                                                backgroundColor={"#dde1ed"}
                                                                multiline={true}
                                                        // onChangeText={t => setQn(t)}
                                                        // value={q}
                                                        />
                                                </View>

                                        </View>
                                </View>
                                <Button
                                        //onPress={() => onSubmit()}
                                        //isLoading={loading}
                                        //    isDisabled={nom == "" || prenom == "" || numero == "" || email == "" || adresse == "" || password == "" || confirmPassword == "" || sexe == null}
                                        borderRadius={30}
                                        marginHorizontal={20}
                                        px={0}
                                        py={2}
                                        // width={"100%"}
                                        marginTop={5}
                                        size="lg"
                                        backgroundColor={"#F58424"}
                                        marginBottom={15}
                                        _text={{
                                                fontWeight: 'bold'
                                        }}
                                >
                                        Enregistrer
                                </Button>
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
                // backgroundColor:"red"

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
        }
})