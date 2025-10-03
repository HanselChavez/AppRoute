import React from "react";
import { View, Text, FlatList, Image } from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native";
import { RutaResponse } from "../models/RutaResponse"; 

type RouteParams = {
  Route: { rutaResponse: RutaResponse };
};

export default function RouteScreen() {
  const route = useRoute<RouteProp<RouteParams, "Route">>();
  const { rutaResponse } = route.params;

  return (
    <View className="flex-1 bg-white p-4">
      {/* 🔹 Metadatos */}
      <View className="mb-4">
        <Text className="text-lg font-bold">Ruta generada</Text>
        <Text>Fecha: {rutaResponse.metadata.fecha}</Text>
        <Text>Hora: {rutaResponse.metadata.hora}</Text>
      </View>

      {/* 🔹 Lista de nodos */}
      <FlatList
        data={rutaResponse.nodos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View className="mb-6">
            {/* Mensaje */}
            <Text className="text-blue-600 font-semibold">{item.mensaje}</Text>

            {/* Nodo */}
            <View className="bg-gray-200 p-4 rounded-lg mt-2">
              <Text className="text-black font-bold">{item.nombre}</Text>
              <Text className="text-gray-700">{item.descripcion}</Text>
              <Image
                source={{ uri: item.imagen }}
                style={{ width: "100%", height: 150, borderRadius: 8, marginTop: 8 }}
                resizeMode="cover"
              />
              <Text className="text-gray-500 mt-2">Lat: {item.lat}</Text>
              <Text className="text-gray-500">Lng: {item.lng}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}
