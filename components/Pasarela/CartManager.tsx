import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, FlatList, Alert } from "react-native";
import { PayText } from "./PayText";
import { CartItem } from "./CartSummary";

interface CartManagerProps {
  items: CartItem[];
  onItemsChange: (items: CartItem[]) => void;
}

export const CartManager = ({ items, onItemsChange }: CartManagerProps) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [qty, setQty] = useState("1");
  const [open, setOpen] = useState(false);

  const handleAdd = () => {
    if (!name.trim()) return Alert.alert("Falta el nombre", "Ingresa un nombre para el producto.");
    const parsedPrice = parseFloat(price.replace(",", "."));
    const parsedQty = parseInt(qty);
    if (isNaN(parsedPrice) || parsedPrice <= 0)
      return Alert.alert("Precio inválido", "Ingresa un precio válido mayor a 0.");
    if (isNaN(parsedQty) || parsedQty <= 0)
      return Alert.alert("Cantidad inválida", "Ingresa una cantidad válida.");

    const newItem: CartItem = {
      id: Date.now().toString(),
      name: name.trim(),
      price: parsedPrice,
      qty: parsedQty,
    };
    onItemsChange([...items, newItem]);
    setName("");
    setPrice("");
    setQty("1");
    setOpen(false);
  };

  const handleRemove = (id: string) => {
    if (items.length === 1)
      return Alert.alert("No puedes eliminar", "Debe haber al menos un producto.");
    onItemsChange(items.filter((i) => i.id !== id));
  };

  const handleQtyChange = (id: string, delta: number) => {
    onItemsChange(
      items.map((i) =>
        i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i
      )
    );
  };

  return (
    <View className="bg-white rounded-2xl p-4 mb-4 shadow-sm">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-3">
        <PayText variant="label" className="uppercase tracking-wide">
          🛒 Productos
        </PayText>
        <TouchableOpacity
          onPress={() => setOpen((v) => !v)}
          className="bg-indigo-600 rounded-xl px-3 py-1.5"
          activeOpacity={0.8}
        >
          <PayText variant="caption" className="text-white font-bold text-left">
            {open ? "✕ Cancelar" : "+ Agregar"}
          </PayText>
        </TouchableOpacity>
      </View>

      {/* Formulario de nuevo producto */}
      {open && (
        <View className="bg-indigo-50 border border-indigo-100 rounded-2xl p-3 mb-3 gap-2">
          <PayText variant="label" className="mb-1">Nuevo producto</PayText>

          <TextInput
            className="bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-gray-800 text-sm"
            placeholder="Nombre del producto"
            placeholderTextColor="#9ca3af"
            value={name}
            onChangeText={setName}
          />

          <View className="flex-row gap-2">
            <View className="flex-1">
              <TextInput
                className="bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-gray-800 text-sm"
                placeholder="Precio (Fichas)"
                placeholderTextColor="#9ca3af"
                keyboardType="decimal-pad"
                value={price}
                onChangeText={setPrice}
              />
            </View>
            <View className="w-20">
              <TextInput
                className="bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-gray-800 text-sm text-center"
                placeholder="Cant."
                placeholderTextColor="#9ca3af"
                keyboardType="numeric"
                value={qty}
                onChangeText={setQty}
              />
            </View>
          </View>

          <TouchableOpacity
            onPress={handleAdd}
            className="bg-indigo-600 rounded-xl py-2.5 items-center mt-1"
            activeOpacity={0.85}
          >
            <PayText variant="caption" className="text-white font-bold text-left">
              ✓ Confirmar producto
            </PayText>
          </TouchableOpacity>
        </View>
      )}

      {/* Lista de productos */}
      {items.map((item) => (
        <View
          key={item.id}
          className="flex-row items-center py-2 border-b border-gray-50"
        >
          {/* Nombre y precio */}
          <View className="flex-1">
            <PayText variant="body" className="font-medium">{item.name}</PayText>
            <PayText variant="caption" className="text-left text-indigo-500 font-semibold">
              $ {item.price.toLocaleString("es-AR", { minimumFractionDigits: 2 })} c/u
            </PayText>
          </View>

          {/* Controles de cantidad */}
          <View className="flex-row items-center gap-1 mr-2">
            <TouchableOpacity
              onPress={() => handleQtyChange(item.id, -1)}
              className="bg-gray-100 rounded-lg w-7 h-7 items-center justify-center"
            >
              <PayText variant="body" className="font-bold text-gray-600">−</PayText>
            </TouchableOpacity>
            <PayText variant="body" className="w-6 text-center font-semibold">
              {item.qty}
            </PayText>
            <TouchableOpacity
              onPress={() => handleQtyChange(item.id, 1)}
              className="bg-gray-100 rounded-lg w-7 h-7 items-center justify-center"
            >
              <PayText variant="body" className="font-bold text-gray-600">+</PayText>
            </TouchableOpacity>
          </View>

          {/* Eliminar */}
          <TouchableOpacity
            onPress={() => handleRemove(item.id)}
            className="bg-red-50 rounded-lg w-7 h-7 items-center justify-center"
          >
            <PayText variant="caption" className="text-red-500 text-left">🗑</PayText>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};