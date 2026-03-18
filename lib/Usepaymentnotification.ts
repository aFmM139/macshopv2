import { useEffect } from "react";
import * as Notifications from "expo-notifications";
import { supabase } from "@/lib/Supabase";

// Configura cómo se muestran las notificaciones cuando la app está abierta
Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
      shouldShowBanner: true,
      shouldShowList: true,
    }),
  });

// Pide permisos de notificación
export const requestNotificationPermission = async () => {
  const { status } = await Notifications.requestPermissionsAsync();
  return status === "granted";
};

// Guarda la transacción en Supabase y dispara la notificación
export const savePaymentAndNotify = async ({
  method,
  total,
  token,
  items,
}: {
  method: string;
  total: number;
  token: string;
  items: { name: string; price: number; qty: number }[];
}) => {
  // 1. Guardar en Supabase
  const { error } = await supabase.from("transactions").insert({
    method,
    total,
    token,
    items,
    status: "approved",
    created_at: new Date().toISOString(),
  });

  if (error) console.error("Error guardando transacción:", error.message);

  // 2. Disparar notificación local
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "✅ Pago completado",
      body: `Tu pago de $${total.toLocaleString("es-AR", { minimumFractionDigits: 2 })} fue procesado correctamente.`,
      data: { token, method },
      sound: true,
    },
    trigger: null, // null = inmediata
  });
};

// Hook para escuchar notificaciones recibidas
export const useNotifications = () => {
  useEffect(() => {
    requestNotificationPermission();

    const sub = Notifications.addNotificationReceivedListener((notification) => {
      console.log("Notificación recibida:", notification);
    });

    return () => sub.remove();
  }, []);
};