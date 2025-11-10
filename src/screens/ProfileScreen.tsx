import React, {useState, useEffect} from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useAuth } from "../context/AuthContext";
import HeaderApp from "../components/HeaderApp";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput } from "react-native-gesture-handler";
import axios from "axios";
import { Alert } from "react-native";
import { updatePerfil } from "../services/apiService";

// Pagina para modificar el perfil
    


export default function ProfileScreen({ onLogout }: { onLogout: () => void }) {
  const { login, user, token } = useAuth();
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");

  const handleActualizarDatos = async () => {
    try {
      if (!nombre || !telefono) {
        Alert.alert("Campos incompletos", "Por favor completa todos los campos.");
        return;
      }
      const response = await updatePerfil({
        nombre,
        telefono,
      });

      Alert.alert("✅ Éxito", response.message || "Perfil actualizado correctamente");
      console.log("Nuevo perfil:", response.user);
    } catch (error: any) {
      Alert.alert("❌ Error", error.message  || "No se pudo actualizar el perfil.");
      //console.error("Error al actualizar:", error); //ESTO DA UN ERROR DE CONSOLA
    }
  };
  useEffect(() => {
  if (user) {
    setNombre(user.nombre || "");
    setTelefono(user.telefono || "");
  }
}, [user]);
  return (
    
    <SafeAreaView className="flex-1 bg-white">
      <View className=" bg-white felx-1 px-6">
        <View className="mt-6">
          <HeaderApp title="Perfil" />
        </View>
        
        {/* Avatar */}
        <View className="items-center mb-6 mt-10">
          {user?.foto ? (
            <Image
              source={{ uri: user.foto }}
              className="w-40 h-40 rounded-full mb-2 border-2 border-gray-300"
              resizeMode="cover"
            />
          ) : (
            <Image
              source={{uri: "https://cdn-icons-png.flaticon.com/512/149/149071.png"}}
              className="w-40 h-40 rounded-full mb-2 border-2 border-gray-300"
              resizeMode="cover"
            />
          )}
        </View>

        {/* Datos del usuario */}
        <View className="w-full bg-gray-100 rounded-xl p-4 mb-6 shadow-sm">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-gray-600 text-base mb-1 w-1/4">
              <Text className="font-semibold">Nombre:</Text>
            </Text>
            <TextInput
              placeholder={user?.nombre || "Introdusca su nombre"}
              value={nombre}
              onChangeText={setNombre}
              className=" rounded-lg flex-1 border border-gray-300 mx-3"
            />
          </View>
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-gray-600 text-base mb-1 w-1/4">
              <Text className="font-semibold">Telefono:</Text>
            </Text>
            <TextInput
              placeholder={user?.telefono || "Introdusca su telefono"}
              value={telefono}
              onChangeText={setTelefono}
              className=" rounded-lg flex-1 border border-gray-300 mx-3"
            />
          </View>
          <TouchableOpacity className="bg-blue-400 w-full py-3 rounded-lg shadow-md my-2">
            <Text className="text-center text-white font-semibold text-lg">
              Subir Foto
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
          onPress={handleActualizarDatos}
          className="bg-black w-full py-3 rounded-lg shadow-md my-2">
            <Text className="text-center text-white font-semibold text-lg">
              Actualizar Datos
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-black w-full py-3 rounded-lg shadow-md my-2">
            <Text className="text-center text-white font-semibold text-lg">
              Cambiar Contraseña
            </Text>
          </TouchableOpacity>

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
    </SafeAreaView>
  );
}
