import {
    View,
    Text,
    Image,
    ActivityIndicator
  } from "react-native";
  
  import { useLocalSearchParams } from "expo-router";
  import { useEffect, useState } from "react";
  
  export default function Product() {
  
    const { id } = useLocalSearchParams();
  
    const [product, setProduct] = useState<any>(null);
  
    const getProduct = async () => {
  
      try {
  
        const response = await fetch(
          `https://dummyjson.com/products/${id}`
        );
  
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
  
    return (
      <View className="flex-1 bg-white p-4">
  
        <Image
          source={{ uri: product.thumbnail }}
          className="w-full h-64 rounded-2xl"
        />
  
        <Text className="text-2xl font-bold mt-4">
          {product.title}
        </Text>
  
        <Text className="text-gray-500 mt-2">
          {product.description}
        </Text>
  
        <Text className="text-green-600 text-xl font-bold mt-4">
          ${product.price}
        </Text>
  
        <Text className="mt-2">
          Rating ⭐ {product.rating}
        </Text>
  
      </View>
    );
  }