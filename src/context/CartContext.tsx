"use client";

import React, { createContext, useContext, useReducer } from "react";

export type CartItem = {
    id: string;
    name: string;
    price: number;
    color: string;
    size: string;
    quantity: number;
    image: string;
};

type CartState = {
    items: CartItem[];
    totalItems: number;
    totalPrice: number;
};

type CartAction =
    | { type: "ADD_TO_CART"; payload: CartItem }
    | { type: "REMOVE_FROM_CART"; payload: { id: string; color: string; size: string } }
    | { type: "UPDATE_QUANTITY"; payload: { id: string; color: string; size: string; quantity: number } }
    | { type: "CLEAR_CART" };

const initialState: CartState = {
    items: [],
    totalItems: 0,
    totalPrice: 0,
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
    switch (action.type) {
        case "ADD_TO_CART": {
            const existingItemIndex = state.items.findIndex(
                item =>
                    item.id === action.payload.id &&
                    item.color === action.payload.color &&
                    item.size === action.payload.size
            );

            if (existingItemIndex > -1) {
                // Item already exists, update quantity
                const updatedItems = [...state.items];
                updatedItems[existingItemIndex].quantity += action.payload.quantity;

                return {
                    ...state,
                    items: updatedItems,
                    totalItems: state.totalItems + action.payload.quantity,
                    totalPrice: state.totalPrice + action.payload.price * action.payload.quantity,
                };
            } else {
                // New item
                return {
                    ...state,
                    items: [...state.items, action.payload],
                    totalItems: state.totalItems + action.payload.quantity,
                    totalPrice: state.totalPrice + action.payload.price * action.payload.quantity,
                };
            }
        }
        case "REMOVE_FROM_CART": {
            const itemToRemove = state.items.find(
                item =>
                    item.id === action.payload.id &&
                    item.color === action.payload.color &&
                    item.size === action.payload.size
            );

            if (!itemToRemove) return state;

            const filteredItems = state.items.filter(
                item =>
                    !(
                        item.id === action.payload.id &&
                        item.color === action.payload.color &&
                        item.size === action.payload.size
                    )
            );

            return {
                ...state,
                items: filteredItems,
                totalItems: state.totalItems - itemToRemove.quantity,
                totalPrice: state.totalPrice - itemToRemove.price * itemToRemove.quantity,
            };
        }
        case "UPDATE_QUANTITY": {
            const existingItemIndex = state.items.findIndex(
                item =>
                    item.id === action.payload.id &&
                    item.color === action.payload.color &&
                    item.size === action.payload.size
            );

            if (existingItemIndex === -1) return state;

            const item = state.items[existingItemIndex];
            const quantityDiff = action.payload.quantity - item.quantity;

            const updatedItems = [...state.items];
            updatedItems[existingItemIndex] = {
                ...item,
                quantity: action.payload.quantity,
            };

            return {
                ...state,
                items: updatedItems,
                totalItems: state.totalItems + quantityDiff,
                totalPrice: state.totalPrice + item.price * quantityDiff,
            };
        }
        case "CLEAR_CART":
            return initialState;
        default:
            return state;
    }
};

type CartContextType = {
    cart: CartState;
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: string, color: string, size: string) => void;
    updateQuantity: (id: string, color: string, size: string, quantity: number) => void;
    clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cart, dispatch] = useReducer(cartReducer, initialState);

    const addToCart = (item: CartItem) => {
        dispatch({ type: "ADD_TO_CART", payload: item });
    };

    const removeFromCart = (id: string, color: string, size: string) => {
        dispatch({
            type: "REMOVE_FROM_CART",
            payload: { id, color, size },
        });
    };

    const updateQuantity = (id: string, color: string, size: string, quantity: number) => {
        dispatch({
            type: "UPDATE_QUANTITY",
            payload: { id, color, size, quantity },
        });
    };

    const clearCart = () => {
        dispatch({ type: "CLEAR_CART" });
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};
