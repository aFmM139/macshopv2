import { View, Text, ScrollView } from "react-native";
import FilterChip from "@/components/StoreComponents/Filterchip";

export const CATEGORIES = [
  { label: "Todas", slug: "Todas" },
  { label: "Smartphones", slug: "smartphones" },
  { label: "Laptops", slug: "laptops" },
  { label: "Fragrances", slug: "fragrances" },
  { label: "Skin Care", slug: "skin-care" },
  { label: "Beauty", slug: "beauty" },
  { label: "Groceries", slug: "groceries" },
  { label: "Home", slug: "home-decoration" },
  { label: "Furniture", slug: "furniture" },
  { label: "Watches", slug: "mens-watches" },
];

type Props = {
  selected: string;
  onSelect: (slug: string) => void;
};

export default function CategoryFilter({ selected, onSelect }: Props) {
  return (
    <View className="mb-4">
      <Text className="text-xs font-bold text-gray-500 uppercase mb-2">Categoría</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {CATEGORIES.map((cat) => (
          <FilterChip
            key={cat.slug}
            label={cat.label}
            active={selected === cat.slug}
            color="blue"
            onPress={() => onSelect(cat.slug)}
          />
        ))}
      </ScrollView>
    </View>
  );
}