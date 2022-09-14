import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from 'react'
import ImageViewer from 'react-native-image-zoom-viewer';
import { ScrollView, StyleSheet, Image, Text, View, Modal, ActivityIndicator, TouchableNativeFeedback, TouchableOpacity } from "react-native";

export default function InformationScreen() {
        const route = useRoute()
        const { donnees } = route.params
        const [showImageModal, setShowImageModal] = useState(false)
        const [imageIndex, setImageIndex] = useState(0)
        //console.log(donnees)

        const isProd = true
        const bordereauPath = isProd ? "https://app.mediabox.bi/covid_v2_dev/uploads/image_bordereau/" : "http://192.168.43.84:8000/images/photo_brd/"
        const candidatPath = isProd ? "https://app.mediabox.bi/covid_v2_dev/uploads/image_candidat/" : "http://192.168.43.84:8000/images/photo_prs/"

        var imageUrls = []

        if (donnees.requerantRDV.PATH_PASSEPORT) imageUrls.push(`${candidatPath}${donnees.requerantRDV.PATH_PASSEPORT}`)
        if (donnees.requerantRDV.PATH_BORDEREAU) imageUrls.push(`${bordereauPath}${donnees.requerantRDV.PATH_BORDEREAU}`)
        return (
                <>
                <ScrollView>
                        <View style={{ paddingHorizontal: 10 }}>
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