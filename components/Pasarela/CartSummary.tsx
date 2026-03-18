import React from "react";
import { View } from "react-native";
import { PayText } from "./PayText";
import "@/global.css";


export interface CartItem {
  id: string;
  name: string;
  price: number;
  qty: number;
}

interface CartSummaryProps {
  items: CartItem[];
}

const formatCurrency = (amount: number) =>
  `$ ${amount.toLocaleString("es-AR", { minimumFractionDigits: 2 })} (Fichas)`;

export const CartSummary = ({ items }: CartSummaryProps) => {
  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const tax = Math.round(subtotal * 0.105);
  const total = subtotal + tax;

  return (
    <View className="bg-white rounded-2xl p-4 mb-4 shadow-sm">
      <PayText variant="label" className="mb-3 uppercase tracking-wide">
        🛍️ Resumen del pedido
      </PayText>

      {items.map((item) => (
        <View
          key={item.id}
          className="flex-row justify-between items-center py-1.5 border-b border-gray-50"
        >
          <View className="flex-1">
            <PayText variant="body" className="font-medium">{item.name}</PayText>
            <PayText variant="caption" className="text-left">x{item.qty}</PayText>
          </View>
          <PayText variant="body" className="font-semibold">
            {formatCurrency(item.price * item.qty)}
          </PayText>
        </View>
      ))}

      <View className="mt-3 pt-2 gap-1">
        <View className="flex-row justify-between">
          <PayText variant="caption" className="text-left">Subtotal</PayText>
          <PayText variant="body">{formatCurrency(subtotal)}</PayText>
        </View>
        <View className="flex-row justify-between">
          <PayText variant="caption" className="text-left">IVA (10.5%)</PayText>
          <PayText variant="body">{formatCurrency(tax)}</PayText>
        </View>
        <View className="flex-row justify-between mt-2 pt-2 border-t border-gray-100">
          <PayText variant="body" className="font-bold text-gray-900 text-base">Total</PayText>
          <PayText variant="price">{formatCurrency(total)}</PayText>
        </View>
      </View>
    </View>
  );
};

export { formatCurrency };