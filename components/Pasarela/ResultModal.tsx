import React from "react";
import { Modal, View } from "react-native";
import { PartyPopper, XCircle, CheckCircle2, Hash, ShoppingBag } from "lucide-react-native";
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

const Row = ({ label, value, highlight, mono, icon }: {
  label: string;
  value: string;
  highlight?: boolean;
  mono?: boolean;
  icon?: React.ReactNode;
}) => (
  <View className="flex-row justify-between items-center py-1">
    <View className="flex-row items-center gap-1">
      {icon}
      <PayText variant="caption" className="text-left">{label}</PayText>
    </View>
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

        <View className="mb-4">
          {success
            ? <PartyPopper size={56} color="#6366f1" />
            : <XCircle size={56} color="#ef4444" />
          }
        </View>

        <PayText variant="title" className="text-2xl mb-2">
          {success ? "¡Pago Completado!" : "Pago Rechazado"}
        </PayText>

        {success ? (
          <>
            <PayText variant="subtitle" className="text-center mb-4">
              Tu pago fue procesado correctamente. Recibirás una confirmación en breve.
            </PayText>
            <View className="bg-gray-50 rounded-2xl p-4 w-full mb-4">
              <Row
                label="Total pagado"
                value={formatCurrency(total)}
                highlight
                icon={<ShoppingBag size={12} color="#6366f1" />}
              />
              <Row
                label="Referencia"
                value={token.slice(0, 20) + "..."}
                mono
                icon={<Hash size={12} color="#9ca3af" />}
              />
              <Row
                label="Estado"
                value="Aprobado"
                icon={<CheckCircle2 size={12} color="#22c55e" />}
              />
            </View>
          </>
        ) : (
          <PayText variant="subtitle" className="text-center mb-6">
            No pudimos procesar tu pago. Verifica tus datos o intenta con otro método.
          </PayText>
        )}

        <PayButton
          label={success ? "Ver mi pedido" : "Intentar de nuevo"}
          onPress={onClose}
        />
      </View>
    </View>
  </Modal>
);