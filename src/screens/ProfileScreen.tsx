import { View, Text, TouchableOpacity } from "react-native";
// Pagina para modificar el perfil
export default function ProfileScreen({ onLogout }: { onLogout: () => void }) {
  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Text className="text-2xl font-bold mb-6">👤 Perfil2</Text>

      <TouchableOpacity
        onPress={onLogout}
        className="bg-red-500 px-6 py-3 rounded-lg"
      >
        <Text className="text-white font-semibold">Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
}
