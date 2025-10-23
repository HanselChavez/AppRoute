import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../context/AuthContext"; // ESTO TIENE TODO
import Toast from "react-native-toast-message";


export default function RegisterScreen() {
  const navigation = useNavigation<any>();
  const { register } = useAuth(); // LLAMAMOS EL REGISTER DEL CONTEXT

  // Campos
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async () => {
    if (!nombre || !email || !password || !confirmPassword) {
      Alert.alert("Error", "Por favor completa todos los campos.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden.");
      Toast.show({
      type: "success",
      text1: "Las contras no coinciden parte 2 xd",
      });    
      return;
    }

    try {
      // Llamamos al método register del contexto
      await register(nombre, email, password);
    } catch (error: any) {
      Alert.alert("Error", error.message || "Ocurrió un problema al registrar.");
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-white px-6">
      <Text className="text-2xl font-bold mb-6">Crear Cuenta</Text>

      <TextInput
        placeholder="Nombre completo"
        value={nombre}
        onChangeText={setNombre}
        className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4"
      />
      <TextInput
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4"
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4"
      />
      <TextInput
        placeholder="Confirmar contraseña"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-6"
      />

      <TouchableOpacity
        className="bg-green-500 w-full py-3 rounded-lg"
        onPress={handleRegister}
      >
        <Text className="text-center text-white font-semibold">
          Registrarme
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text className="mt-4 text-blue-600 font-semibold">
          ¿Ya tienes una cuenta? Inicia sesión
        </Text>
      </TouchableOpacity>
    </View>
  );
}
