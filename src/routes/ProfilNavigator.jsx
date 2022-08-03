import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfilScreen from "../screens/profil/ProfilScreen";

const Stack = createNativeStackNavigator()

export default function ProfilNavigator(){
        return(
                <Stack.Navigator>
                        <Stack.Screen name="Profil" component={ProfilScreen} options={{headerShown:false}}/>
                </Stack.Navigator>
        )
}