import { Pressable, Text } from "react-native";

type Props = {
  label: string;
  active: boolean;
  color?: "blue" | "green";
  onPress: () => void;
};

export default function FilterChip({ label, active, color = "blue", onPress }: Props) {
  const bgColor = active
    ? color === "blue" ? "bg-blue-500" : "bg-green-500"
    : "bg-white";

  const borderColor = active
    ? color === "blue" ? "border-blue-500" : "border-green-500"
    : "border-gray-300";

  const textColor = active ? "text-white" : "text-gray-700";

  return (
    <Pressable
      onPress={onPress}
      className={`mr-3 px-5 py-3 rounded-full border-2 ${bgColor} ${borderColor}`}
    >
      <Text className={`text-sm font-semibold ${textColor}`}>
        {label}
      </Text>
    </Pressable>
  );
}