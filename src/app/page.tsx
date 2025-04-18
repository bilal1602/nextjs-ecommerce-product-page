"use client";

import React, { useState, useEffect } from "react";
import ProductGallery from "@/components/ProductGallery";
import ProductInfo from "@/components/ProductInfo";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import CartDrawer from "@/components/CartDrawer";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import ThemeToggle from "@/components/ThemeToggle";
import { fetchProductById } from "@/api/products";
import { Product } from "@/services/productService";
import { Skeleton } from "@/components/ui/skeleton";
import { FooterLinkGroup } from "@/components/FooterLinkGroup";
import { useTheme } from "next-themes";

const Index = () => {
    const { theme = "system" } = useTheme();
    console.log(theme);
    const { cart } = useCart();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadProduct = async () => {
            try {
                setLoading(true);
                const data = await fetchProductById("premium-headphones-01");
                setProduct(data);
                setError(null);
            } catch (err) {
                console.error("Failed to fetch product:", err);
                setError("Failed to load product. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        loadProduct();
    }, []);

    const shopLinks = [
        { href: "#", label: "Headphones" },
        { href: "#", label: "Speakers" },
        { href: "#", label: "Accessories" },
        { href: "#", label: "Special Offers" },
    ];

    const supportLinks = [
        { href: "#", label: "Contact Us" },
        { href: "#", label: "FAQs" },
        { href: "#", label: "Warranty" },
        { href: "#", label: "Returns" },
    ];

    const companyLinks = [
        { href: "#", label: "About Us" },
        { href: "#", label: "Careers" },
        { href: "#", label: "Privacy Policy" },
        { href: "#", label: "Terms of Service" },
    ];

    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Header */}
            <header className="border-b border-border bg-background">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <h2 className="text-xl font-bold">SoundCore</h2>
                    </div>

                    <div className="flex items-center space-x-4">
                        <ThemeToggle />
                        <Sheet>
                            <SheetTrigger asChild>
                                <button className="flex items-center text-foreground hover:text-foreground/80 transition-colors relative">
                                    <ShoppingCart className="h-6 w-6 cursor-pointer" />
                                    {cart.totalItems > 0 && (
                                        <span className="absolute -top-2 -right-2 bg-product-blue text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                            {cart.totalItems}
                                        </span>
                                    )}
                                </button>
                            </SheetTrigger>
                            <CartDrawer />
                        </Sheet>
                    </div>
                </div>
            </header>

            {/* Breadcrumbs */}
            <div className="container mx-auto px-4 py-4">
                <nav className="text-sm" aria-label="Breadcrumb">
                    <ol className="flex space-x-2">
                        <li>
                            <a
                                href="#"
                                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                            >
                                Home
                            </a>
                        </li>
                        <li className="text-gray-500 dark:text-gray-400">/</li>
                        <li>
                            <a
                                href="#"
                                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                            >
                                Audio
                            </a>
                        </li>
                        <li className="text-gray-500 dark:text-gray-400">/</li>
                        <li>
                            <a
                                href="#"
                                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                            >
                                Headphones
                            </a>
                        </li>
                        <li className="text-gray-500 dark:text-gray-400">/</li>
                        <li className="text-gray-900 dark:text-gray-200 font-medium" aria-current="page">
                            {loading ? "Loading..." : product?.name || "Product"}
                        </li>
                    </ol>
                </nav>
            </div>

            {/* Product Section */}
            <main className="container mx-auto px-4 py-8">
                {error && (
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 p-4 rounded-md mb-8">
                        {error}
                    </div>
                )}

                {loading ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                        <div className="aspect-square relative bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden">
                            <Skeleton className="h-full w-full" />
                        </div>

                        <div className="space-y-6">
                            <Skeleton className="h-10 w-3/4" />
                            <Skeleton className="h-6 w-1/4" />
                            <Skeleton className="h-20 w-full" />
                            <Skeleton className="h-8 w-1/2" />
                            <Skeleton className="h-8 w-3/4" />
                            <Skeleton className="h-10 w-1/3" />
                            <div className="space-y-2">
                                {[1, 2, 3, 4, 5].map(i => (
                                    <Skeleton key={i} className="h-6 w-full" />
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    product && (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                            <ProductGallery images={product.images} />
                            <ProductInfo product={product} />
                        </div>
                    )
                )}
            </main>

            {/* Footer */}
            <footer className="border-t border-border bg-background bg-secondary mt-20">
                <div className="container mx-auto py-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 px-4 gap-8">
                        <FooterLinkGroup title="Shop" links={shopLinks} />
                        <FooterLinkGroup title="Support" links={supportLinks} />
                        <FooterLinkGroup title="Company" links={companyLinks} />
                    </div>

                    <div className="mt-8 pt-8 border-t border-gray-300 dark:border-gray-700">
                        <p className="text-center text-gray-700 dark:text-gray-400">
                            &copy; 2025 SoundCore. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Index;
