import React from "react";
import { ImageBackground, Text, View, StyleSheet, TouchableNativeFeedback, ScrollView } from "react-native";
import { FontAwesome5, EvilIcons, AntDesign, Feather, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import ProfilCard from "../../components/ProfilCard";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../../store/selectors/userSelector";
import { Entypo } from '@expo/vector-icons';
const Profil = () =>{
       //const dispatch=useDispatch()
       const user=useSelector(userSelector)
       return(
              <View style={styles.bottomContainer}>
                     <ProfilCard/>
                     <View style={styles.detailCard}>
                            <View style={styles.cardImage}>
                                   <View style={styles.imagecard}>
                                          <EvilIcons name="user" size={35} color="#F58424" />
                                   </View>
                                   <View style={styles.names}>
                                          <Text style={styles.itemTitle}>Nom</Text>
                                          <Text style={styles.itemValue}>{user.user.USER_FNAME}</Text>
                                   </View>
                            </View>
                            <View style={styles.cardImage}>
                                   <View style={styles.imagecard}>
                                          <EvilIcons name="user" size={35} color="#F58424" />
                                   </View>
                                   <View style={styles.names}>
                                          <Text style={styles.itemTitle}>Prenom</Text>
                                          <Text style={styles.itemValue}>{user.user.USER_LNAME}</Text>
                                   </View>
                            </View>
                            <View style={styles.cardImage}>
                                   <View style={styles.imagecard}>
                                   <Entypo name="mail" size={24} color="#F58424" />
                                   </View>
                                   <View style={styles.names}>
                                          <Text style={styles.itemTitle}>Email</Text>
                                          <Text style={styles.itemValue}>{user.user.USER_EMAIL}</Text>
                                   </View>
                            </View>
                     </View>
              </View>
       )
}

export default function ProfilScreen(){
       //const dispatch=useDispatch()
       const user=useSelector(userSelector)
       //console.log(user)
       return(
                <View style={{ flex: 1, marginVertical: 30 }}>
                     <ScrollView keyboardShouldPersistTaps="handled">
                            <Profil/>
                     </ScrollView>   
                </View>
       )
}

const styles = StyleSheet.create({
       container:{
              flex: 1,
              // backgroundColor: "#000",
       },
       detailCard: {
              backgroundColor: '#fff',
              padding: 10,
              paddingBottom: 0,
              // paddingBottom: 0,
              marginBottom: 10,
              borderRadius: 15,
              width: '90%',
              alignSelf: 'center',
              marginTop: 20,
              elevation: 10,
              shadowColor: '#c4c4c4',
       },
       cardImage: {
              flexDirection: "row",
              // marginTop: 5,
              marginBottom: 10
       },
       imagecard: {
              width: 50,
              height: 50,
              backgroundColor: "#DCE4F7",
              borderRadius: 50,
              alignItems: "center",
              justifyContent: "center"
       },
       names: {
              marginLeft: 10,

       },
       itemTitle: {
              fontSize: 15
       },
       itemValue: {
              opacity: 0.8,
              fontWeight: 'bold',
              color: '#777'
       },
})