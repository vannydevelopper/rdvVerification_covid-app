import React, { useRef, useState, useEffect } from 'react'
import { ScrollView, Text, StyleSheet, View, useWindowDimensions, StatusBar, Image, TouchableOpacity, ImageBackground } from "react-native";
import { Button, Icon, Input, FormControl, WarningOutlineIcon } from 'native-base'
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { primaryColor } from '../../styles';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location'
import fetchApi from '../../helpers/fetchApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { setUserAction } from '../../store/actions/userActions';

export default function LoginScreen() {
        const { height } = useWindowDimensions()
        const passwordInputRef = useRef(null)
        const [USERNAME, setEmail] = useState("");
        const dispatch=useDispatch()
        const [USER_PASSWORD, setPassword] = useState("");
        const [location, setLocation] = useState(null)
        const [loading, setLoading] = useState(false);
        const [showPassword, setShowPassword] = useState(false)
        const [errors, setErrors] = useState(null);
        const navigation = useNavigation()

        const handleLogin = async () => {
                 setLoading(true);
                if (!location) {
                        let { status: locationStatus } = await Location.requestForegroundPermissionsAsync();
                        if (locationStatus !== 'granted') {
                                return setLoading(false)
                        }
                        var loc = await Location.getCurrentPositionAsync({});
                        setLocation(loc)
                }
                const user = {
                        USERNAME,
                        USER_PASSWORD,
                        lat: location?.coords?.latitude,
                        long: location?.coords?.longitude,
                };
                // console.log(user)
                setErrors(null)
                try {
                        const userData = await fetchApi ("/users/login", {
                                  method: "POST",
                                  body: JSON.stringify(user),
                                  headers: { "Content-Type": "application/json" },
                        });
                        await AsyncStorage.setItem("user", JSON.stringify(userData));
                        dispatch(setUserAction(userData));
                        setLoading(false);
              }
               catch (error) {
                        console.log(error)
                        setErrors(error.errors)
              }
              setLoading(false);
        }
        const askLocationPermission = async () => {
                let { status: locationStatus } = await Location.requestForegroundPermissionsAsync();
                if (locationStatus !== 'granted') {
                        console.log('Permission to access location was denied');
                        setLocation(false)
                        return;
                }
                var location = await Location.getCurrentPositionAsync({});
                setLocation(location)
        }
        useEffect(() => {
                askLocationPermission()
        }, [])
        if (location === false) {
                return <View style={{ alignContent: 'center', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 16, opacity: 0.8 }}>
                                Pas d'accès à la localisation
                        </Text>
                        <Text style={{ textAlign: 'center', color: '#777', marginTop: 10, paddingHorizontal: 10 }}>
                                L'application a besoin de votre localisation pour fonctionner
                        </Text>
                        <TouchableNativeFeedback
                                background={TouchableNativeFeedback.Ripple('#ddd')}
                                useForeground={true}
                                onPress={() => askLocationPermission()}
                        >
                                <View style={{ backgroundColor: '#fff', borderRadius: 10, padding: 10, marginTop: 20 }}>
                                        <Text>
                                                Autoriser l'accès
                                        </Text>
                                </View>
                        </TouchableNativeFeedback>
                </View>

        }

        return (
                <View style={{ flex: 1 }}>
                        {/* <ImageBackground imageStyle={{ flex: 1, resizeMode: "contain", opacity: 0.5, transform: [{ scale: 2 }], alignSelf: "center", height: "100%" }} source={require('../../../assets/images/home3.png')}> */}
                        <ScrollView keyboardShouldPersistTaps="handled">
                                <View style={styles.container}>
                                        <Image source={require('../../../assets/login.png')} style={{ ...styles.image, resizeMode: "center", height: (30 * height - StatusBar.currentHeight) /100 }} />
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
                                                value={USERNAME}
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
                                        <View>
                                        {errors&&<Text style={styles.textcolor}>{errors.main}</Text>}
                                        </View>
                                        <FormControl isInvalid={errors && errors.password}>
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
                                                value={USER_PASSWORD}
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
                                        {errors && errors.password &&<FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                                                {errors.password}
                                        </FormControl.ErrorMessage>}
                                        </FormControl>
                                        <TouchableOpacity>
                                                <Text style={styles.forgetPass}>Mot de passe oublié</Text>
                                        </TouchableOpacity>

                                        <Button
                                                borderRadius={15}
                                                isDisabled={USERNAME == "" || USER_PASSWORD == ""}
                                                isLoading={loading}
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
        textcolor:{
                color:"red"
        }
})