import 'react-native-reanimated';
import 'react-native-gesture-handler';
import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
//Esto para usar fuentes
import * as SplashScreen from "expo-splash-screen";
import { useFonts, Kadwa_400Regular, Kadwa_700Bold } from "@expo-google-fonts/kadwa";



import AuthNavigator from "./src/navigation/AuthNavigator";
import AppNavigator from "./src/navigation/AppNavigator";

//Esto deja todo en el logo si no hay nada cargado
SplashScreen.preventAutoHideAsync();


export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true); // Para mostrar pantalla de carga mientras revisamos

  //FUENTES varidas
  let [fontsLoaded] = useFonts({
    Kadwa_400Regular,
    Kadwa_700Bold,
  });

  // ESTO SERA UN LOOp que revisara el auth
  useEffect(() => {
    const checkLogin = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.log("Error revisando sesión:", error);
      } finally {
        setLoading(false);
      }
    };
    checkLogin();
  }, []);

  // Esto oculta el splash cuando las fuentes y la carga están listas fll
  useEffect(() => {
    if (fontsLoaded && !loading) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, loading]);

  // Si aún no está todo listo, no mostrar nada (sigue el splash)
  if (!fontsLoaded || loading) {
    return null;
  }


  // Esto es pa cambiar a logueado 
  const handleLogin = async (token: string) => {
    try {
      await AsyncStorage.setItem("token", token); // Guardar token
      setIsLoggedIn(true);
    } catch (error) {
      console.log("Error guardando sesión:", error);
    }
  };

  // Esto te desloguea p
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("token");
      setIsLoggedIn(false);
    } catch (error) {
      console.log("Error cerrando sesión:", error);
    }
  };

  if (loading) {
    return null; // XDXDASODAKMSXKDA
  }

  return ( //Navegadores
    <NavigationContainer>
      {isLoggedIn ? (
        <AppNavigator onLogout={handleLogout} /> // LOGEADO
      ) : (
        <AuthNavigator onLogin={handleLogin} /> // NO LOGEADO
      )}
    </NavigationContainer>
  );
}
