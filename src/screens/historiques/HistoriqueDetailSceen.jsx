import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Image, Text, View, Modal, ActivityIndicator, TouchableNativeFeedback, TouchableOpacity } from "react-native";
import ImageViewer from 'react-native-image-zoom-viewer';
import { MaterialIcons, Ionicons, FontAwesome5, AntDesign, Fontisto, FontAwesome, Entypo, Foundation } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import moment from 'moment'
import { Button } from "native-base";
import ResultScreen from "./ResultScreen";

moment.updateLocale('fr', {
        calendar: {

                nextDay: 'DD-MM-YYYY',
                lastWeek: 'DD-MM-YYYY',
                sameElse: 'DD-MM-YYYY',
        },
})

export default function HistoriqueDetailSCreen() {
        const route = useRoute()
        const navigation = useNavigation()
        const { donnees } = route.params
        const [showImageModal, setShowImageModal] = useState(false)
        const [imageIndex, setImageIndex] = useState(0)
        const [loading, setLoading] = useState(false)
        const isProd = true
        const bordereauPath = isProd ? "https://app.mediabox.bi/covid_v2_dev/uploads/image_bordereau/" : "http://192.168.43.84:8000/images/photo_brd/"
        const candidatPath = isProd ? "https://app.mediabox.bi/covid_v2_dev/uploads/image_candidat/" : "http://192.168.43.84:8000/images/photo_prs/"
        var imageUrls = []

        if (donnees.PATH_PASSEPORT) imageUrls.push(`${candidatPath}${donnees.PATH_PASSEPORT}`)
        if (donnees.PATH_BORDEREAU) imageUrls.push(`${bordereauPath}${donnees.PATH_BORDEREAU}`)
        return (loading ?
                <View style={{ flex: 1, justifyContent: 'center' }}>
                        <ActivityIndicator animating={true} size="large" color={"black"} />
                </View> :
                <>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignContent: "center", alignItems: "center", paddingHorizontal: 20, }}>
                                <TouchableNativeFeedback onPress={() => navigation.goBack()} useForeground>
                                        <View style={{ borderRadius: 50, padding: 10, overflow: 'hidden', opacity: 0.8, backgroundColor: '#0a5744' }}>
                                                <Ionicons name="arrow-back-outline" size={24} color="#000" />
                                        </View>
                                </TouchableNativeFeedback>
                                <Text style={styles.titleHistorique}>
                                        Détails
                                </Text>
                        </View>
                        <ScrollView keyboardShouldPersistTaps="handled">
                                <View style={{ paddingHorizontal: 10 }}>
                                        <View style={styles.DetailCard}>
                                                

                                                <View style={{ flexDirection: "row", alignContent: "center", alignItems: "center", marginTop: 5 }}>
                                                        <View style={styles.cardImage}>
                                                        <FontAwesome5 name="user" size={24} color="#0a5744" />

                                                        </View>
                                                        <View style={{ marginLeft: 13 }}>
                                                                <Text style={styles.titleNom}>Nom et Prénom</Text>
                                                                <Text style={styles.titleResponse}>{donnees.REQUERANT_NOM} {donnees.REQUERANT_PRENOM}</Text>
                                                        </View>
                                                </View>

                                                <View style={{ flexDirection: "row", alignContent: "center", alignItems: "center", marginTop: 5 }}>
                                                        <View style={styles.cardImage}>
                                                        <Fontisto name="passport-alt" size={24} color="#0a5744" />

                                                        </View>
                                                        <View style={{ marginLeft: 13 }}>
                                                                <Text style={styles.titleNom}>Numero du document</Text>
                                                                <Text style={styles.titleResponse}>{donnees.CNI_PASSPORT_CPGL}</Text>
                                                        </View>
                                                </View>

                                                <View style={{ flexDirection: "row", alignContent: "center", alignItems: "center", marginTop: 5 }}>
                                                        <View style={styles.cardImage}>
                                                        <Entypo name="mail" size={24} color="#0a5744" />

                                                        </View>
                                                        <View style={{ marginLeft: 13 }}>
                                                                <Text style={styles.titleNom}>Email</Text>
                                                                <Text style={styles.titleResponse}>{donnees.EMAIL}</Text>
                                                        </View>
                                                </View>

                                                <View style={{ flexDirection: "row", alignContent: "center", alignItems: "center", marginTop: 5 }}>
                                                        <View style={styles.cardImage}>
                                                        <AntDesign name="calendar" size={24} color="#0a5744" />

                                                        </View>
                                                        <View style={{ marginLeft: 13 }}>
                                                                <Text style={styles.titleNom}>Age</Text>
                                                                <Text style={styles.titleResponse}>{donnees.AGE} ans</Text>
                                                        </View>
                                                </View>

                                                <View style={{ flexDirection: "row", alignContent: "center", alignItems: "center", marginTop: 5 }}>
                                                        <View style={styles.cardImage}>
                                                        <AntDesign name="calendar" size={24} color="#0a5744" />

                                                        </View>
                                                        <View style={{ marginLeft: 13 }}>
                                                                <Text style={styles.titleNom}>Date rendez-vous</Text>
                                                                <Text style={styles.titleResponse}>
                                                                {moment(donnees.DATE_RENDEVOUS).format('  DD-MM-YYYY')}
                                                                </Text>
                                                        </View>
                                                </View>

                                                <View style={{ flexDirection: "row", alignContent: "center", alignItems: "center", marginTop: 5 }}>
                                                        <View style={styles.cardImage}>
                                                        <AntDesign name="phone" size={24} color="#0a5744" />

                                                        </View>
                                                        <View style={{ marginLeft: 13 }}>
                                                                <Text style={styles.titleNom}>Téléphone</Text>
                                                                <Text style={styles.titleResponse}>
                                                                {donnees.TELEPHONE}
                                                                </Text>
                                                        </View>
                                                </View>

                                        </View>
                                        <View style={styles.imagePrincipal}>

                                                <Text style={styles.titleImages}>Image du candidat</Text>
                                                {donnees.PATH_PASSEPORT != null && <TouchableOpacity activeOpacity={0.8} onPress={() => {
                                                        setImageIndex(0)
                                                        setShowImageModal(true)
                                                }}>
                                                        <Image source={{ uri: `${candidatPath}${donnees.PATH_PASSEPORT}` }} style={styles.DetaImage} />
                                                </TouchableOpacity>}

                                                {donnees.PATH_BORDEREAU != null &&
                                                        <>
                                                                <Text style={styles.titleImages}>Image du bordereau</Text>
                                                                <TouchableOpacity activeOpacity={0.8} onPress={() => {
                                                                        setImageIndex(1)
                                                                        setShowImageModal(true)
                                                                }}>
                                                                        <Image source={{ uri: `${bordereauPath}${donnees.PATH_BORDEREAU}` }} style={styles.DetaImage} />
                                                                </TouchableOpacity>
                                                        </>}
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
        DetailCard: {
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
        detailItem: {
                borderBottomColor: "#ddd",
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingVertical: 15,

        },
        username: {

                fontSize: 15
        },
        itemValue: {
                //opacity: 0.8,
                fontWeight: 'bold',
                color: "#777"
        },
        imagePrincipal: {
                paddingHorizontal: 10,
                marginTop: 15
        },
        DetaImage: {
                minHeight: 250,
                maxHeight: 250,
                marginBottom: 20,
                borderRadius: 5
        },
        titleHistorique: {
                color: "#0a5744"
        },
        titleImages: {
                fontSize: 15,
                fontWeight: "bold",
                marginBottom: 10,
                textAlign: 'center'
        },
        cardImage: {
                width: 40,
                height: 40,
                backgroundColor: "#DCE4F7",
                borderRadius: 40,
                alignItems: "center",
                justifyContent: "center"
        },
        button: {
                borderRadius: 10,

        },
        titleNom: {
                fontSize: 13,
                fontWeight: "bold"
        }
})