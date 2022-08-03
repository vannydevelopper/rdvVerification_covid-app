import React from "react";
import { Text, View, StatusBar, StyleSheet, useWindowDimensions, Image } from "react-native";
import { Button, Icon, Input } from 'native-base'
import { EvilIcons, AntDesign } from '@expo/vector-icons';

export default function HomeScreen() {
        const { height } = useWindowDimensions()
        return (
                <View style={{ flex: 1, backgroundColor: "#E6E3EA" }}>
                        <StatusBar backgroundColor="#fff" barStyle="dark-content" />
                        <View style={styles.header}>
                                {/* <Image source={require('../../../assets/images/home.png')} style={{ ...styles.image, resizeMode: "center", height: (20 * height - StatusBar.currentHeight) / 100 }}/> */}
                                <Text style={styles.titlePrincipal}>Bienvenue sur l'application  </Text>
                                <Text style={styles.titleSecondaire}>de verification de </Text>
                                <Text style={styles.titleAccessoire}> demande de rendez-vous </Text>
                        </View>

                        <View style={styles.footer}>
                                <Text style={styles.textQrcode}>Scaner le Qr Code du Certidicat</Text>
                        </View>
                        <Button
                                borderRadius={15}
                                //     onPress={()=>navigation.navigate('Scan')}
                                mt={7}
                                backgroundColor={"#F58424"}
                                py={3.5}
                                marginHorizontal={80}
                                leftIcon={
                                        <Icon
                                                as={<Icon as={AntDesign} name="scan1" size={'sm'} color="#fff" />}
                                                size={8}
                                                ml="2"
                                                color="#369c69"
                                                fontWeight={"bold"}
                                        />
                                }
                                _text={{ color: '#fff', fontWeight: 'bold', fontSize: 20 }}
                        >
                                Scan
                        </Button>

                </View>
        )
}

const styles = StyleSheet.create({
        header: {
                height: "45%",
                marginTop: 20,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#ddd",
                marginHorizontal: 10,
                borderRadius: 20,
                borderWidth: 3,
                borderColor: "#fff"
        },
        footer: {
                marginHorizontal: 10,
                marginTop: 30,
                justifyContent: "center",
                alignItems: "center",

        },
        image: {
                Width: '100%',
                alignSelf: 'center',
                marginTop: 30
        },
        titlePrincipal: {
                fontSize: 25,
                fontWeight: "bold"
        },
        titleSecondaire: {
                fontSize: 25,
                fontWeight: "bold"
        },
        titleAccessoire: {
                fontSize: 25,
                fontWeight: "bold"
        },
        textQrcode: {
                fontSize: 20,
                color: "#777",
        }
})