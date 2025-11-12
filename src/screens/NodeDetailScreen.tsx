import React from "react";
import { View, Text, Image, ScrollView } from "react-native";

export default function NodeDetailScreen({ route }: any) {
  const { nodo } = route.params;

  return (
    <ScrollView className="flex-1 bg-white p-6">
      {/* Imagen principal */}
      <Image
        source={{ uri: nodo.imagen }}
        style={{ width: "100%", height: 200, borderRadius: 10, marginBottom: 20 }}
        resizeMode="cover"
      />

      {/* Datos del nodo */}
      <Text className="text-2xl font-bold mb-2">{nodo.nombre}</Text>
      <Text className="text-gray-600 mb-1">Código: {nodo.code}</Text>
      <Text className="text-gray-600 mb-1">Edificio: {nodo.building}</Text>
      <Text className="text-gray-600 mb-1">Piso: {nodo.floor}</Text>
      <Text className="text-gray-600 mb-1">Descripción: {nodo.descripcion}</Text>

      {/* Conexiones */}
      <Text className="mt-4 font-semibold">Conexiones:</Text>
      {nodo.connections && nodo.connections.length > 0 ? (
        nodo.connections.map((conn: any, i: number) => (
          <Text key={i} className="text-gray-700">
            → {conn.destination.name} ({conn.weight})
          </Text>
        ))
      ) : (
        <Text className="text-gray-500">Sin conexiones</Text>
      )}
    </ScrollView>
  );
}