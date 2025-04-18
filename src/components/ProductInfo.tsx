"use client";

import React, { useState, useEffect } from "react";
import { useCart } from "@/hooks/useCart";
import { toast } from "sonner";
import ColorSelector, { Color } from "./ColorSelector";
import SizeSelector, { Size } from "./SizeSelector";
import QuantitySelector from "./QuantitySelector";
import AddToCartButton from "./AddToCartButton";
import ExpandableSection from "./ExpandableSection";
import HtmlContent from "./HtmlContent";
import { cn } from "@/lib/utils";

interface ProductInfoProps {
    product: {
        id: string;
        name: string;
        price: number;
        originalPrice?: number;
        description: string;
        features: string[];
        colors: Color[];
        sizes: Size[];
        details: string;
        shipping: string;
        materials: string;
        images: { src: string; alt: string; color?: string }[];
    };
    className?: string;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product, className }) => {
    const { addToCart } = useCart();
    const [selectedColor, setSelectedColor] = useState<string | null>(
        product.colors.find(c => c.inStock)?.name || null
    );
    const [selectedSize, setSelectedSize] = useState<string | null>(product.sizes.find(s => s.inStock)?.value || null);
    const [quantity, setQuantity] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    // We need to update the document title with this effect
    useEffect(() => {
        // Update the gallery when the color changes
        const event = new CustomEvent("color-changed", { detail: selectedColor });
        document.dispatchEvent(event);
    }, [selectedColor]);

    const handleAddToCart = () => {
        if (!selectedColor || !selectedSize) {
            toast.error("Please select a color and size");
            return;
        }

        setIsLoading(true);

        // Get color display value and image for the selected color
        const colorObj = product.colors.find(c => c.name === selectedColor);
        const sizeObj = product.sizes.find(s => s.value === selectedSize);

        if (!colorObj || !sizeObj) {
            toast.error("Selected color or size is not available");
            setIsLoading(false);
            return;
        }

        // Find first image for selected color, or use first image if none found
        const image = product.images.find(img => img.color === selectedColor)?.src || product.images[0].src;

        setTimeout(() => {
            addToCart({
                id: product.id,
                name: product.name,
                price: product.price,
                color: selectedColor,
                size: selectedSize,
                quantity,
                image,
            });

            toast.success("Added to cart successfully");
            setIsLoading(false);
        }, 500);
    };

    const isAddToCartDisabled = !selectedColor || !selectedSize || quantity < 1;
    const discountPercentage = product.originalPrice
        ? Math.round((1 - product.price / product.originalPrice) * 100)
        : null;

    return (
        <div className={cn("flex flex-col space-y-6", className)}>
            {/* Product Title & Price */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{product.name}</h1>
                <div className="flex items-center gap-2 mt-2">
                    <span className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                        ${product.price.toFixed(2)}
                    </span>
                    {product.originalPrice && (
                        <>
                            <span className="text-lg text-gray-500 dark:text-gray-400 line-through">
                                ${product.originalPrice.toFixed(2)}
                            </span>
                            <span className="px-2 py-1 text-sm font-medium text-white bg-red-500 rounded">
                                {discountPercentage}% OFF
                            </span>
                        </>
                    )}
                </div>
            </div>

            {/* Product Description */}
            <p className="text-gray-800 dark:text-gray-300">{product.description}</p>

            {/* Color Selection */}
            <div>
                <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-gray-800 dark:text-gray-200">Color</span>
                    {selectedColor && <span className="text-sm text-gray-700 dark:text-gray-400">{selectedColor}</span>}
                </div>
                <ColorSelector colors={product.colors} selectedColor={selectedColor} onChange={setSelectedColor} />
            </div>

            {/* Size Selection */}
            <div>
                <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-gray-800 dark:text-gray-200">Size</span>
                    {selectedSize && (
                        <span className="text-sm text-gray-700 dark:text-gray-400">
                            {product.sizes.find(s => s.value === selectedSize)?.name}
                        </span>
                    )}
                </div>
                <SizeSelector sizes={product.sizes} selectedSize={selectedSize} onChange={setSelectedSize} />
            </div>

            {/* Quantity & Add to Cart */}
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                <div>
                    <label
                        htmlFor="quantity"
                        className="block text-sm font-medium text-gray-800 dark:text-gray-200 mb-2"
                    >
                        Quantity
                    </label>
                    <QuantitySelector
                        quantity={quantity}
                        setQuantity={setQuantity}
                        max={10}
                        min={1}
                        className="w-fit"
                    />
                </div>

                <div className="flex-1 flex items-end">
                    <AddToCartButton
                        onClick={handleAddToCart}
                        disabled={isAddToCartDisabled}
                        loading={isLoading}
                        className="w-full sm:w-auto cursor-pointer"
                    />
                </div>
            </div>

            {/* Features */}
            <ul className="list-disc pl-5 space-y-2 text-gray-800 dark:text-gray-300">
                {product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                ))}
            </ul>

            {/* Expandable Sections */}
            <div className="space-y-0 mt-6 pt-6">
                <ExpandableSection title="Product Details" initiallyExpanded>
                    <HtmlContent content={product.details} />
                </ExpandableSection>

                <ExpandableSection title="Materials & Care">
                    <HtmlContent content={product.materials} />
                </ExpandableSection>

                <ExpandableSection title="Shipping & Returns">
                    <HtmlContent content={product.shipping} />
                </ExpandableSection>
            </div>
        </div>
    );
};

export default ProductInfo;
