import React from "react";
import { View, Text } from "react-native";

export default function NodeDetailScreen({ route }: any) {
  const { nodo } = route.params;

  return (
    <View className="flex-1 bg-white p-6">
        <Text className="text-2xl font-bold mb-4">{nodo.name}</Text>
        <Text className="text-gray-600 mb-2">Código: {nodo.code}</Text>
        <Text className="text-gray-600 mb-2">Edificio: {nodo.building}</Text>
        <Text className="text-gray-600 mb-2">Piso: {nodo.floor}</Text>
        
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
    </View>
  );



  /* Todo esto meter dentro del view si usaras los conexiones, espero q no
  
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
  
  */
}
