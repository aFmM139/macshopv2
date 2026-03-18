import React from "react";
import { TouchableOpacity, Text, ActivityIndicator, View } from "react-native";
import "@/global.css";


interface PayButtonProps {
  label: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
}

export const PayButton = ({ label, onPress, loading = false, disabled = false }: PayButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={loading || disabled}
      className={`py-5 rounded-2xl items-center shadow-lg ${
        loading || disabled ? "bg-indigo-300" : "bg-indigo-600"
      }`}
      activeOpacity={0.85}
    >
      {loading ? (
        <View className="flex-row items-center">
          <ActivityIndicator color="white" size="small" />
          <Text className="text-white font-bold text-base ml-2">
            Procesando pago simulado…
          </Text>
        </View>
      ) : (
        <Text className="text-white font-extrabold text-lg">{label}</Text>
      )}
    </TouchableOpacity>
  );
};