import React from "react";
import { TouchableOpacity, View } from "react-native";
import { LucideIcon } from "lucide-react-native";
import { PayText } from "./PayText";
import "@/global.css";

export type PaymentMethod = "card" | "paypal" | "mercadopago";

interface MethodButtonProps {
  label: string;
  icon: LucideIcon;
  value: PaymentMethod;
  selected: PaymentMethod;
  onPress: (v: PaymentMethod) => void;
}

export const MethodButton = ({ label, icon: Icon, value, selected, onPress }: MethodButtonProps) => {
  const isSelected = selected === value;
  return (
    <TouchableOpacity
      onPress={() => onPress(value)}
      className={`flex-1 items-center py-3 rounded-2xl border-2 mx-1 ${
        isSelected ? "border-indigo-500 bg-indigo-50" : "border-gray-200 bg-white"
      }`}
      activeOpacity={0.8}
    >
      <View className="mb-1">
        <Icon size={24} color={isSelected ? "#6366f1" : "#9ca3af"} />
      </View>
      <PayText
        variant="label"
        className={isSelected ? "text-indigo-600" : "text-gray-500"}
      >
        {label}
      </PayText>
    </TouchableOpacity>
  );
};