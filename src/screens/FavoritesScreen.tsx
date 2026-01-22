import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import HeaderApp from "../components/HeaderApp";
import { getRutasRecientes } from "../services/apiService";
import { useAuth } from "../context/AuthContext";

export default function FavoritesScreen() {
  const navigation = useNavigation<any>();
  const { user, token } = useAuth();

  const [rutas, setRutas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchRutasRecientes = async () => {
    setLoading(true);
    setError(false);

    try {
      const data = await getRutasRecientes();
      setRutas(data || []);
    } catch (err) {
      console.error("Error al obtener rutas recientes:", err); //ESTO DESVELAR PARA DEVSS
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRutasRecientes();
  }, []);

  // Render de cada item de la lista
  const renderItem = ({ item }: any) => {
    const origen = item.nodos[0]?.nombre || "Origen desconocido";
    const destino = item.nodos[item.nodos.length - 1]?.nombre || "Destino desconocido";
    const fecha = item.metadata?.fecha;
    const hora = item.metadata?.hora;

    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("Route", { rutaResponse: item })}
        className="bg-green-100 p-4 rounded-xl mb-3 shadow-sm border border-green-200"
      >
        <Text className="text-lg font-semibold text-green-900">
          {origen} ➜ {destino}
        </Text>

        <Text className="text-gray-600 text-sm mt-1">
          Fecha: {fecha}
        </Text>

        <Text className="text-gray-600 text-sm">
          Hora: {hora}
        </Text>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-white items-center justify-center">
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text className="text-gray-600 mt-3">Cargando rutas recientes...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView className="flex-1 bg-white items-center justify-center">
        <Text className="text-red-500 font-semibold mb-2">
          Error al cargar las rutas recientes
        </Text>
        <TouchableOpacity
          onPress={fetchRutasRecientes}
          className="bg-green-500 px-6 py-2 rounded-lg"
        >
          <Text className="text-white font-semibold">Reintentar</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white px-6">
      <HeaderApp title={"Rutas\nRecientes"} />

      <View className="mt-16 flex-1 ">
        {rutas.length === 0 ? (
          <View className="flex-1 items-center justify-center">
            <Text className="text-gray-600 text-base">
              No tienes rutas recientes aún.
            </Text>
          </View>
        ) : (
          <FlatList
            data={rutas}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
