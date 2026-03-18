import React from "react";
import { View } from "react-native";
import { ShoppingBag, Receipt, Tag } from "lucide-react-native";
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
  `$ ${amount.toLocaleString("es-AR", { minimumFractionDigits: 2 })}`;

export const CartSummary = ({ items }: CartSummaryProps) => {
  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const tax = Math.round(subtotal * 0.105);
  const total = subtotal + tax;

  return (
    <View className="bg-white rounded-2xl p-4 mb-4 shadow-sm">
      <View className="flex-row items-center gap-2 mb-3">
        <ShoppingBag size={16} color="#6b7280" />
        <PayText variant="label" className="uppercase tracking-wide">
          Resumen del pedido
        </PayText>
      </View>

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
        <View className="flex-row justify-between items-center">
          <View className="flex-row items-center gap-1">
            <Tag size={12} color="#9ca3af" />
            <PayText variant="caption" className="text-left">Subtotal</PayText>
          </View>
          <PayText variant="body">{formatCurrency(subtotal)}</PayText>
        </View>
        <View className="flex-row justify-between items-center">
          <View className="flex-row items-center gap-1">
            <Tag size={12} color="#9ca3af" />
            <PayText variant="caption" className="text-left">IVA (10.5%)</PayText>
          </View>
          <PayText variant="body">{formatCurrency(tax)}</PayText>
        </View>
        <View className="flex-row justify-between items-center mt-2 pt-2 border-t border-gray-100">
          <View className="flex-row items-center gap-1">
            <Receipt size={14} color="#111827" />
            <PayText variant="body" className="font-bold text-gray-900 text-base">Total</PayText>
          </View>
          <PayText variant="price">{formatCurrency(total)}</PayText>
        </View>
      </View>
    </View>
  );
};

export { formatCurrency };