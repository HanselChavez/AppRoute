import 'react-native-reanimated';
import 'react-native-gesture-handler';
import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
//import AsyncStorage from "@react-native-async-storage/async-storage";
//Esto para usar fuentes
import * as SplashScreen from "expo-splash-screen";
import { useFonts, Kadwa_400Regular, Kadwa_700Bold } from "@expo-google-fonts/kadwa";
import { AuthProvider, useAuth } from "./src/context/AuthContext";




import AuthNavigator from "./src/navigation/AuthNavigator";
import AppNavigator from "./src/navigation/AppNavigator";

//Esto deja todo en el logo si no hay nada cargado
SplashScreen.preventAutoHideAsync();


function MainNavigator() {
  const { user, loading, logout } = useAuth();

  if (loading) return null; // sigue splash screen
  
  return (
    <NavigationContainer>
      {user ? (
        <AppNavigator onLogout={logout} />
      ) : (
        <AuthNavigator />
      )}
    </NavigationContainer>
  );
}

/*
    <NavigationContainer>
      {user ? (
        <AppNavigator onLogout={logout} />
      ) : (
        <AuthNavigator />
      )}
    </NavigationContainer>

    Otro

    <NavigationContainer>

        <AppNavigator onLogout={logout}/>

    </NavigationContainer>    

 */


export default function App() {
  //const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  //const [loading, setLoading] = useState<boolean>(true); // Para mostrar pantalla de carga mientras revisamos

  //FUENTES varidas
  let [fontsLoaded] = useFonts({
    Kadwa_400Regular,
    Kadwa_700Bold,
  });

  /* ESTO YA NO PORQUE LO MOVIMOS EN EL CONTEXT - BORRADO
  //ESTO SERA UN LOOp que revisara el auth
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
  */

  // Esto oculta el splash cuando las fuentes y la carga están listas fll
  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // Si aún no está todo listo, no mostrar nada (sigue el splash)
  if (!fontsLoaded) {
    return null;
  }

  /* ESTO TAMBIEN FUE MOVIDO AL CONTEXT - BORRADO
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
  */
  return ( //Navegadores
    <AuthProvider>
      <MainNavigator />
    </AuthProvider>
    
  );
}
