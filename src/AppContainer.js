import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import LoginScreen from "./screens/auth/LoginScreen";

const Stack = createNativeStackNavigator()

export default function AppContainer(){
        return(
                <NavigationContainer>
                        <Stack.Navigator>
                                <Stack.Screen name="Login" component={LoginScreen} options={{headerShown:false}}/>
                        </Stack.Navigator>
                </NavigationContainer>
        )
}