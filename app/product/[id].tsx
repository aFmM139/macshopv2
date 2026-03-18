import { View, Text, Image, ActivityIndicator, Pressable, ScrollView } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { useEffect, useState } from "react";
import { useCart } from "@/Context/CartContext";
import { ShoppingCart } from "lucide-react-native";

export default function Product() {
  const { id } = useLocalSearchParams();
  const [product, setProduct] = useState<any>(null);
  const { addItem } = useCart();

  const getProduct = async () => {
    try {
      const response = await fetch(`https://dummyjson.com/products/${id}`);
      const data = await response.json();
      setProduct(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  if (!product) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const handleBuy = () => {
    addItem({
      id: product.id.toString(),
      name: product.title,
      price: product.price,
      qty: 1,
    });
    router.push("/(tabs)/PayP");
  };

  return (
    <ScrollView className="flex-1 bg-white p-4">
      <Image
        source={{ uri: product.thumbnail }}
        className="w-full h-64 rounded-2xl"
      />

      <Text className="text-2xl font-bold mt-4">{product.title}</Text>
      <Text className="text-gray-500 mt-2">{product.description}</Text>
      <Text className="text-green-600 text-xl font-bold mt-4">${product.price}</Text>
      <Text className="mt-2">Rating ⭐ {product.rating}</Text>

      {/* Botón Comprar */}
      <Pressable
        onPress={handleBuy}
        className="mt-6 bg-indigo-600 py-4 rounded-2xl flex-row items-center justify-center gap-2"
      >
        <ShoppingCart size={20} color="white" />
        <Text className="text-white font-bold text-base">Comprar</Text>
      </Pressable>
    </ScrollView>
  );
}