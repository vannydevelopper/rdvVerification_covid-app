import React, { useRef, useState, useEffect } from 'react'
import { ScrollView, Text, StyleSheet, View, useWindowDimensions, StatusBar, Image, TouchableOpacity, ImageBackground } from "react-native";
import { Button, Icon, Input, FormControl, WarningOutlineIcon } from 'native-base'
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { primaryColor } from '../../styles';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
        const { height } = useWindowDimensions()
        const passwordInputRef = useRef(null)
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const [showPassword, setShowPassword] = useState(false)
        const navigation = useNavigation()

        const handleLogin = async () => {
                navigation.navigate("Root")
        }

        return (
                <View style={{ flex: 1}}>
                        {/* <ImageBackground imageStyle={{ flex: 1, resizeMode: "contain", opacity: 0.5, transform: [{ scale: 2 }], alignSelf: "center", height: "100%" }} source={require('../../../assets/images/home3.png')}> */}
                        <ScrollView keyboardShouldPersistTaps="handled">
                                <View style={styles.container}>
                                        <Image source={require('../../../assets/images/Mediabox.png')} style={{ ...styles.image, resizeMode: "center", height: (20 * height - StatusBar.currentHeight) / 100 }} />
                                        <Text style={styles.title}>Connexion</Text>
                                        <Input
                                                placeholder='Email ou numéro de téléphone'
                                                InputLeftElement={
                                                        <Icon
                                                                as={<MaterialIcons name="alternate-email" size={20} color="#777" />}
                                                                size={6}
                                                                mr="2"
                                                                color="muted.400"
                                                        />
                                                }
                                                py={2}
                                                borderWidth={0}
                                                borderBottomWidth={1}
                                                borderBottomColor={'#F58424'}
                                                onChangeText={(em) => setEmail(em)}
                                                value={email}
                                                _focus={{
                                                        borderBottomColor: primaryColor
                                                }}
                                                returnKeyType="next"
                                                blurOnSubmit={false}
                                                onSubmitEditing={() => {
                                                        passwordInputRef.current.focus()
                                                }}
                                                autoCompleteType='off'
                                        />

                                        <Input
                                                placeholder='Mot de passe'
                                                InputLeftElement={
                                                        <Icon
                                                                as={<Ionicons name="lock-closed-outline" size={20} color="#777" />}
                                                                size={6}
                                                                mr="2"
                                                                color="muted.400"
                                                        />}
                                                InputRightElement={
                                                        <Icon
                                                                as={<Ionicons name={!showPassword ? "eye-off-outline" : "eye-outline"} size={20} color="#777" />}
                                                                size={6}
                                                                mr="2"
                                                                color="muted.400"
                                                                onPress={() => setShowPassword(t => !t)}
                                                        />}
                                                secureTextEntry={!showPassword}
                                                onChangeText={(em) => setPassword(em)}
                                                value={password}
                                                py={2}
                                                borderWidth={0}
                                                borderBottomWidth={1}
                                                borderBottomColor={'#F58424'}
                                                _focus={{
                                                        borderBottomColor: primaryColor
                                                }}
                                                returnKeyType="go"
                                                mt={3}
                                                ref={passwordInputRef}
                                        />
                                        <TouchableOpacity>
                                                <Text style={styles.forgetPass}>Mot de passe oublié</Text>
                                        </TouchableOpacity>

                                        <Button
                                                borderRadius={15}
                                                // isDisabled={email == "" || password == ""}
                                                onPress={handleLogin}
                                                mt={5}
                                                backgroundColor={"#F58424"}
                                                py={3.5}
                                                _text={{ color: '#fff', fontWeight: 'bold' }}
                                        >
                                                Se connecter
                                        </Button>

                                        <Button
                                                //onPress={() => navigation.navigate('Registre')}
                                                borderRadius={15}
                                                mt={5}
                                                px={12}
                                                py={3}
                                                size="lg"
                                                backgroundColor={"transparent"}
                                                borderColor={"#F58424"}
                                                borderWidth={1}
                                                _text={{
                                                        fontWeight: 'bold',
                                                        color: "#F58424"
                                                }}
                                        >
                                                S'inscrire
                                        </Button>
                                </View>
                        </ScrollView>
                        {/* </ImageBackground> */}
                </View>
        )
}

const styles = StyleSheet.create({
        container: {
                paddingHorizontal: 20,
                //backgroundColor:"red"
        },
        image: {
                maxWidth: '50%',
                alignSelf: 'center',
                marginTop: 30
        },
        title: {
                marginTop: 30,
                fontSize: 25,
                marginBottom: 25,
                opacity: 0.8,
                alignContent: "center",
                justifyContent: "center",
                alignSelf: "center"
        },
        forgetPass: {
                color: "#F58424",
                textAlign: 'right',
                marginTop: 10
        },
})