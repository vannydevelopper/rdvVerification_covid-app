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
                sameDay: "[Aujourd'hui]",
                lastDay: '[Hier]',
                nextDay: 'DD-M-YYYY',
                lastWeek: 'DD-M-YYYY',
                sameElse: 'DD-M-YYYY',
        },
})

export default function HistoriqueDetailSCreen() {
        const route = useRoute()
        const navigation = useNavigation()
        const { donnees } = route.params
        const [showImageModal, setShowImageModal] = useState(false)
        const [imageIndex, setImageIndex] = useState(0)
        const [loading, setLoading] = useState(false)
        // console.log(donnees)

        var imageUrls = []
        if (donnees.PATH_PASSEPORT) imageUrls.push(donnees.PATH_PASSEPORT)
        if (donnees.PATH_BORDEREAU) imageUrls.push(donnees.PATH_BORDEREAU)
        return (loading ?
                <View style={{ flex: 1, justifyContent: 'center' }}>
                        <ActivityIndicator animating={true} size="large" color={"black"} />
                </View> :
                <>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignContent: "center", alignItems: "center", paddingHorizontal: 20, }}>
                                <TouchableNativeFeedback onPress={() => navigation.goBack()} useForeground>
                                        <View style={{ borderRadius: 50, padding: 10, overflow: 'hidden', opacity: 0.8, backgroundColor: '#F58424' }}>
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
                                                                <FontAwesome5 name="user" size={24} color="#F58424" />

                                                        </View>
                                                        <View style={styles.detailItem}>
                                                                <Text style={styles.username}>Nom et Prenom:</Text>
                                                                <Text style={styles.itemValue}>{donnees.REQUERANT_NOM} {donnees.REQUERANT_PRENOM}</Text>
                                                        </View>
                                                </View>

                                                <View style={{ flexDirection: "row", alignContent: "center", alignItems: "center", marginTop: 5 }}>
                                                        <View style={styles.cardImage}>
                                                                <Fontisto name="passport-alt" size={24} color="#F58424" />

                                                        </View>
                                                        <View style={styles.detailItem}>
                                                                <Text style={styles.username}>Numero du document:</Text>
                                                                <Text style={styles.itemValue}>{donnees.CNI_PASSPORT_CPGL}</Text>
                                                        </View>
                                                </View>
                                                <View style={{ flexDirection: "row", alignContent: "center", alignItems: "center", marginTop: 5 }}>
                                                        <View style={styles.cardImage}>
                                                                <Entypo name="mail" size={24} color="#F58424" />

                                                        </View>
                                                        <View style={styles.detailItem}>
                                                                <Text style={styles.username}>Email:</Text>
                                                                <Text style={styles.itemValue}>{donnees.EMAIL}</Text>
                                                        </View>
                                                </View>
                                                <View style={{ flexDirection: "row", alignContent: "center", alignItems: "center", marginTop: 5 }} >

                                                        <View style={styles.detailItem}>
                                                                <View style={styles.cardImage}>
                                                                        <AntDesign name="calendar" size={24} color="#F58424" />

                                                                </View>
                                                                <Text style={styles.username}>Age:</Text>
                                                                <Text style={styles.itemValue}>{donnees.AGE}</Text>
                                                        </View>
                                                </View>
                                                <View style={{ flexDirection: "row", alignContent: "center", alignItems: "center", marginTop: 5 }}>
                                                        <View style={styles.detailItem}>
                                                                <View style={styles.cardImage}>
                                                                        <AntDesign name="calendar" size={24} color="#F58424" />

                                                                </View>
                                                                <Text style={styles.username}>Date de rendez vous:</Text>
                                                                <Text style={styles.itemValue}>
                                                                        {moment(donnees.DATE_RENDEVOUS).calendar(null, {
                                                                                sameDay: `[Aujourd'hui]`,
                                                                                lastDay: `[Hier]`,
                                                                                nextDay: 'DD-M-YYYY',
                                                                                lastWeek: 'DD-M-YYYY',
                                                                                sameElse: 'DD-M-YYYY',
                                                                        })}
                                                                        {moment(donnees.DATE_RENDEVOUS).format('  HH:mm')}
                                                                </Text>
                                                        </View>
                                                </View>
                                                <View style={{ flexDirection: "row", alignContent: "center", alignItems: "center", marginTop: 5 }}>
                                                        <View style={styles.cardImage}>
                                                                <AntDesign name="phone" size={24} color="#F58424" />

                                                        </View>
                                                        <View style={styles.detailItem}>
                                                                <Text style={styles.username}>Telephone:</Text>
                                                                <Text style={styles.itemValue}>{donnees.TELEPHONE}</Text>
                                                        </View>
                                                </View>
                                        </View>
                                        <View style={styles.imagePrincipal}>
                                                <Text style={styles.titleImages}>Image du passport</Text>
                                                {donnees.PATH_PASSEPORT != null && <TouchableOpacity activeOpacity={0.8} onPress={() => {
                                                        setImageIndex(0)
                                                        setShowImageModal(true)
                                                }}>
                                                        <Image source={{ uri: donnees.PATH_PASSEPORT }} style={styles.DetaImage} />
                                                </TouchableOpacity>}
                                                {donnees.PATH_BORDEREAU != null &&
                                                        <>
                                                                <Text style={styles.titleImages}>Image du bordereau</Text>
                                                                <TouchableOpacity activeOpacity={0.8} onPress={() => {
                                                                        setImageIndex(1)
                                                                        setShowImageModal(true)
                                                                }}>
                                                                        <Image source={{ uri: donnees.PATH_BORDEREAU }} style={styles.DetaImage} />
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
                backgroundColor: '#fff',
                paddingHorizontal: 30,
                borderRadius: 10,
                marginTop: 15,
                elevation: 10,
                marginLeft: 0,
                shadowColor: '#c4c4c4',
        },
        detailItem: {
                borderBottomColor: "#ddd",
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingVertical: 15,

        },
        username: {
                fontWeight: 'bold',
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
                color: "#F58424"
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
        button:{
                borderRadius:10,
                
        }
})