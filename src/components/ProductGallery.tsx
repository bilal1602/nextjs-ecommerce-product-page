"use client";

import React, { useState, useEffect } from "react";
import ZoomableImage from "./ZoomableImage";

interface ProductImage {
    src: string;
    alt: string;
    color?: string;
}

interface ProductGalleryProps {
    images: ProductImage[];
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ images }) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [selectedColor, setSelectedColor] = useState<string | null>(null);

    // Listen for color changes
    useEffect(() => {
        const handleColorChange = (event: CustomEvent) => {
            setSelectedColor(event.detail);
            setSelectedIndex(0); // Reset to the first image when color changes
        };

        // Add event listener
        document.addEventListener("color-changed", handleColorChange as EventListener);

        // Clean up
        return () => {
            document.removeEventListener("color-changed", handleColorChange as EventListener);
        };
    }, []);

    // Filter images by color if a color is selected
    const filteredImages = selectedColor ? images.filter(img => !img.color || img.color === selectedColor) : images;

    // If no images match the filter, show all images
    const displayImages = filteredImages.length > 0 ? filteredImages : images;

    // Make sure selectedIndex is valid for the current filtered images
    const safeIndex = Math.min(selectedIndex, displayImages.length - 1);

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Thumbnails */}
            <div className="hidden md:flex md:flex-col space-y-4 order-1 md:order-1">
                {displayImages.map((image, index) => (
                    <div
                        key={index}
                        className={`cursor-pointer rounded-md overflow-hidden border-2 transition-all ${
                            index === safeIndex ? "border-product-blue" : "border-transparent"
                        }`}
                        onClick={() => setSelectedIndex(index)}
                    >
                        <img src={image.src} alt={`Thumbnail ${index + 1}`} className="w-full h-24 object-cover" />
                    </div>
                ))}
            </div>

            {/* Main Image */}
            <div className="col-span-1 md:col-span-3 order-2 md:order-2">
                <ZoomableImage
                    src={displayImages[safeIndex].src}
                    alt={displayImages[safeIndex].alt}
                    className="w-full h-[400px] md:h-[600px]"
                />
            </div>

            {/* Mobile Thumbnails */}
            <div className="flex overflow-x-auto space-x-4 md:hidden order-3 mt-4">
                {displayImages.map((image, index) => (
                    <div
                        key={index}
                        className={`flex-shrink-0 cursor-pointer rounded-md overflow-hidden border-2 transition-all ${
                            index === safeIndex ? "border-product-blue" : "border-transparent"
                        }`}
                        onClick={() => setSelectedIndex(index)}
                    >
                        <img src={image.src} alt={`Thumbnail ${index + 1}`} className="w-20 h-20 object-cover" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductGallery;
