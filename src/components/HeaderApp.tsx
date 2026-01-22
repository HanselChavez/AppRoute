import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { DrawerActions, useNavigation } from "@react-navigation/native";

interface HeaderAppProps {
  title?: string;
}

export default function HeaderApp({ title = "APPROUTE" }: HeaderAppProps) {
  const navigation = useNavigation();

  return (
    <View className="w-full flex-row items-center mt-7 px-2">
      {/* MENU */}
      <View className="flex-1 items-start">
        <TouchableOpacity
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        >
          <Text 
          className="text-3xl font-bold">☰</Text>
        </TouchableOpacity>
      </View>

      {/* TITULO */}
      <View className="absolute left-0 right-0 flex-1 items-center justify-center">
        <Text
          style={{ 
            fontFamily: "Kadwa_700Bold", 
            fontSize: 32,
            textAlign: "center",
            lineHeight: 36
          }}
        >
          {title}
        </Text>
      </View>

      {/* ESPACIO */}
      <View className="flex-1" />
    </View>
  );
}
