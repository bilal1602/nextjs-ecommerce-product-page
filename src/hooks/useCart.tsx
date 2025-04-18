"use client";

import { useCart as useCartFromContext } from "../context/CartContext";

// Re-exporting the hook for cleaner imports
export const useCart = useCartFromContext;
