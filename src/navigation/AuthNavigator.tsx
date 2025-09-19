import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import React from "react";

type AuthNavigatorProps = {
    onLogin: (token: string) => void;
};


const Stack = createNativeStackNavigator();

export default function AuthNavigator({ onLogin }: AuthNavigatorProps) {
  return (
    <Stack.Navigator screenOptions={{ animation: "fade" }}>
      <Stack.Screen
        name="Login"
        // Pasamos la prop onLogin al LoginScreen
        // Nota aqui se usa el termino prop a funciones pasadas como objetos
        children={(props) => <LoginScreen {...props} onLogin={onLogin} />}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
