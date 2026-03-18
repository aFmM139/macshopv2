import React from "react";
import { Modal, View, TouchableOpacity } from "react-native";
import { PayText } from "./PayText";
import { PayButton } from "./PayButton";
import { formatCurrency } from "./CartSummary";
import "@/global.css";

interface ResultModalProps {
  visible: boolean;
  success: boolean;
  token: string;
  total: number;
  onClose: () => void;
}

const Row = ({ label, value, highlight, mono }: {
  label: string;
  value: string;
  highlight?: boolean;
  mono?: boolean;
}) => (
  <View className="flex-row justify-between items-center py-1">
    <PayText variant="caption" className="text-left">{label}</PayText>
    <PayText
      variant="caption"
      className={`font-semibold ${highlight ? "text-indigo-600" : "text-gray-700"} ${mono ? "font-mono" : ""}`}
    >
      {value}
    </PayText>
  </View>
);

export const ResultModal = ({ visible, success, token, total, onClose }: ResultModalProps) => (
  <Modal visible={visible} transparent animationType="fade">
    <View className="flex-1 bg-black/60 justify-center items-center px-6">
      <View className="bg-white rounded-3xl p-8 w-full max-w-sm items-center shadow-2xl">
        <PayText variant="body" className="text-6xl mb-4">{success ? "🎉" : "❌"}</PayText>

        <PayText variant="title" className="text-2xl mb-2">
          {success ? "¡Pago Exitoso!" : "Pago Rechazado"}
        </PayText>

        {success ? (
          <>
            <PayText variant="subtitle" className="text-center mb-4">
              Tu pago imaginario fue procesado con éxito. ¡Ningún dinero real fue involucrado!
            </PayText>
            <View className="bg-gray-50 rounded-2xl p-4 w-full mb-4">
              <Row label="Total pagado" value={formatCurrency(total)} highlight />
              <Row label="Token simulado" value={token.slice(0, 20) + "..."} mono />
              <Row label="Estado" value="✅ Aprobado" />
            </View>
          </>
        ) : (
          <PayText variant="subtitle" className="text-center mb-6">
            La transacción simulada fue rechazada. Intenta de nuevo o usa otro método.
          </PayText>
        )}

        <PayButton
          label={success ? "Ver mis compras" : "Intentar de nuevo"}
          onPress={onClose}
        />
      </View>
    </View>
  </Modal>
);