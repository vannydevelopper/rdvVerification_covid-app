import React from "react";
import { Text, View, StatusBar, StyleSheet, useWindowDimensions, Image } from "react-native";
import { Button, Icon, Input } from 'native-base'
import { EvilIcons, AntDesign } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen() {
        const { height } = useWindowDimensions()
        const navigation = useNavigation()
        return (
                <View style={{ flex: 1, backgroundColor: '#f1f1f1' }}>
                        <StatusBar backgroundColor="#ddd" barStyle="dark-content" />
                        <View style={styles.header}>
                                <Text style={{ fontSize: 17, fontWeight: 'bold', opacity: 0.5,marginBottom:10 }}>Rendez-vous Test covid-19</Text>
                                <View style={styles.imageContainer}>
                                        <Image source={require('../../../assets/qr.png')} style={{ ...styles.image, }} />
                                </View>

                        </View>

                        <View style={styles.footer}>
                                <Text style={styles.textQrcode}>Scanner le QR Code du Certificat</Text>
                        </View>
                        <Button
                                borderRadius={15}
                                onPress={() => navigation.navigate('Scan')}
                                mt={7}
                                backgroundColor={"#0a5744"}
                                py={3.5}
                                marginHorizontal={80}
                                leftIcon={
                                        <Icon
                                                as={<Icon as={AntDesign} name="scan1" size={'sm'} color="#fff" />}
                                                size={8}
                                                ml="2"
                                                color="#fff"
                                                fontWeight={"bold"}
                                        />
                                }
                                _text={{ color: '#fff', fontWeight: 'bold', fontSize: 20 }}
                        >
                                Scanner
                        </Button>

                </View>
        )
}

const styles = StyleSheet.create({
        header: {
                marginTop: 50,
                justifyContent: "center",
                alignItems: "center",
                // backgroundColor: "#ddd",
                marginHorizontal: 10,
                // borderRadius: 20,
                // borderWidth: 3,
                // borderColor: "#F58424"
        },
        footer: {
                marginHorizontal: 10,
                marginTop: 30,
                justifyContent: "center",
                alignItems: "center",

        },
        imageContainer: {
                backgroundColor: '#fff',
                padding: 10,
                width: '75%',
                alignSelf: 'center',
                height: 250,
                marginTop: 20,
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center'
        },
        image: {
                width: '80%',
                height: '80%',
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