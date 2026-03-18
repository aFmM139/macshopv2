import { Tabs } from "expo-router";
import { Scan,ShelvingUnit,QrCode} from 'lucide-react-native';


export default function TabLayout() {
  return (
    <Tabs>

      <Tabs.Screen
        name="Scan"
        options={{
        title: "Scan",
          tabBarIcon: () => (
            <Scan  size={28} color="black" />
          ),
        }}
      />

<Tabs.Screen
        name="Store"
        options={{
        title: "Tienda",
          tabBarIcon: () => (
            <ShelvingUnit  size={28} color="black" />
          ),
        }}
      />

<Tabs.Screen
        name="Qr"
        options={{
        title: "QR",
          tabBarIcon: () => (
            <QrCode size={28} color="black" />
          ),
        }}
      />

    </Tabs>
  );
}