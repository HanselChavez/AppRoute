import 'react-native-reanimated';
import 'react-native-gesture-handler';
import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// Fuentes
import * as SplashScreen from "expo-splash-screen";
import { useFonts, Kadwa_400Regular, Kadwa_700Bold } from "@expo-google-fonts/kadwa";

// Contexto de autenticación
import { AuthProvider, useAuth } from "./src/context/AuthContext";

// Navegadores
import AuthNavigator from "./src/navigation/AuthNavigator";
import AppNavigator from "./src/navigation/AppNavigator";

// Mantiene el splash hasta que esté todo listo
SplashScreen.preventAutoHideAsync();

function MainNavigator() {
    const { user, loading, logout } = useAuth();

  // Espera a que cargue el estado del usuario
  if (loading) return null;

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
  const [fontsLoaded] = useFonts({
    Kadwa_400Regular,
    Kadwa_700Bold,
  });

  // Oculta el splash cuando ya están listas las fuentes
  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // Mientras no carguen las fuentes, sigue en splash
  if (!fontsLoaded) return null;

  return (
    <AuthProvider>
      <MainNavigator />
    </AuthProvider>
  );
}
 