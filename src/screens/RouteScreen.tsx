import React from "react";
import { View, Text, FlatList, Image } from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native";
import { RutaResponse } from "../models/RutaResponse"; 
import { SafeAreaView } from "react-native-safe-area-context";


type RouteParams = {
  Route: { rutaResponse: RutaResponse };
};

export default function RouteScreen() {
  const route = useRoute<RouteProp<RouteParams, "Route">>();
  const { rutaResponse } = route.params;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 bg-white px-2">
        {/* 🔹 Metadatos */}
        <View className="mb-4">
          <Text className="text-lg font-bold">Ruta generada</Text>
          <Text>Fecha: {rutaResponse.metadata.fecha}</Text>
          <Text>Hora: {rutaResponse.metadata.hora}</Text>
        </View>
        {/* 🔹 Lista de nodos */}
        <FlatList
          className=""
          data={rutaResponse.nodos}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View className="flex-row ">
              {/* ICONO ↓↓↓ */}
              <View className="items-center w-1/6">
                {/* CIRCULASOS xd*/}
                <View className="w-10 h-10 rounded-full bg-blue-500 justify-center items-center">
                  <Text className="text-white font-bold">{item.id}</Text>
                </View>
                {/* LINEA*/}
                <View className="w-1 h-36 bg-blue-300" />
                <Text className="text-3xl text-blue-300 -mt-4">▼</Text>
              </View>
              <View className="py-1 w-5/6">
                {/* Mensaje */}
                <View className="">
                  <Text className="text-blue-600 font-semibold pl-4">
                    Camina al punto: {item.mensaje}
                  </Text>
                </View>
                {/* Nodo - TARJETA DEL NODO*/}
                <View className="flex-row border-2 rounded-lg p-2 mt-2 mx-2 border-gray-300">
                  <View className="w-3/5">
                    <Text className="text-sm text-gray-500">ID: {item.id}</Text>
                    <Text className="text-black font-bold">{item.nombre}</Text>
                    <Text className="text-gray-700">{item.descripcion}</Text>
                    <Text className="text-gray-500 mt-2">Lat: {item.lat}</Text>
                    <Text className="text-gray-500">Lng: {item.lng}</Text>
                  </View>
                  <Image
                    className=""
                    source={{ uri: item.imagen }}
                    style={{ width: "40%", height: 150, borderRadius: 8, marginTop: 8 }}
                    resizeMode="cover"
                  />
                </View>
              </View>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}
