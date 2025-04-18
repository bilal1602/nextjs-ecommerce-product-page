"use client";

import React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export type Color = {
    name: string;
    value: string;
    inStock: boolean;
};

interface ColorSelectorProps {
    colors: Color[];
    selectedColor: string | null;
    onChange: (color: string) => void;
    className?: string;
}

const ColorSelector: React.FC<ColorSelectorProps> = ({ colors, selectedColor, onChange, className }) => {
    return (
        <div className={cn("flex flex-wrap gap-3", className)}>
            {colors.map(color => {
                const isSelected = selectedColor === color.name;
                return (
                    <button
                        key={color.name}
                        type="button"
                        disabled={!color.inStock}
                        onClick={() => color.inStock && onChange(color.name)}
                        className={cn(
                            "w-10 h-10 cursor-pointer rounded-full flex items-center justify-center border-2 transition-all",
                            isSelected ? "border-product-blue shadow-md" : "border-transparent",
                            !color.inStock && "opacity-50 cursor-not-allowed"
                        )}
                        title={color.inStock ? color.name : `${color.name} (Out of Stock)`}
                        aria-label={color.inStock ? `Select ${color.name} color` : `${color.name} (Out of Stock)`}
                        aria-pressed={isSelected}
                    >
                        <span className="w-8 h-8 rounded-full" style={{ backgroundColor: color.value }}>
                            {isSelected && (
                                <Check
                                    size={16}
                                    className={`w-full h-full text-white ${
                                        color.value === "#FFFFFF" || color.value === "#F9FAFB" ? "text-black" : ""
                                    }`}
                                />
                            )}
                        </span>
                    </button>
                );
            })}
        </div>
    );
};

export default ColorSelector;
