import "react-native-reanimated";
import "react-native-gesture-handler";

import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import * as Updates from "expo-updates";
import { NavigationContainer } from "@react-navigation/native";

// fuentes
import * as SplashScreen from "expo-splash-screen";
import { useFonts, Kadwa_400Regular, Kadwa_700Bold } from "@expo-google-fonts/kadwa";

// contexto de autenticacion xd
import { AuthProvider, useAuth } from "./src/context/AuthContext";

// navegadores xd
import AuthNavigator from "./src/navigation/AuthNavigator";
import AppNavigator from "./src/navigation/AppNavigator";

// mantener splash hasta que todo cargue xd
SplashScreen.preventAutoHideAsync();


// ----------------------------------------------------------
// componente principal de navegacion xd
// ----------------------------------------------------------
function MainNavigator() {
  const { user, loading, logout } = useAuth();

  // esperar a que cargue el estado del usuario xd
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



// ----------------------------------------------------------
// app principal con manejo de fuentes + actualizaciones xd
// ----------------------------------------------------------
export default function App() {
  const [updateAvailable, setUpdateAvailable] = useState(false);

  // cargar fuentes xd
  const [fontsLoaded] = useFonts({
    Kadwa_400Regular,
    Kadwa_700Bold,
  });

  // ocultar splash cuando cargan las fuentes xd
  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);


  // checkear actualizaciones solo en produccion xd
  useEffect(() => {
    if (!__DEV__) {
      checkForUpdates();
    }
  }, []);

  // indicar en consola cuando esta en modo dev xd
  if (__DEV__) {
    console.log("modo desarrollo: ota desactivado xd");
  }


  // funcion para ver si hay update xd
  async function checkForUpdates() {
    try {
      const result = await Updates.checkForUpdateAsync();
      if (result.isAvailable) {
        setUpdateAvailable(true);
      }
    } catch (error) {
      console.log("error al chequear updates xd:", error);
    }
  }

  // funcion para aplicar update xd
  async function applyUpdate() {
    try {
      await Updates.fetchUpdateAsync();
      await Updates.reloadAsync();
    } catch (error) {
      console.log("error aplicando update xd:", error);
    }
  }


  // mostrar nada mientras cargan fuentes xd
  if (!fontsLoaded) return null;


  // ----------------------------------------------------------
  // render principal xd
  // ----------------------------------------------------------
  return (
    <AuthProvider>
      <View style={{ flex: 1 }}>
        
        {/* navegacion principal xd */}
        <MainNavigator />

        {/* mensaje flotante si hay update xd */}
        {updateAvailable && (
          <View
            style={{
              position: "absolute",
              bottom: 20,
              left: 20,
              right: 20,
              backgroundColor: "#222",
              padding: 16,
              borderRadius: 10,
              elevation: 5,
            }}
          >
            <Text style={{ color: "white", fontSize: 16, marginBottom: 10 }}>
              Nueva actualización disponible
            </Text>

            <TouchableOpacity
              onPress={applyUpdate}
              style={{
                backgroundColor: "#b42c14ff",
                paddingVertical: 10,
                borderRadius: 8,
                alignItems: "center",
              }}
            >
              <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
                Actualizar ahora
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </AuthProvider>
  );
}
