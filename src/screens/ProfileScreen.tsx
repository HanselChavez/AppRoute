import { View, Text, TouchableOpacity, Image } from "react-native";
import { useAuth } from "../context/AuthContext";
// Pagina para modificar el perfil


export default function ProfileScreen({ onLogout }: { onLogout: () => void }) {
    const { login, user, token } = useAuth();
  return (
    <View className="flex-1 bg-white items-center justify-center px-6">
      {/* Avatar */}
      <View className="items-center mb-6">
        <Image
          source={{
            uri:
              "https://cdn-icons-png.flaticon.com/512/149/149071.png",
          }}
          className="w-28 h-28 rounded-full mb-3 border-2 border-gray-300"
        />
        <Text className="text-2xl font-bold text-gray-800">👤 Perfil</Text>
      </View>

      {/* Datos del usuario */}
      <View className="w-full bg-gray-100 rounded-xl p-4 mb-6 shadow-sm">
        <Text className="text-gray-600 text-base mb-1">
          <Text className="font-semibold">Nombre:</Text> {user?.nombre || "—"}
        </Text>
        <Text className="text-gray-600 text-base mb-1">
          <Text className="font-semibold">Correo:</Text> {user?.email || "CORREO_NO_DISPONIBLE"}
        </Text>
      </View>

      {/* Botón de cerrar sesión */}
      <TouchableOpacity
        onPress={onLogout}
        className="bg-red-500 w-full py-3 rounded-lg shadow-md"
      >
        <Text className="text-center text-white font-semibold text-lg">
          Cerrar Sesión
        </Text>
      </TouchableOpacity>
    </View>
  );
}
