import "react-native-reanimated";
import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import {
    useFonts,
    Kadwa_400Regular,
    Kadwa_700Bold,
} from "@expo-google-fonts/kadwa";
import { AuthProvider, useAuth } from "./src/context/AuthContext";

import AuthNavigator from "./src/navigation/AuthNavigator";
import AppNavigator from "./src/navigation/AppNavigator";

SplashScreen.preventAutoHideAsync();

export default function App() {

    let [fontsLoaded] = useFonts({
        Kadwa_400Regular,
        Kadwa_700Bold,
    });

  
    useEffect(() => {
        if (fontsLoaded) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }

 
    return (
        //Navegadores
        <AuthProvider>
            <MainNavigator />
        </AuthProvider>
    );
}

function MainNavigator() {
    const { user, loading, logout } = useAuth();

    if (loading) return null; 

    return (
        <NavigationContainer>
            {user ? <AppNavigator onLogout={logout} /> : <AuthNavigator />}
        </NavigationContainer>
    );
}
