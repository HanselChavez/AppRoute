
import { View, Text } from "react-native";
import { useAuth } from "../context/AuthContext";

export default function FavoritesScreen() {
    const { login, user, token } = useAuth();
  return (
    <View className="flex-1 bg-white items-center justify-center px-6">
      <Text className="text-2xl font-bold text-gray-800">⭐ Favoritos</Text>
      <Text className="text-gray-600 text-base mt-4">
        Aquí se mostrarán tus rutas favoritas.
      </Text>
    </View>
  );
}