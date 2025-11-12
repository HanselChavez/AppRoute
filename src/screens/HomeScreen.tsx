import React, {useState, useEffect} from "react";
import { View, Text, TouchableOpacity, TextInput, Alert, FlatList, ActivityIndicator } from "react-native";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import { buscarRuta,getAllNodos } from "../services/apiService";
import { useAuth } from "../context/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderApp from "../components/HeaderApp";


export default function HomeScreen() {
  const navigation = useNavigation<any>();
  //DEBUG
    const { login, user, token } = useAuth();

  const [origen, setOrigen] = useState("");
  const [destino, setDestino] = useState("");

  // Control de nodos
  const [nodos, setNodos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Para el autocompletado de  origen y destino
  const [filteredOrigen, setFilteredOrigen] = useState<any[]>([]);
  const [filteredDestino, setFilteredDestino] = useState<any[]>([]);
  const [showOrigenList, setShowOrigenList] = useState(false);
  const [showDestinoList, setShowDestinoList] = useState(false);

  const fetchNodos = async () => {
    setLoading(true);
    setError(false);

    try {
      const data = await getAllNodos();
      setNodos(data);
    } catch (error) {
      //console.error("Error al obtener nodos:", error);
      setError(true); // activa el modo error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNodos();
  }, []);

  // ESTILO DE CADA NODO DE LA LISTA
  const renderNodo = ({ item }: any) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("NodeDetail", { nodo: item })}
      className="flex-1 bg-blue-100 m-2 p-4 rounded-lg items-center justify-center"
    >
      <Text className="text-blue-800 font-semibold">{item.name}</Text>
    </TouchableOpacity>
  );

  // FUNCION PARA BUSCAR RUTA
  const handleBuscar = async () => {
    if (!origen || !destino) {
      Alert.alert("Error", "Debes ingresar origen y destino");
      return; 
    }

    try {
      const data = await buscarRuta(origen, destino); // Llamada al servicio
      console.log("Respuesta API:", data);

      if (!data) {
        Alert.alert("Sin resultados", "No se encontró una ruta entre los puntos ingresados.");
        return;
      }
      // VAMOS A ROUTESCREEN
      navigation.navigate("Route", { rutaResponse: data });
    } catch (error) {
      console.error("Error en buscarRuta:", error);
      Alert.alert("Error", "No se pudo obtener la ruta.");
    }
  };


  //FIltrado dinamico

    const filterNodos = (text: string, type: "origen" | "destino") => {
    const filtered = nodos.filter((n) =>
      n.code.toLowerCase().includes(text.toLowerCase())
    );
    if (type === "origen") {
      setOrigen(text);
      setFilteredOrigen(filtered);
      setShowOrigenList(true);
    } else {
      setDestino(text);
      setFilteredDestino(filtered);
      setShowDestinoList(true);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">

      <View className="flex-1 bg-white px-6">
      {/*  Header */}
        <View className="mt-6">
          <HeaderApp/>
        </View>

        {/* Contenido principal - DATOS DE INICIO DE RUTA */}
        <View className="justify-start items-center mt-10 ">
          {/* ORIGEN */}
          <View className="w-full mb-6 relative">
            <Text className="text-left font-semibold pl-4">Origen</Text>
            <TextInput
              placeholder="Código de origen"
              value={origen}
              onChangeText={(t) => filterNodos(t, "origen")}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-2"
              onBlur={() => setTimeout(() => setShowOrigenList(false), 200)} // Cierra al salir
            />
            {showOrigenList && filteredOrigen.length > 0 && (
              <View className="absolute top-16 left-0 w-full bg-white border border-gray-300 rounded-lg z-10 max-h-40">
                <FlatList
                  data={filteredOrigen}
                  keyExtractor={(item) => item._id}
                  keyboardShouldPersistTaps="handled"
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      className="p-3 border-b border-gray-200"
                      onPress={() => {
                        setOrigen(item.code);
                        setShowOrigenList(false);
                      }}
                    >
                      <Text>{item.code}</Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            )}
          </View>

          {/* DESTINO */}
          <View className="w-full mb-6 relative">
            <Text className="text-left font-semibold pl-4">Destino</Text>
            <TextInput
              placeholder="Código de destino"
              value={destino}
              onChangeText={(t) => filterNodos(t, "destino")}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-2"
              onBlur={() => setTimeout(() => setShowDestinoList(false), 200)}
            />
            {showDestinoList && filteredDestino.length > 0 && (
              <View className="absolute top-16 left-0 w-full bg-white border border-gray-300 rounded-lg z-10 max-h-40">
                <FlatList
                  data={filteredDestino}
                  keyExtractor={(item) => item._id}
                  keyboardShouldPersistTaps="handled"
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      className="p-3 border-b border-gray-200"
                      onPress={() => {
                        setDestino(item.code);
                        setShowDestinoList(false);
                      }}
                    >
                      <Text>{item.code}</Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            )}
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
        <View className="flex-1 justify-up items-center mb-3 ">
          {/* TITULO */}
          <TouchableOpacity>
            <Text className="w-full text-blue-600 font-semibold mt-8 mb-6">
              Salones recurrentes
            </Text>
          </TouchableOpacity>
          {/* Aquí puedes poner una FlatList para los salones recientes */}
          {loading ? (
            <ActivityIndicator size="large" color="#3be688ff" />
          ) : error ? (
            <View className="items-center">
              <Text className="text-red-500 mb-4 text-center">
                No se pudieron cargar los nodos.
              </Text>
              <TouchableOpacity
                onPress={fetchNodos}
                className="bg-blue-500 px-4 py-2 rounded-lg"
              >
                <Text className="text-white font-semibold">Intentar de nuevo</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <FlatList
              className="w-full"
              data={nodos}
              keyExtractor={(item) => item._id}
              numColumns={2}
              renderItem={renderNodo}
              contentContainerStyle={{ paddingBottom: 20 }}
            />
          )}
        </View>

      </View>
      <Text selectable style={{ fontSize: 12 }}>
                  {JSON.stringify({ user, token }, null, 2)}
                  </Text>
    </SafeAreaView>
    
  );
  
  
  
  /*
  <Text selectable style={{ fontSize: 12 }}>
                  {JSON.stringify({ user, token }, null, 2)}
                  </Text>
  
  */
}
