import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { Host } from "react-native-portalize";
import BotomTabBar from "../components/BotomTabBar";
import HistoriqueNavigator from "./HistoriqueNavigator";
import HomeNavigator from "./HomeNavigator";
import ProfilNavigator from "./ProfilNavigator";

const Bottombar = createBottomTabNavigator()

export default function RootNavigator(){
        return(
                <Host>
                        <Bottombar.Navigator initialRouteName="Home" tabBar={props => <BotomTabBar {...props} />} screenOptions={{ headerShown: false }}>
                               <Bottombar.Screen name="HomeTab" component={HomeNavigator} options={{headerShown:false}}/>
                               <Bottombar.Screen name="HistoriqueTab" component={HistoriqueNavigator}/>    
                               <Bottombar.Screen name="ProfilTab" component={ProfilNavigator}/>    
                        </Bottombar.Navigator>
                </Host>
        )
}