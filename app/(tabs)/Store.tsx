import { View, FlatList, ActivityIndicator, TextInput } from "react-native";
import { useEffect, useRef, useState } from "react";

import CategoryFilter, { CATEGORIES } from "@/components/StoreComponents/Categoryfilter";
import PriceFilter, { PRICE_RANGES } from "@/components/StoreComponents/Pricefilter";
import ProductCard from "@/components/StoreComponents/Productcard";
import "@/global.css";

export default function Store() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Todas");
  const [priceRange, setPriceRange] = useState(0);

  const skipRef = useRef(0);
  const hasMoreRef = useRef(true);
  const loadingRef = useRef(false);
  const limit = 10;

  const loadProducts = async (cat: string, reset = false) => {
    if (loadingRef.current) return;
    if (!reset && !hasMoreRef.current) return;

    loadingRef.current = true;
    setLoading(true);

    const currentSkip = reset ? 0 : skipRef.current;

    try {
      const url =
        cat === "Todas"
          ? `https://dummyjson.com/products?limit=${limit}&skip=${currentSkip}`
          : `https://dummyjson.com/products/category/${cat}?limit=${limit}&skip=${currentSkip}`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.products.length < limit) hasMoreRef.current = false;

      setProducts((prev) => (reset ? data.products : [...prev, ...data.products]));
      skipRef.current = currentSkip + limit;
    } catch (error) {
      console.log(error);
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts("Todas");
  }, []);

  const handleCategoryChange = (slug: string) => {
    setCategory(slug);
    skipRef.current = 0;
    hasMoreRef.current = true;
    loadProducts(slug, true);
  };

  const range = PRICE_RANGES[priceRange];

  const filtered = products.filter((p) => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());
    const matchPrice = p.price >= range.min && p.price <= range.max;
    return matchSearch && matchPrice;
  });

  return (
    <View className="flex-1 bg-gray-100 p-4">

      <TextInput
        value={search}
        onChangeText={setSearch}
        placeholder="Buscar producto..."
        className="bg-white rounded-xl px-4 py-3 mb-4 text-base border border-gray-200"
      />

      <CategoryFilter selected={category} onSelect={handleCategoryChange} />

      <PriceFilter selected={priceRange} onSelect={setPriceRange} />

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={() => loadProducts(category)}
        onEndReachedThreshold={0.3}
        ListFooterComponent={
          loading ? <ActivityIndicator size="large" className="my-4" /> : null
        }
        renderItem={({ item }) => <ProductCard item={item} />}
      />

    </View>
  );
}