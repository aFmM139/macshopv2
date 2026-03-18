import React from "react";
import { View, TextInput } from "react-native";
import { PayText } from "./PayText";
import "@/global.css";


export interface CardData {
  number: string;
  name: string;
  expiry: string;
  cvv: string;
}

interface CardFormProps {
  data: CardData;
  onChange: (key: keyof CardData, value: string) => void;
}

const formatCardNumber = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 16);
  return digits.replace(/(.{4})/g, "$1 ").trim();
};

const formatExpiry = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length >= 3) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return digits;
};

export const CardForm = ({ data, onChange }: CardFormProps) => (
  <View className="gap-3 mt-2">
    <View>
      <PayText variant="label" className="mb-1">Número de tarjeta</PayText>
      <TextInput
        className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 text-base font-mono tracking-widest"
        placeholder="0000 0000 0000 0000"
        placeholderTextColor="#9ca3af"
        keyboardType="numeric"
        value={data.number}
        onChangeText={(v) => onChange("number", formatCardNumber(v))}
        maxLength={19}
      />
    </View>

    <View>
      <PayText variant="label" className="mb-1">Nombre en la tarjeta</PayText>
      <TextInput
        className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 text-base"
        placeholder="JUAN PÉREZ"
        placeholderTextColor="#9ca3af"
        autoCapitalize="characters"
        value={data.name}
        onChangeText={(v) => onChange("name", v)}
      />
    </View>

    <View className="flex-row gap-3">
      <View className="flex-1">
        <PayText variant="label" className="mb-1">Vencimiento</PayText>
        <TextInput
          className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 text-base font-mono"
          placeholder="MM/AA"
          placeholderTextColor="#9ca3af"
          keyboardType="numeric"
          value={data.expiry}
          onChangeText={(v) => onChange("expiry", formatExpiry(v))}
          maxLength={5}
        />
      </View>
      <View className="flex-1">
        <PayText variant="label" className="mb-1">CVV</PayText>
        <TextInput
          className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 text-base font-mono"
          placeholder="•••"
          placeholderTextColor="#9ca3af"
          keyboardType="numeric"
          secureTextEntry
          value={data.cvv}
          onChangeText={(v) => onChange("cvv", v.replace(/\D/g, "").slice(0, 4))}
          maxLength={4}
        />
      </View>
    </View>

    <View className="flex-row items-center bg-green-50 border border-green-200 rounded-xl px-3 py-2 mt-1">
      <PayText variant="body" className="text-green-600 mr-2">🔒</PayText>
      <PayText variant="caption" className="text-green-700 text-left flex-1">
        Tus datos están protegidos. Esta es una simulación — no se procesa dinero real.
      </PayText>
    </View>
  </View>
);