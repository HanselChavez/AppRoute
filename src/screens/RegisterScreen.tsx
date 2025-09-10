import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function RegisterScreen() {
    const navigation = useNavigation<any>();
    return (
        <View className="flex-1 justify-center items-center bg-white px-6">
            <Text className="text-2xl font-bold mb-6">Crear Cuenta</Text>

            <TextInput
                placeholder="Nombre completo"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4"
            />
            <TextInput
                placeholder="Correo electrónico"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4"
            />
            <TextInput
                placeholder="Contraseña"
                secureTextEntry
                className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4"
            />
            <TextInput
                placeholder="Confirmar contraseña"
                secureTextEntry
                className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-6"
            />

            <TouchableOpacity className="bg-green-500 w-full py-3 rounded-lg">
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
