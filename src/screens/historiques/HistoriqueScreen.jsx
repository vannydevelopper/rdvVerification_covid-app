import React, { useCallback, useState } from "react";
import { ImageBackground, ScrollView, StyleSheet, Text, TouchableNativeFeedback, View } from "react-native";
import { MaterialIcons,Entypo  } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from "@react-navigation/native";


export default function HistoriqueScreen(){
       const navigation = useNavigation()

       return(
              <View>
                     <ScrollView keyboardShouldPersistTaps="handled">
                            <View style={{marginBottom:10}}>
                                          <TouchableNativeFeedback>
                                                 <View style={styles.cardPrincipal}>
                                                        <View style={styles.cardPosition}>
                                                               <View style={styles.cardImage}>
                                                                      <MaterialIcons name="qr-code-scanner" size={24} color="#F58424" />
                                                               </View>
                                                               <View style={styles.cardDescripetion}>
                                                                      <View style={styles.CardItems}>
                                                                             <View style={{flexDirection:"row"}}>
                                                                                    <Text style={styles.itemTitle} numberOfLines={2}>jjjjjjjj</Text>
                                                                             </View>
                                                                             <Text style={styles.itemDescription}>jjjjjjjjssss</Text>
                                                                             <Text style={styles.itemDescription1}>Debut </Text>
                                                                             <Text style={styles.itemDescription1}>Fin </Text>
                                                                      </View>
                                                               </View>
                                                        </View>
                                                        <View style={styles.ligne}></View>
                                                        <View style={{flexDirection:"row", justifyContent:"flex-end", marginTop:5}}>
                                                               <View ></View>
                                                                      <View style={styles.dateCard}>
                                                                             <Text style={styles.itemDebut}>12/12/1212</Text>
                                                                      </View>   
                                                        </View>
                                                 </View>
                                          </TouchableNativeFeedback>
                            </View>
                     </ScrollView>
              </View>
       )
}

const styles = StyleSheet.create({
       container:{
              flex:1
       },
       title:{
              marginHorizontal: 20
       },
       histoTitle:{
              fontSize: 20,
              color:"#777",
              fontWeight:"bold"
       },
       cardPrincipal:{
              marginHorizontal: 20,
              padding: 10,
              backgroundColor:"#fff",
              borderRadius:10,
              elevation:8,
              borderWidth:2,
              borderColor:"#fff",
              marginTop:10,
              marginBottom:10
       },
       cardImage:{
              width:50,
              height:50,
              backgroundColor:"#777",
              borderRadius:50,
              alignItems:"center",
              justifyContent:"center"
       },
       cardDescripetion:{
              marginLeft: 10
       },
       itemTitle:{
              fontSize: 12,
              fontWeight:"bold",
       },
       itemDescription:{
              fontSize: 12,
              color:"#777",
              fontWeight:"bold"
       },
       itemDescription1:{
              fontSize: 12,
              color:"#777",
       },
       cardPosition:{
              flexDirection:"row",
              alignItems:"center",
              alignContent:"center"
       },
       ligne:{
              borderTopWidth:1,
              marginTop: 10,
              borderTopColor:"#F58424"
       },
       itemDebut:{
              fontSize: 12,
              color:"#fff",
              // fontWeight:"bold",
       },
       dateCard:{
              // fontSize:12,
              backgroundColor:"#777",
              minWidth:"45%",
              borderRadius:10,
              justifyContent:"center",
              alignItems:"center",
              marginTop: 8
       },


})