import React, { useCallback, useEffect, useState } from "react";
import { ImageBackground, ScrollView, StyleSheet,Image, Text, TouchableNativeFeedback, View } from "react-native";
import { MaterialIcons, Entypo } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import fetchApi from "../../helpers/fetchApi";
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


export default function HistoriqueScreen() {
       const navigation = useNavigation()
       const [historiques, setHistoriques] = useState([])

       const fetchHistoriques = async () => {
              try {
                     const histo = await fetchApi("/historique/afficher", {
                            method: "GET",
                            headers: { "Content-Type": "application/json" }
                     })
                     setHistoriques(histo)
                     console.log(histo)
              }

              catch (error) {
                     console.log(error)
              }
       }

       useFocusEffect(useCallback(() => {
              fetchHistoriques()
       }, []))

       return (
              <View>
                     <ScrollView keyboardShouldPersistTaps="handled">
                            <View style={{ marginBottom: 10 }}>
                                   {historiques.map((historique, index) => {
                                          return (
                                                 <TouchableNativeFeedback key={index} onPress={()=>navigation.navigate("Details", {donnees:historique})}>
                                                        <View style={styles.cardPrincipal}>
                                                               <View style={styles.cardPosition}>
                                                                      <View style={styles.cardImage}>
                                                                             <MaterialIcons name="qr-code-scanner" size={24} color="#F58424" />
                                                                      </View>
                                                                      <View style={styles.cardDescripetion}>
                                                                             <View style={styles.CardItems}>
                                                                                    <View style={{ flexDirection: "row" }}>
                                                                                           <Text style={styles.itemTitle} numberOfLines={2}>{historique.NOM}  {historique.PRENOM}</Text>
                                                                                    </View>  
                                                                             </View>
                                                                             <Text style={styles.itemDescription}>{historique.EMAIL}</Text>
                                                                             <Text style={styles.itemDescription1}>{historique.TELEPHONE}</Text>
                                                                             {/* {historique.PHOTO_BRD != null && <Image source={{ uri: historique.PHOTO_BRD }} style={styles.DetaImage} />}
                                                                             {historique.PHOTO_PRS != null && <Image source={{ uri: historique.PHOTO_PRS }} style={styles.DetaImage} />} */}
                                                                      </View>
                                                               </View>
                                                               <View style={styles.ligne}></View>
                                                               <View style={{ flexDirection: "row", justifyContent: "flex-end", marginTop: 5 }}>
                                                                      <View ></View>
                                                                      <View style={styles.dateCard}>
                                                                             <Text style={styles.itemDebut}>
                                                                                    {moment(historique.DATE).calendar(null, {
                                                                                           sameDay: `[Aujourd'hui]`,
                                                                                           lastDay: `[Hier]`,
                                                                                           nextDay: 'DD-M-YYYY',
                                                                                           lastWeek: 'DD-M-YYYY',
                                                                                           sameElse: 'DD-M-YYYY',
                                                                                    })}
                                                                                    {moment(historique.DATE).format('  HH:mm')}
                                                                             </Text>
                                                                      </View>
                                                               </View>
                                                        </View>
                                                 </TouchableNativeFeedback>
                                          )
                                   })}
                            </View>
                     </ScrollView>
              </View>
       )
}

const styles = StyleSheet.create({
       container: {
              flex: 1
       },
       title: {
              marginHorizontal: 20
       },
       histoTitle: {
              fontSize: 20,
              color: "#777",
              fontWeight: "bold"
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
       cardImage: {
              width: 50,
              height: 50,
              backgroundColor: "#777",
              borderRadius: 50,
              alignItems: "center",
              justifyContent: "center"
       },
       cardDescripetion: {
              marginLeft: 10
       },
       itemTitle: {
              fontSize: 12,
              fontWeight: "bold",
       },
       itemDescription: {
              fontSize: 12,
              color: "#777",
              fontWeight: "bold"
       },
       itemDescription1: {
              fontSize: 12,
              color: "#777",
       },
       cardPosition: {
              flexDirection: "row",
              alignItems: "center",
              alignContent: "center"
       },
       ligne: {
              borderTopWidth: 1,
              marginTop: 10,
              borderTopColor: "#F58424"
       },
       itemDebut: {
              fontSize: 12,
              color: "#fff",
              // fontWeight:"bold",
       },
       dateCard: {
              // fontSize:12,
              backgroundColor: "#777",
              minWidth: "45%",
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 8
       },
       DetaImage: {
              height: 70,
              borderRadius:90

          },


})