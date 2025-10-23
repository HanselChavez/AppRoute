import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../context/AuthContext";

//Aqui pon las pantallitas que ameritan xd
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import RouteScreen from "../screens/RouteScreen";
import NodeDetailScreen from "../screens/NodeDetailScreen";

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
      <View className="items-center mt-10 mb-6 mt-10">
        <View className="w-24 h-24 bg-blue-500 rounded-full items-center justify-center">
          <Text className="text-white text-2xl font-bold">
            {user?.nombre?.[0]?.toUpperCase() || "?"}
          </Text>
        </View>
        <Text className="mt-3 text-lg font-semibold">
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
      }}
    drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="                   Inicio" component={HomeStack} />
      <Drawer.Screen name="       👤       Perfil">
        {() => <ProfileScreen onLogout={onLogout} />}
      </Drawer.Screen>
      <Drawer.Screen name="       ⭐       Favoritos" component={HomeStack} />
      <Drawer.Screen name="       🔧       Ajustes" component={HomeStack} />
    </Drawer.Navigator>

  );
}
