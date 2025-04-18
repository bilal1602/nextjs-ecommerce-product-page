// src/app/providers.tsx
"use client";

import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CartProvider } from "@/context/CartContext";
import { Toaster } from "@/components/ui/toaster";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Index from "./pages/Index";
// import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider attribute="class" defaultTheme="system">
            <QueryClientProvider client={queryClient}>
                <TooltipProvider>
                    <CartProvider>
                        <Toaster />
                        <Sonner />
                        {children}
                    </CartProvider>
                </TooltipProvider>
            </QueryClientProvider>
        </ThemeProvider>
    );
}
