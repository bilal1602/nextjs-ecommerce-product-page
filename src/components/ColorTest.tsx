"use client";

import React from "react";

const ColorTest: React.FC = () => {
    return (
        <div className="p-6 space-y-4">
            <h1 className="text-2xl font-bold">Color Test</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <h2 className="text-xl">Tailwind Default Colors</h2>
                    <div className="bg-red-500 p-2 text-white">bg-red-500</div>
                    <div className="bg-blue-500 p-2 text-white">bg-blue-500</div>
                    <div className="bg-green-500 p-2 text-white">bg-green-500</div>
                    <div className="bg-gray-500 p-2 text-white">bg-gray-500</div>
                </div>

                <div className="space-y-2">
                    <h2 className="text-xl">Theme Colors</h2>
                    <div className="bg-primary p-2 text-primary-foreground">bg-primary</div>
                    <div className="bg-secondary p-2 text-secondary-foreground">bg-secondary</div>
                    <div className="bg-accent p-2 text-accent-foreground">bg-accent</div>
                    <div className="bg-muted p-2 text-muted-foreground">bg-muted</div>
                </div>

                <div className="space-y-2">
                    <h2 className="text-xl">Product-specific Colors</h2>
                    <div className="bg-product-blue p-2 text-white">bg-product-blue</div>
                    <div className="bg-product-red p-2 text-white">bg-product-red</div>
                    <div className="bg-product-black p-2 text-white">bg-product-black</div>
                    <div className="bg-product-gray p-2 text-white">bg-product-gray</div>
                    <div className="bg-product-lightgray p-2 text-black">bg-product-lightgray</div>
                </div>

                <div className="space-y-2">
                    <h2 className="text-xl">Text Colors</h2>
                    <div className="text-primary p-2 border">text-primary</div>
                    <div className="text-secondary p-2 border">text-secondary</div>
                    <div className="text-product-blue p-2 border">text-product-blue</div>
                    <div className="text-product-red p-2 border">text-product-red</div>
                </div>
            </div>
        </div>
    );
};

export default ColorTest;
