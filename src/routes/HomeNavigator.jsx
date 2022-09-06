import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/home/HomeScreen";
import ScanQrCodeScreen from "../screens/home/ScanQrCodeScreen";
import InformationScreen from "../screens/home/InformationScreen";
import PhotoScreen from "../screens/home/PhotoScreen";
import NotFoundScreen from "../screens/home/NotFoundScreen";
import ResultatTestSCreens from "../screens/home/ResultatTestScreens";
import ValidationScren from "../screens/home/ValidationScren";
import ApresValidationScreen from "../screens/home/ApresValidationScreen";
import NonAccessScreen from "../screens/home/NonAccessScreen";

const Stack = createNativeStackNavigator()

export default function HomeNavigator(){
        return(
                <Stack.Navigator>
                        {/* <Stack.Screen name="Home" component={ResultatTestSCreens} options={{headerShown:false}}/> */}
                        {/* <Stack.Screen name="Home" component={ValidationScren} options={{headerShown:false}}/> */}
                        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown:false}}/>
                        <Stack.Screen name="Scan" component={ScanQrCodeScreen} options={{headerShown:false}}/>
                        <Stack.Screen name="Information" component={InformationScreen} options={{headerShown:false}}/>
                        <Stack.Screen name="Photo" component={PhotoScreen} options={{headerShown:false}}/>
                        <Stack.Screen name="Not" component={NotFoundScreen} options={{headerShown:false}}/>
                        <Stack.Screen name="Resultat" component={ResultatTestSCreens} options={{headerShown:false}}/>
                        <Stack.Screen name="Validation" component={ValidationScren} options={{headerShown:false}}/>
                        <Stack.Screen name="apresvalidation" component={ApresValidationScreen} options={{headerShown:false}}/>
                        <Stack.Screen name="nonDroit" component={NonAccessScreen} options={{headerShown:false}}/>
                </Stack.Navigator>
        )
}