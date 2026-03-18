import { View, Text, ScrollView } from "react-native";
import FilterChip from "@/components/StoreComponents/Filterchip";

export const PRICE_RANGES = [
  { label: "Todos", min: 0, max: Infinity },
  { label: "< $50", min: 0, max: 50 },
  { label: "$50–200", min: 50, max: 200 },
  { label: "$200–500", min: 200, max: 500 },
  { label: "> $500", min: 500, max: Infinity },
];

type Props = {
  selected: number;
  onSelect: (index: number) => void;
};

export default function PriceFilter({ selected, onSelect }: Props) {
  return (
    <View className="mb-4">
      <Text className="text-xs font-bold text-gray-500 uppercase mb-2">Precio</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {PRICE_RANGES.map((r, i) => (
          <FilterChip
            key={r.label}
            label={r.label}
            active={selected === i}
            color="green"
            onPress={() => onSelect(i)}
          />
        ))}
      </ScrollView>
    </View>
  );
}