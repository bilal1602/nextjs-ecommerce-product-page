"use client";

import React from "react";
import { cn } from "@/lib/utils";

export type Size = {
    name: string;
    value: string;
    inStock: boolean;
};

interface SizeSelectorProps {
    sizes: Size[];
    selectedSize: string | null;
    onChange: (size: string) => void;
    className?: string;
}

const SizeSelector: React.FC<SizeSelectorProps> = ({ sizes, selectedSize, onChange, className }) => {
    return (
        <div className={cn("flex flex-wrap gap-2", className)}>
            {sizes.map(size => {
                const isSelected = selectedSize === size.value;
                return (
                    <button
                        key={size.value}
                        type="button"
                        disabled={!size.inStock}
                        onClick={() => size.inStock && onChange(size.value)}
                        className={cn(
                            "px-4 py-2 cursor-pointer border rounded-md transition-all",
                            isSelected
                                ? "border-product-blue bg-blue-50 dark:bg-blue-900/30 text-product-blue dark:text-blue-300"
                                : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200",
                            !size.inStock &&
                                "opacity-50 cursor-not-allowed bg-gray-50 dark:bg-gray-800 text-gray-400 dark:text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800"
                        )}
                        aria-label={size.inStock ? `Select size ${size.name}` : `Size ${size.name} (Out of Stock)`}
                        aria-pressed={isSelected}
                    >
                        {size.name}
                    </button>
                );
            })}
        </div>
    );
};

export default SizeSelector;
