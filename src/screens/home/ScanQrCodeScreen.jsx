import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, TouchableNativeFeedback, Alert, ActivityIndicator } from "react-native";
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Portal } from "react-native-portalize";
import { Ionicons } from '@expo/vector-icons';
import fetchApi from "../../helpers/fetchApi";

export default function ScanQrCodeScreen() {
       const navigation = useNavigation()
       const [hasPermission, setHasPermission] = useState(null);
       const [scanned, setScanned] = useState(false);
       const [errors, setErrors] = useState(null);
       const [loading, setLoading] = useState(false)

       const askCameraPermission = async () => {
              const { status } = await BarCodeScanner.requestPermissionsAsync();
              setHasPermission(status === "granted");
       }

       useEffect(() => {
              askCameraPermission()
       }, []);

       const handleBarCodeScanned = async ({ type, data }) => {
              setScanned(true);
                // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
              //console.log(type)
              if (type == 256) {
                     var url = data
                     var divise = url.split("/")
                     var idPrindipal = divise[divise.length - 1]
                     //var rdv=divise[divise.length -2=]
                     //if (!rdv){



                     // }
                     //console.log(idPrindipal)
                     // if(!idPrindipal || isNaN(idPrindipal)){
                     //        setErrors("Qr code invalide")
                     //        //const message = "Qr code invalide"
                     //        // Alert.alert(errors)  
                     //        navigation.goBack()
                     //        return navigation.navigate("Not",{donnees: "Qr code invalide"}) 
                     // }
                     //console.log(idPrindipal)
                     if (!idPrindipal) {
                            setErrors("Qr code invalide")
                            //const message = "Qr code invalide"
                            // Alert.alert(errors)  
                            navigation.goBack()
                            return navigation.navigate("Not", { donnees: "Qr code invalide" })
                     }
                     setLoading(true)

                     try {
                            const fetchScan = await fetchApi("/payement?cq_id=" + idPrindipal, {
                                   method: 'GET',
                                   headers: { "Content-Type": "application/json" },
                            })
                            console.log(fetchScan)
                            if (fetchScan.messageResultat) {
                                   navigation.goBack()
                                   navigation.navigate('Resultat',{ donnees: fetchScan })
                            }
                            else if(fetchScan.messageTraite0)
                            {
                                   navigation.goBack()
                                   navigation.navigate("Photo",{ donnees: fetchScan })
                            }
                            else if(fetchScan.messageValidation)
                            {
                                   navigation.goBack()
                                   navigation.navigate("Validation", { donnees: fetchScan })
                            }
                            else if(fetchScan.message)
                            {
                                   navigation.goBack()
                                   navigation.navigate("apresvalidation",{ donnees: fetchScan })
                            }
                         
                            
                     }
                     catch (error) {
                            console.log(error)
                            //setErrors("Qr code invalide")
                            //Alert.alert(error.type)
                            if (error.message) {
                                   navigation.goBack()
                                   navigation.navigate("Not", { donnees: error.message })
                            
                            }
                            // else if(error.NonAccess)
                            // {
                            //        navigation.goBack()
                            //        navigation.navigate("nonDroit", { donnees: error.message })
                            
                            // }
                     } finally {
                            setLoading(false)
                     }
              }
              else {
                     var timer = setTimeout(() => {
                            setScanned(false)
                     }, 2000)
              }


              setScanned(true);
              clearTimeout(timer) // j'ai mis un timer pour que ??a ne vibre pas tout le temps
       }

       if (hasPermission === false) {
              return <View style={{ alignContent: 'center', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                     <Text>Pas d'acc??s ?? la cam??ra</Text>
                     <TouchableNativeFeedback
                            background={TouchableNativeFeedback.Ripple('#fff')}
                            useForeground={true}
                            onPress={() => askCameraPermission()}
                     >
                            <View style={{ backgroundColor: '#ddd', borderRadius: 10, padding: 10, marginTop: 50 }}>
                                   <Text>Autoriser l'acc??s</Text>
                            </View>
                     </TouchableNativeFeedback>
              </View>
       }
       return (
              <Portal>
                     <View style={styles.container}>
                            <BarCodeScanner
                                   onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                                   style={StyleSheet.absoluteFillObject}
                                   barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
                            />

                            <View style={styles.mask}>
                                   <Text style={styles.scanTitle}>
                                          Scanner le QR code
                                   </Text>
                                   <View style={styles.maskScan}/>
                                   <View style={styles.scanActions}>
                                          {/* {location && <Text style={{color: 'red'}}>{ calcCrow(qrCodeCoords.lat, qrCodeCoords.long, location.coords.latitude, location.coords.longitude) }</Text>} */}
                                          <TouchableNativeFeedback
                                                 background={TouchableNativeFeedback.Ripple('#ddd')}
                                                 useForeground={true}
                                                 onPress={() => navigation.goBack()}
                                          >
                                                 <View style={styles.actionBtn}>
                                                        <Ionicons name="close" size={40} color="#fff" />
                                                 </View>
                                          </TouchableNativeFeedback>
                                   </View>
                            </View>
                            {loading && <View style={{
                                   position: 'absolute',
                                   width: '100%',
                                   height: '100%',
                                   justifyContent: 'center',
                                   alignItems: 'center',
                                   backgroundColor: 'rgba(0, 0, 0, 0.5)'
                            }}>
                                   <ActivityIndicator animating size={'large'} />
                            </View>}
                     </View>
              </Portal>
       )
}

const styles = StyleSheet.create({
       container: {
              flex: 1,
              paddingVertical: 30,
              borderStartColor: '#fff',
              backgroundColor: "#E6E3EA"
       },
       mask: {
              flex: 1,
              alignItems: 'center',
              justifyContent: 'space-around'
       },
       scanTitle: {
              color: '#fff',
              backgroundColor: '#0a5744',
              fontSize: 16,
              padding: 15,
              borderRadius: 10
       },
       scanActions: {
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignContent: 'center',
              alignItems: 'center',
              width: '100%'
       },
       maskScan: {
              width: '70%',
              height: 250,
              borderColor: '#fff',
              borderRadius: 20,
              borderWidth: 2,
              backgroundColor: 'transparent'
       },
       actionBtn: {
              backgroundColor: '#0a5744',
              padding: 10,
              borderRadius: 100,
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
              overflow: 'hidden'
       }
})