import React from "react";
import { View, Text, Button, TouchableOpacity, TextInput } from "react-native";
import { useNavigation, DrawerActions } from "@react-navigation/native";

export default function HomeScreen() {
  const navigation = useNavigation<any>();

  return (
    <View className="flex-1 bg-white px-6">
      {/* 🔹 Header */}
      <View className="w-full flex-row items-center pt-10 mt-10">
        {/* Botón menú a la izquierda */}
        <TouchableOpacity
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        >
          <Text className="text-2xl">  ☰  </Text>
        </TouchableOpacity>

        {/* Texto centrado */}
        <View className="absolute w-full items-center mt-10">
            <Text 
            style={{ fontFamily: "Kadwa_700Bold", fontSize: 20 }}
            className="text-xl font-bold"
            >
                APPROUTE
            </Text>
        </View>
      </View>

      {/* 🔹 Contenido principal */}
      <View className="flex-1 justify-up items-center mt-10">
        <TextInput
          placeholder="Código"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4"
        />

        <TouchableOpacity
          className="bg-blue-500 w-full py-3 rounded-lg"
          onPress={() => navigation.navigate("Route")}
        >
          <Text className="text-center text-white font-semibold">Buscar salon</Text>
        </TouchableOpacity>
        <TouchableOpacity>
            <Text className="mt-10 text-blue-600 font-semibold">
                Salones recurrentes
            </Text>
        </TouchableOpacity>
        {/* AQUI PONEMOS UNA ESPECIE DE RECICLER VIEW con nodos recientes */}
        
      </View>
      
    </View>
  );
}
