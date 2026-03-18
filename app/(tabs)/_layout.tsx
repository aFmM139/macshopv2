import { Tabs } from "expo-router";
import { CreditCard } from "lucide-react-native";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
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