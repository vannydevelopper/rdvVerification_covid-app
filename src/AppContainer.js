import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import RootNavigator from "./routes/RootNavigator";
import LoginScreen from "./screens/auth/LoginScreen";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setUserAction } from "./store/actions/userActions";
import { userSelector } from "./store/selectors/userSelector";
import { ActivityIndicator, View } from "react-native";
const Stack = createNativeStackNavigator()

export default function AppContainer(){
        const dispatch=useDispatch()
        const user = useSelector(userSelector)
        const [userLoading, setUserLoading] = useState(true)
        useEffect(()=>{
                (async function(){
                       const user = await AsyncStorage.getItem("user")
                //        await AsyncStorage.removeItem('user')
                       dispatch(setUserAction(JSON.parse(user)))
                       setUserLoading(false)
                }) ()
         },[dispatch])

        return(userLoading ?
                <View style={{ flex: 1, alignContent: 'center', alignItems: 'center', justifyContent: 'center' }}>
                                        <ActivityIndicator color="#007BFF" animating={userLoading} size='large' />
                              </View> :
                <>
                <NavigationContainer>
                        <Stack.Navigator>
                                { !user?
                                <Stack.Screen name="Login" component={LoginScreen} options={{headerShown:false}}/>:
                                <Stack.Screen name="Root" component={RootNavigator} options={{headerShown:false}}/>
                                }
                        </Stack.Navigator>
                </NavigationContainer>
                </>
        )
}