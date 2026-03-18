import { View, Text, Image, Pressable } from "react-native";
import { router } from "expo-router";
import { useState } from "react";
import { Barcode } from "lucide-react-native";

type Props = {
  item: any;
};

export default function ProductCard({ item }: Props) {
  const [expanded, setExpanded] = useState(false);

  const handleQR = () => {
    router.push({
      pathname: "/(tabs)/Qr",
      params: {
        id: item.id,
        title: item.title,
        price: item.price,
        brand: item.brand ?? "",
      },
    });
  };

  return (
    <View className="bg-white p-4 mb-4 rounded-2xl">

      <Pressable onPress={() => router.push(`/product/${item.id}`)}>
        <Image
          source={{ uri: item.thumbnail }}
          className="w-full h-40 rounded-xl"
        />
        <Text className="text-base font-semibold mt-2 text-gray-900" numberOfLines={2}>
          {item.title}
        </Text>
        <Text className="text-xs text-gray-400 capitalize mt-1">{item.category}</Text>
        <Text className="text-green-600 font-bold text-base mt-1">${item.price}</Text>
      </Pressable>

      {/* Botón QR */}
      <Pressable
        onPress={handleQR}
        className="mt-3 bg-blue-500 py-2 rounded-xl items-center"
      >
        <Text className="text-white font-semibold text-sm"> Generar QR</Text>
      </Pressable>

      <Pressable
        onPress={() => setExpanded((prev) => !prev)}
        className="mt-2 py-2"
      >
        <Text className="text-blue-500 text-sm font-semibold">
          {expanded ? "▲ Ocultar descripción" : "▼ Ver descripción"}
        </Text>
      </Pressable>

      {expanded && (
        <Text className="text-gray-500 text-sm mt-1 leading-5">
          {item.description}
        </Text>
      )}

    </View>
  );
}