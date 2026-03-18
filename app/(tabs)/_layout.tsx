import { Tabs } from "expo-router";
import { Scan, ShelvingUnit, QrCode, CreditCard } from "lucide-react-native";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="Scan"
        options={{
          title: "Scan",
          tabBarIcon: () => <Scan size={28} color="black" />,
        }}
      />
      <Tabs.Screen
        name="Store"
        options={{
          title: "Tienda",
          tabBarIcon: () => <ShelvingUnit size={28} color="black" />,
        }}
      />
      <Tabs.Screen
        name="Qr"
        options={{
          title: "QR",
          tabBarIcon: () => <QrCode size={28} color="black" />,
        }}
      />
      <Tabs.Screen
        name="PayP"
        options={{
          title: "Pago",
          tabBarIcon: () => <CreditCard size={28} color="black" />,
        }}
      />
    </Tabs>
  );
}