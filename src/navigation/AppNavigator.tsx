import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Text, TouchableOpacity, View,Image } from "react-native";
import { useAuth } from "../context/AuthContext";

//Aqui pon las pantallitas que ameritan xd
import HomeScreen from "../screens/HomeScreen";
import RouteScreen from "../screens/RouteScreen";
import NodeDetailScreen from "../screens/NodeDetailScreen";

//aqui pantallas de navegacion
import SettingsScreen from "../screens/SettingsScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import ProfileScreen from "../screens/ProfileScreen";


const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ animation: "fade" }}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Route"
        component={RouteScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="NodeDetail" 
        component={NodeDetailScreen}
        options={{ headerShown: false }}
      />

    </Stack.Navigator>
  );
}

//CustomDrawer personalizado uu
function CustomDrawerContent(props: any) {
  const { logout, user } = useAuth(); // Obtenemos la función logout

  return (
    <View className="flex-1 mt-16">
      {/* Header con círculo */}
      <View className="w-32 h-32 rounded-full bg-gray-200 self-center my-6">
        {user?.foto ? (
          <Image
            source={{ uri: user.foto }}
            className="w-full h-full"
            resizeMode="cover"
          />
        ) : (
          <Image
            source={{uri: "https://cdn-icons-png.flaticon.com/512/149/149071.png"}}
            className="w-full h-full"
            resizeMode="cover"
          />
        )}
        <Text className="mt-3 text-lg font-semibold items-center text-center">
          {user?.nombre || "Invitado"}
        </Text>
      </View>
      
      {/* Pantallas normales */}
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      {/* Botón de cerrar sesión */}
      <TouchableOpacity
        className="bg-red-500 py-3 mx-4 mb-6 rounded-lg"
        onPress={logout} // Ahora llama directamente al logout del contexto
      >
        <Text className="text-center text-white font-semibold">
          Cerrar sesións
        </Text>
      </TouchableOpacity>
    </View>
  );
}


// PRINCIPAL de aqui llama a la funciona de arriba para seguir la navegacion normal
// Esto va asi por que asi se puede tener el menu lateral en todas las pantallas
// y no solo en la principal
export default function AppNavigator({ onLogout }: { onLogout: () => void }) {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerType: "front",
        drawerPosition: "left",
        overlayColor: "rgba(0, 0, 0, 0.5)",
        headerTintColor: "#744444ff",
        drawerActiveBackgroundColor: "#d3d3d3ff", // Color de fondo del ítem activo
        drawerActiveTintColor: "#000000ff",
        drawerItemStyle: { 
          marginHorizontal: 0,
          borderRadius: 0
        }
      }} 
    drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="       INICIO" component={HomeStack} />
      <Drawer.Screen name="       AJUSTES">
        {() => <ProfileScreen onLogout={onLogout} />}
      </Drawer.Screen>
      <Drawer.Screen name="       FAVORITOS" component={FavoritesScreen} />
    </Drawer.Navigator>
  );
}