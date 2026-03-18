import React from "react";
import { Text, TextProps } from "react-native";
import "@/global.css";


type Variant =
  | "title"       
  | "subtitle" 
  | "label"      
  | "body"  
  | "caption" 
  | "price"     
  | "badge";      

interface PayTextProps extends TextProps {
  variant?: Variant;
  children: React.ReactNode;
}

const variantStyles: Record<Variant, string> = {
  title:    "text-3xl font-extrabold text-gray-900",
  subtitle: "text-sm text-gray-500",
  label:    "text-xs text-gray-500 font-medium",
  body:     "text-sm text-gray-700",
  caption:  "text-xs text-gray-400 text-center",
  price:    "text-base font-extrabold text-indigo-600",
  badge:    "text-xs font-bold tracking-widest uppercase text-yellow-900",
};

export const PayText = ({ variant = "body", children, className = "", ...props }: PayTextProps) => {
  return (
    <Text className={`${variantStyles[variant]} ${className}`} {...props}>
      {children}
    </Text>
  );
};