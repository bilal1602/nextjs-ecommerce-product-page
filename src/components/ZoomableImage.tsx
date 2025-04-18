"use client";

import React, { useState, useRef } from "react";
import { cn } from "@/lib/utils";

interface ZoomableImageProps {
    src: string;
    alt: string;
    className?: string;
}

const ZoomableImage: React.FC<ZoomableImageProps> = ({ src, alt, className }) => {
    const [isZoomed, setIsZoomed] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const imageRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!imageRef.current) return;

        const { left, top, width, height } = imageRef.current.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;

        setPosition({ x, y });
    };

    const handleMouseEnter = () => {
        setIsZoomed(true);
    };

    const handleMouseLeave = () => {
        setIsZoomed(false);
    };

    return (
        <div
            ref={imageRef}
            className={cn("relative overflow-hidden rounded-lg cursor-zoom-in", className)}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <img src={src} alt={alt} className="w-full h-full object-cover transition-transform duration-200" />
            {isZoomed && (
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        backgroundImage: `url(${src})`,
                        backgroundPosition: `${position.x}% ${position.y}%`,
                        backgroundSize: "250%",
                        backgroundRepeat: "no-repeat",
                    }}
                />
            )}
        </div>
    );
};

export default ZoomableImage;
