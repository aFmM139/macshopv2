import React, { useState } from "react";
import { View, Alert, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { CreditCard, Wallet, BadgeDollarSign, ShieldCheck } from "lucide-react-native";
import { PayText } from "@/components/Pasarela/PayText";
import { PayButton } from "@/components/Pasarela/PayButton";
import { CardForm, CardData } from "@/components/Pasarela/CardForm";
import { MethodButton, PaymentMethod } from "@/components/Pasarela/MethodButton";
import { CartSummary, CartItem, formatCurrency } from "@/components/Pasarela/CartSummary";
import { CartManager } from "@/components/Pasarela/CartManager";
import { ResultModal } from "@/components/Pasarela/ResultModal";
import { useCart } from "@/Context/CartContext";

const simulatePayment = (method: PaymentMethod): Promise<{ success: boolean; token: string }> =>
  new Promise((resolve) =>
    setTimeout(() => {
      const success = Math.random() > 0.1;
      resolve({ success, token: success ? `SIM_${method.toUpperCase()}_${Date.now()}` : "" });
    }, 2200)
  );

const ExternalMethodPanel = ({ method }: { method: PaymentMethod }) => {
  const config = {
    paypal: {
      icon: <Wallet size={28} color="#1d4ed8" />,
      title: "PayPal",
      color: "bg-blue-50 border-blue-200",
      text: "text-blue-700",
      desc: "Serás redirigido a PayPal para completar el pago de forma segura.",
    },
    mercadopago: {
      icon: <BadgeDollarSign size={28} color="#0369a1" />,
      title: "Mercado Pago",
      color: "bg-sky-50 border-sky-200",
      text: "text-sky-700",
      desc: "Serás redirigido a Mercado Pago. Acepta cuotas y métodos de pago locales.",
    },
    card: { icon: null, title: "", color: "", text: "", desc: "" },
  }[method];

  return (
    <View className={`border rounded-2xl p-4 mt-2 ${config.color}`}>
      <View className="flex-row items-center mb-2">
        <View className="mr-3">{config.icon}</View>
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

export default function PayP() {
  const { items, setItems } = useCart();
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
    if (result.success) {
      setCard({ number: "", name: "", expiry: "", cvv: "" });
      setItems([]); // limpia el carrito al pagar exitosamente
    }
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
        <View className="bg-indigo-100 rounded-full px-3 py-1 self-center mb-4 flex-row items-center gap-1">
          <BadgeDollarSign size={14} color="#4338ca" />
          <PayText variant="badge" className="text-indigo-800">Pago 100% Seguro</PayText>
        </View>

        {/* Gestor de productos */}
        <CartManager items={items} onItemsChange={setItems} />

        {/* Resumen carrito */}
        <CartSummary items={items} />

        {/* Método de pago */}
        <View className="bg-white rounded-2xl p-4 mb-4 shadow-sm">
          <View className="flex-row items-center gap-2 mb-3">
            <CreditCard size={16} color="#6b7280" />
            <PayText variant="label" className="uppercase tracking-wide">
              Método de pago
            </PayText>
          </View>

          <View className="flex-row mb-4">
            <MethodButton label="Tarjeta" icon={CreditCard} value="card" selected={method} onPress={setMethod} />
            <MethodButton label="PayPal" icon={Wallet} value="paypal" selected={method} onPress={setMethod} />
            <MethodButton label="Mercado Pago" icon={BadgeDollarSign} value="mercadopago" selected={method} onPress={setMethod} />
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

        {/* Nota seguridad */}
        <View className="flex-row items-center justify-center gap-1 mt-4">
          <ShieldCheck size={12} color="#9ca3af" />
          <PayText variant="caption">
            Cifrado SSL · Datos protegidos · Transacción segura
          </PayText>
        </View>
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