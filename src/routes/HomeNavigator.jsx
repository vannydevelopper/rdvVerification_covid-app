import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/home/HomeScreen";
import ScanQrCodeScreen from "../screens/home/ScanQrCodeScreen";
import InformationScreen from "../screens/home/InformationScreen";

const Stack = createNativeStackNavigator()

export default function HomeNavigator(){
        return(
                <Stack.Navigator>
                        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown:false}}/>
                        <Stack.Screen name="Scan" component={ScanQrCodeScreen} options={{headerShown:false}}/>
                        <Stack.Screen name="Information" component={InformationScreen} options={{headerShown:false}}/>
                </Stack.Navigator>
        )
}