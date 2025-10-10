import React, {useState} from "react";
import { View, Text, TouchableOpacity, TextInput, Alert } from "react-native";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import { buscarRuta } from "../services/apiService";
import { useAuth } from "../context/AuthContext";



export default function HomeScreen() {
  const navigation = useNavigation<any>();
  //DEBUG
    const { login, user, token } = useAuth();

  const [origen, setOrigen] = useState("");
  const [destino, setDestino] = useState("");

  // FUNCION PARA BUSCAR RUTA
  const handleBuscar = async () => {
    if (!origen || !destino) {
      Alert.alert("Error", "Debes ingresar origen y destino");
      return; 
    }

    try {
      const data = await buscarRuta(origen, destino); // Llamada al servicio
      console.log("Respuesta API:", data);

      // VAMOS A ROUTESCREEN
      navigation.navigate("Route", { rutaResponse: data });
    } catch (error) {
      console.error("Error en buscarRuta:", error);
      Alert.alert("Error", "No se pudo obtener la ruta.");
    }
  };


  return (
    <View className="flex-1 bg-white px-6">
      {/* 🔹 Header */}
      <View className=" w-full flex-row items-center mt-14">
        {/* MENU */}
        <View className="flex-1 items-start">
          <TouchableOpacity
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          >
            <Text className="text-3xl font-bold">☰</Text>
          </TouchableOpacity>
        </View>
        {/* TITULASO */}
        <View 
        className="absolute left-0 right-0 flex-1 items-center">
          <Text
            style={{ fontFamily: "Kadwa_700Bold", fontSize: 30 }}
            className=" font-bold"
          >
            APPROUTE
          </Text>
        </View>
        {/* ESPACIO */}
        <View className="flex-1 "></View>
      </View>

      {/* 🔹 Contenido principal - DATOS DE INICIO DE RUTA */}
      <View className="justify-start items-center mt-10 ">
        {/* ORIGEN */}
        <View className="w-full">
          <Text className="text-left font-semibold pl-4">Origen</Text>
          <TextInput
            placeholder="Introduzca el código"
            value={origen}
            onChangeText={setOrigen}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 mt-2"
          />
        </View>
        {/* DESTINO */}
        <View className="w-full">
          <Text className="text-left font-semibold pl-4">Destinos</Text>
          <TextInput
            placeholder="Introduzca el código"
            value={destino}
            onChangeText={setDestino}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 mt-2"
          />
        </View>

        {/* BOTON DE BUSCAR */}
        <TouchableOpacity
          className="bg-blue-500 w-full py-3 rounded-lg"

          //onPress={() => navigation.navigate("Route")} // ESTO CAMBIAR PARA QUE SIGA LA LOGICA ■■■■■■■
          onPress={handleBuscar}
        >
          <Text className="text-center text-white font-semibold">
            Buscar salon
          </Text>
        </TouchableOpacity>
      </View>

      {/* busquedas recientes */}
      <View className="flex-1 justify-up items-center ">
        {/* TITULO */}
        <TouchableOpacity>
          <Text className="w-full text-blue-600 font-semibold mt-8">
            Salones recurrentes2
          </Text>
        </TouchableOpacity>
        {/* Aquí puedes poner una FlatList para los salones recientes */}
        <View className="w-full mt-8 p-4">
          <Text className="text-gray-500">No hay salones recientes</Text>
          <Text className="text-gray-500">No hay salones recientes</Text>
          <Text className="text-gray-500">No hay salones recientes</Text>
          <Text className="text-gray-500">No hay salones recientes</Text>
        </View>
      </View>
      <Text selectable style={{ fontSize: 12 }}>
                  {JSON.stringify({ user, token }, null, 2)}
                  </Text>
    </View>
  );
}
