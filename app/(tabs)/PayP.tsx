import React, { useState } from "react";
import {
  View,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";

import { PayText } from "@/components/Pasarela/PayText";
import { PayButton } from "@/components/Pasarela/PayButton";
import { CardForm, CardData } from "@/components/Pasarela/CardForm";
import { MethodButton, PaymentMethod } from "@/components/Pasarela/MethodButton";
import { CartSummary, CartItem, formatCurrency } from "@/components/Pasarela/CartSummary";
import { CartManager } from "@/components/Pasarela/CartManager";
import { ResultModal } from "@/components/Pasarela/ResultModal";

// ─── Datos del carrito ────────────────────────────────────────────────────────

const CART_ITEMS: CartItem[] = [
  { id: "1", name: "Auriculares Pro Max", price: 12500, qty: 1 },
  { id: "2", name: "Cable USB-C Trenzado", price: 850, qty: 2 },
  { id: "3", name: "Funda Silicona", price: 320, qty: 1 },
];

// ─── Simulador de pago ────────────────────────────────────────────────────────

const simulatePayment = (method: PaymentMethod): Promise<{ success: boolean; token: string }> =>
  new Promise((resolve) =>
    setTimeout(() => {
      const success = Math.random() > 0.1;
      resolve({ success, token: success ? `SIM_${method.toUpperCase()}_${Date.now()}` : "" });
    }, 2200)
  );

// ─── Panel externo (PayPal / MercadoPago) ─────────────────────────────────────

const ExternalMethodPanel = ({ method }: { method: PaymentMethod }) => {
  const config = {
    paypal: {
      icon: "🅿️", title: "PayPal",
      color: "bg-blue-50 border-blue-200", text: "text-blue-700",
      desc: "Serás redirigido al portal simulado de PayPal para autorizar el pago.",
    },
    mercadopago: {
      icon: "🛒", title: "Mercado Pago",
      color: "bg-sky-50 border-sky-200", text: "text-sky-700",
      desc: "Serás redirigido al portal simulado de Mercado Pago. Acepta cuotas locales.",
    },
    card: { icon: "", title: "", color: "", text: "", desc: "" },
  }[method];

  return (
    <View className={`border rounded-2xl p-4 mt-2 ${config.color}`}>
      <View className="flex-row items-center mb-2">
        <PayText variant="body" className="text-3xl mr-3">{config.icon}</PayText>
        <View>
          <PayText variant="body" className={`font-bold text-base ${config.text}`}>
            {config.title}
          </PayText>
          <PayText variant="caption" className="text-left text-gray-500">
            Pago externo simulado
          </PayText>
        </View>
      </View>
      <PayText variant="body" className={`text-sm ${config.text}`}>{config.desc}</PayText>
    </View>
  );
};

// ─── PayP (Pantalla principal) ────────────────────────────────────────────────

export default function PayP() {
  const [items, setItems] = useState<CartItem[]>(CART_ITEMS);
  const [method, setMethod] = useState<PaymentMethod>("card");
  const [card, setCard] = useState<CardData>({ number: "", name: "", expiry: "", cvv: "" });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState({ visible: false, success: false, token: "" });

  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const totalWithTax = subtotal + Math.round(subtotal * 0.105);

  const handleCardChange = (key: keyof CardData, value: string) =>
    setCard((prev) => ({ ...prev, [key]: value }));

  const isCardValid =
    method !== "card" ||
    (card.number.replace(/\s/g, "").length === 16 &&
      card.name.length > 2 &&
      card.expiry.length === 5 &&
      card.cvv.length >= 3);

  const handlePay = async () => {
    if (items.length === 0) {
      Alert.alert("Carrito vacío", "Agrega al menos un producto.");
      return;
    }
    if (!isCardValid) {
      Alert.alert("Datos incompletos", "Por favor completa todos los campos.");
      return;
    }
    setLoading(true);
    const res = await simulatePayment(method);
    setLoading(false);
    setResult({ visible: true, success: res.success, token: res.token });
  };

  const handleClose = () => {
    setResult({ visible: false, success: false, token: "" });
    if (result.success) setCard({ number: "", name: "", expiry: "", cvv: "" });
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-gray-100"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <ScrollView
        contentContainerClassName="px-4 pt-10 pb-12"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <PayText variant="title" className="mb-1">Checkout</PayText>
        <PayText variant="subtitle" className="mb-4">Completa tu compra de forma segura</PayText>

        {/* Badge simulación */}
        <View className="bg-yellow-400 rounded-full px-3 py-1 self-center mb-4">
          <PayText variant="badge">💰 Modo Simulación — Dinero Imaginario</PayText>
        </View>

        {/* Gestor de productos */}
        <CartManager items={items} onItemsChange={setItems} />

        {/* Resumen carrito */}
        <CartSummary items={items} />

        {/* Método de pago */}
        <View className="bg-white rounded-2xl p-4 mb-4 shadow-sm">
          <PayText variant="label" className="mb-3 uppercase tracking-wide">
            💳 Método de pago
          </PayText>

          <View className="flex-row mb-4">
            <MethodButton label="Tarjeta" icon="💳" value="card" selected={method} onPress={setMethod} />
            <MethodButton label="PayPal" icon="🅿️" value="paypal" selected={method} onPress={setMethod} />
            <MethodButton label="Mercado Pago" icon="🛒" value="mercadopago" selected={method} onPress={setMethod} />
          </View>

          {method === "card"
            ? <CardForm data={card} onChange={handleCardChange} />
            : <ExternalMethodPanel method={method} />
          }
        </View>

        {/* Botón de pago */}
        <PayButton
          label={`Pagar ${formatCurrency(totalWithTax)}`}
          onPress={handlePay}
          loading={loading}
          disabled={!isCardValid || items.length === 0}
        />

        <PayText variant="caption" className="mt-4">
          🔐 Simulación segura · Sin datos reales · Proyecto educativo
        </PayText>
      </ScrollView>

      <ResultModal
        visible={result.visible}
        success={result.success}
        token={result.token}
        total={totalWithTax}
        onClose={handleClose}
      />
    </KeyboardAvoidingView>
  );
}