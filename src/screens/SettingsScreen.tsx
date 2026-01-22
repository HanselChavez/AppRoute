import { View, Text, TouchableOpacity, Image } from "react-native";
import { useAuth } from "../context/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderApp from "../components/HeaderApp";
// Pagina para modificar el perfil
    


export default function SettingsScreen() {
  const { login, user, token } = useAuth();
  return (
    <SafeAreaView className="flex-1 bg-white px-6"> 
        <View className="mt-6">  
            <HeaderApp title="Ajustes" />
        </View>
        <View className="flex-row bg-white mt-6">
            {/* Avatar */}
            <View className="items-center mb-6">
                <Image
                source={{
                    uri:
                    "https://cdn-icons-png.flaticon.com/512/149/149071.png",
                }}
                className="w-28 h-28 rounded-full mb-3 border-2 border-gray-300"
                />
                
            </View>

            {/* Datos del usuario */}
            <View className="w-full bg-gray-100 rounded-xl p-4 mb-6 shadow-sm">
                <Text className="text-gray-600 text-base mb-1">
                <Text className="font-semibold">Nombre:</Text> {user?.nombre || "—"}
                </Text>
                <Text className="text-gray-600 text-base mb-1">
                <Text className="font-semibold">Correo:</Text> s + {user?.email || "CORREO_NO_DISPONIBLE"}
                </Text>
                <TouchableOpacity 
                className="text-gray-600 text-base mb-1 mt-4">
                    <Text 
                    className="font-semibold ">
                        Modificar Perfil
                    </Text>
                </TouchableOpacity>
            </View>

            
        </View>
        <View>
            {/* Botón de cerrar sesión */}
            <TouchableOpacity
                
                className="bg-red-500 w-full py-3 rounded-lg shadow-md"
            >
                <Text className="text-center text-white font-semibold text-lg">
                Cerrar Sesión
                </Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
}
