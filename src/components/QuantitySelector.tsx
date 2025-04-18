"use client";

import React from "react";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

interface QuantitySelectorProps {
    quantity: number;
    setQuantity: (quantity: number) => void;
    max?: number;
    min?: number;
    className?: string;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({ quantity, setQuantity, max = 10, min = 1, className }) => {
    const { theme } = useTheme();

    const increment = () => {
        if (quantity < max) {
            setQuantity(quantity + 1);
        }
    };

    const decrement = () => {
        if (quantity > min) {
            setQuantity(quantity - 1);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        if (isNaN(value)) {
            setQuantity(min);
            return;
        }

        if (value >= min && value <= max) {
            setQuantity(value);
        }
    };

    return (
        <div
            className={cn(
                "w-fit flex items-center border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800",
                className
            )}
        >
            <button
                type="button"
                onClick={decrement}
                disabled={quantity <= min}
                className={cn("p-2   cursor-pointer", quantity <= min ? " cursor-not-allowed" : "  hover:bg-gray-100")}
                aria-label="Decrease quantity"
            >
                <Minus size={16} />
            </button>

            <input
                type="number"
                min={min}
                max={max}
                value={quantity}
                onChange={handleInputChange}
                className="w-12 text-center border-0 focus:ring-0 p-0 bg-transparent text-gray-900 dark:text-gray-100 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                aria-label="Quantity"
            />

            <button
                type="button"
                onClick={increment}
                disabled={quantity >= max}
                className={cn("p-2 transition-colors cursor-pointer", quantity >= max ? " cursor-not-allowed" : "")}
                aria-label="Increase quantity"
            >
                <Plus size={16} />
            </button>
        </div>
    );
};

export default QuantitySelector;
