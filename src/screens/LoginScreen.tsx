import { View, Text, TextInput, TouchableOpacity,Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext"; // <-- usamos el contexto
import Toast from "react-native-toast-message";
//Solo debug
import AsyncStorage from "@react-native-async-storage/async-storage";
import HomeScreen from "./HomeScreen";
import { SafeAreaView } from "react-native-safe-area-context";




export default function LoginScreen() {
  const navigation = useNavigation<any>()
  const { login, user, token } = useAuth(); // función login del AuthContext

  // Campos de formulario
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Simula o llama al backend real
  const handleLoginPress = async () => {
    try {
      // ESTE PARA ENTRAR TODAS LAS VECES Xd
      const fakeToken = "abc123"; 

      // HACEMOS EL LLAMaDO
      await login(email, password);

      // para susar el falso :    await login(fakeToken)
    } catch (error) {
      console.log("Error al iniciar sesión:", error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 justify-center items-center bg-white px-6">
        <Image
          source={require("../../assets/splash-icon.png")}
          resizeMode="cover"
          className="w-72 h-24"
        />
        <Text className="text-2xl font-bold mb-6">Iniciar Sesión</Text>

        <TextInput
          placeholder="Correo electrónico"
          value={email}
          onChangeText={setEmail}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4"
        />

        <TextInput
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4"
        />

        <TouchableOpacity
          className="bg-black w-full py-3 rounded-lg"
          onPress={handleLoginPress}
        >
          <Text className="text-center text-white font-semibold">Ingresar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text className="mt-4 text-blue-600 font-semibold">
            ¿No tienes una cuenta? Regístrates
          </Text>

        </TouchableOpacity>

        <Toast />



      </View>
    </SafeAreaView>


    
  );
}
/*

        <Text selectable style={{ fontSize: 12 }}>
            {JSON.stringify({ user, token }, null, 2)}
            </Text>
*/