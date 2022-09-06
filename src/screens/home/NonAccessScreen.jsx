import React from "react";
import { View, Text, TouchableNativeFeedback, Image, StyleSheet} from 'react-native'
import NotFound from "../../components/NotFound";
import {Ionicons} from '@expo/vector-icons';
import { useNavigation, useRoute } from "@react-navigation/native";
import { userSelector } from '../../store/selectors/userSelector';
import {useSelector } from "react-redux";
export default function NonAccessScreen(){
    return (
        <View>

            <Text>Hello</Text>
        </View>
    )
}