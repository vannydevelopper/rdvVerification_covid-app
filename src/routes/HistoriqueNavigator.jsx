import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HistoriqueScreen from "../screens/historiques/HistoriqueScreen";

const Stack = createNativeStackNavigator()

export default function HistoriqueNavigator() {
        return (
                <Stack.Navigator>
                        <Stack.Screen name="Historique" component={HistoriqueScreen} options={{headerShown:false}} />
                </Stack.Navigator>
        )

}