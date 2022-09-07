import React, { useCallback, useEffect, useState } from "react";
import { ImageBackground, ScrollView, ActivityIndicator, StyleSheet, Image, Text, TouchableNativeFeedback, View } from "react-native";
import { MaterialIcons, Entypo, EvilIcons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import fetchApi from "../../helpers/fetchApi";
import moment from 'moment'
import { Input, Icon } from "native-base";
import NotHistory from "../../components/NotHistory";
import NotFound from "../../components/NotFound";
moment.updateLocale('fr', {
       calendar: {
              sameDay: "[Aujourd'hui]",
              lastDay: '[Hier]',
              nextDay: 'DD-MM-YYYY',
              lastWeek: 'DD-MM-YYYY',
              sameElse: 'DD-MM-YYYY',
       },
})


export default function HistoriqueScreen() {
       const navigation = useNavigation()
       const [historiques, setHistoriques] = useState([])
       const [loading, setLoading] = useState(false)
       const [q, setQn] = useState('')

       const fetchHistoriques = async () => {
              setLoading(true)
              try {
                     var url = "/historique/afficher?limit=20"
                     if (q != '') {
                            url = `/historique/afficher?limit=20&q=${q}`
                     }
                     const histo = await fetchApi(url, {
                            method: "GET",
                            headers: { "Content-Type": "application/json" }
                     })
                     setHistoriques(histo)
                     console.log(histo)
              }

              catch (error) {
                     console.log(error)
              }
              setLoading(false)
       }

       useFocusEffect(useCallback(() => {
              fetchHistoriques()
       }, [q]))

       return (
              <>
                     {historiques.length != 0 && <View style={styles.rechercheCard}>
                            <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 3, color: "#0a5744" }}>Historique</Text>
                            <Input
                                   placeholder="recherche"
                                   size='md'
                                   borderRadius={10}
                                   backgroundColor={"#fff"}
                                   onChangeText={t => setQn(t)}
                                   value={q}
                                   InputLeftElement={
                                          <Icon
                                                 as={<EvilIcons name="search" size={20} color="black" />}
                                                 size={8}
                                                 ml="2"
                                                 color="muted.400"
                                          />
                                   }
                            />
                     </View>}

                     {loading ?
                            <View style={{ flex: 1, justifyContent: 'center' }}>
                                   <ActivityIndicator animating={true} size="large" color={"black"} />
                            </View> :
                            <View>
                                   {historiques.length == 0 ? <NotFound style={{ marginTop: 10 }} /> :
                                          <ScrollView keyboardShouldPersistTaps="handled">
                                                 <View style={{ marginBottom: 80 }}>
                                                        {historiques.map((historique, index) => {
                                                               return (
                                                                      <TouchableNativeFeedback key={index} onPress={() => navigation.navigate("Details", { donnees: historique })}>
                                                                             <View style={styles.cardPrincipal}>
                                                                                    <View style={styles.cardPosition}>
                                                                                           <View style={styles.cardImage}>
                                                                                                  <MaterialIcons name="qr-code-scanner" size={24} color="#0a5744" />
                                                                                           </View>
                                                                                           <View style={styles.cardDescripetion}>
                                                                                                  <View style={styles.CardItems}>
                                                                                                         <View style={{ flexDirection: "row" }}>
                                                                                                                <Text style={styles.itemTitle} numberOfLines={2}>{historique.REQUERANT_NOM}  {historique.REQUERANT_PRENOM}</Text>
                                                                                                         </View>
                                                                                                  </View>
                                                                                                  <Text style={styles.itemDescription}>{historique.EMAIL}</Text>
                                                                                                  <Text style={styles.itemDescription1}>{historique.TELEPHONE}</Text>
                                                                                                  {/* {historique.PHOTO_BRD != null && <Image source={{ uri: historique.PHOTO_BRD }} style={styles.DetaImage} />}
                                                                             {historique.PHOTO_PRS != null && <Image source={{ uri: historique.PHOTO_PRS }} style={styles.DetaImage} />} */}
                                                                                           </View>
                                                                                    </View>
                                                                                    <View style={styles.ligne}></View>
                                                                                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 5 }}>

                                                                                           <View style={styles.etape} >
                                                                                                  {historique.ETAPE == 1 &&
                                                                                                         <Text  >
                                                                                                                prélèvement du voyageur
                                                                                                         </Text>
                                                                                                  }
                                                                                                  {historique.ETAPE == 3 &&
                                                                                                         <Text  >
                                                                                                                Attribution des résultats
                                                                                                         </Text>
                                                                                                  }
                                                                                                  {historique.ETAPE == 4 &&
                                                                                                         <Text  >
                                                                                                                Validation des résultats
                                                                                                         </Text>
                                                                                                  }
                                                                                           </View>
                                                                                           <View style={styles.dateCard}>
                                                 

                                                                                                  <Text style={styles.itemDebut}>
                                                                                                  {moment(historique.DATE).calendar(null,{
                                                                                                          sameDay: "[Aujourd'hui]",
                                                                                                          lastDay: '[Hier]',
                                                                                                          nextDay: 'DD-MM-YYYY',
                                                                                                          lastWeek: 'DD-MM-YYYY',
                                                                                                          sameElse: 'DD-MM-YYYY',

                                                                                                  })}

                                                                                                  {moment(historique.DATE).format(' HH:MM:')}
                                                                                                  </Text>
                                                                                           </View>
                                                                                    </View>
                                                                             </View>
                                                                      </TouchableNativeFeedback>
                                                               )
                                                        })}
                                                 </View>
                                          </ScrollView>}
                            </View>}
              </>
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
              marginTop: 5,
              //marginBottom: 20
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
              borderTopColor: "#0a5744"
       },
       itemDebut: {
              fontSize: 9,
              color: "#000",
              // fontWeight:"bold",
       },
       dateCard: {
              // fontSize:12,
              backgroundColor: "#ddd",
              //minWidth: "45%",
              padding: 3,
              borderRadius: 3,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 8
       },
       etape: {
              // fontSize:12,
              // backgroundColor: "#ddd",
              //minWidth: "45%",
              padding: 3,
              borderRadius: 3,
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 8
       },
       DetaImage: {
              height: 70,
              borderRadius: 90

       },
       rechercheCard: {
              marginHorizontal: 20
       }


})