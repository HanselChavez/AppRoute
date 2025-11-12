import React, {useState, useEffect} from "react";
import { View, Text, TouchableOpacity, Image, ActivityIndicator} from "react-native";
import { useAuth } from "../context/AuthContext";
import HeaderApp from "../components/HeaderApp";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput } from "react-native-gesture-handler";
import { getPerfil } from "../services/apiService";
import { Alert } from "react-native";
import { updatePerfil } from "../services/apiService";
import * as ImagePicker from "expo-image-picker";
import Toast from "react-native-toast-message";


// Pagina para modificar el perfil
    


export default function ProfileScreen({ onLogout }: { onLogout: () => void }) {
  const { login, user, token, setUser } = useAuth();
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [imagen, setImagen] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSeleccionarImagen = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
      });

      if (!result.canceled) {
        const image = result.assets[0];
        const imageFile: any = {
          uri: image.uri,
          type: "image/jpeg",
          name: "perfil.jpg",
        };

        setImagen(imageFile);

        // Enviar directamente la actualización al backend
        await handleActualizarDatos(imageFile);
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo abrir la galería.");
    }
  };


  const handleActualizarDatos = async (imageFile?: any) => {
    try {
      if (!nombre || !telefono) {
        Alert.alert("Campos incompletos", "Por favor completa todos los campos.");
        return;
      }

      setLoading(true);

      // Crear objeto con datos del perfil
      const perfilData: any = { nombre, telefono };
      if (imageFile) perfilData.imagen = imageFile;

      const response = await updatePerfil(perfilData);

      // Actualizar usuario local
      if (response.user) {
        setUser(response.user);
      } else {
        const refreshed = await getPerfil();
        setUser(refreshed.user || refreshed);
      }

      // sse muestra el toast o alerta de éxito
      if (imageFile) {
        Alert.alert("✅ Imagen actualizada", "Tu foto de perfil se ha actualizado correctamente.");
      } else {
        Alert.alert("✅ Éxito", "Datos actualizados correctamente.");
      }

      /*  // Esto esta por porbar a futuro xd
      Toast.show({
        type: "success",
        text1: imageFile ? "Imagen actualizada" : "Datos actualizados",
        text2: imageFile
          ? "Tu foto de perfil se cambió correctamente"
          : "Tu información fue actualizada",
      });
      */

    } catch (error: any) {
      Alert.alert("❌ Error", error.message || "No se pudo actualizar el perfil.");
    } finally {
      setLoading(false);
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
          <Image
            source={{
              uri:
                imagen?.uri ||
                user?.foto ||
                "https://cdn-icons-png.flaticon.com/512/149/149071.png",
            }}
            className="w-40 h-40 rounded-full mb-2 border-2 border-gray-300"
            resizeMode="cover"
          />
          {loading && <ActivityIndicator size="large" color="#454e13ff" />}
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
          <TouchableOpacity 
          onPress={handleSeleccionarImagen}
          className="bg-blue-400 w-full py-3 rounded-lg shadow-md my-2">
            <Text className="text-center text-white font-semibold text-lg">
              Subir Foto
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
          onPress={() => handleActualizarDatos()}
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
