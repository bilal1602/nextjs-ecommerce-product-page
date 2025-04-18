import React from "react";
import { render, screen, renderHook, act } from "@testing-library/react";
import { CartProvider, useCart } from "@/context/CartContext";

const testItem = {
    id: "test-id",
    name: "Test Product",
    price: 99.99,
    color: "Red",
    size: "M",
    quantity: 1,
    image: "/test-image.jpg",
};

describe("CartContext", () => {
    // Setup a fresh CartProvider wrapper for each test
    const wrapper = ({ children }: { children: React.ReactNode }) => <CartProvider>{children}</CartProvider>;

    it("initializes with empty cart", () => {
        const { result } = renderHook(() => useCart(), { wrapper });

        expect(result.current.cart.items).toHaveLength(0);
        expect(result.current.cart.totalItems).toBe(0);
        expect(result.current.cart.totalPrice).toBe(0);
    });

    it("adds an item to cart correctly", () => {
        const { result } = renderHook(() => useCart(), { wrapper });

        act(() => {
            result.current.addToCart({ ...testItem });
        });

        expect(result.current.cart.items).toHaveLength(1);
        expect(result.current.cart.items[0].id).toBe(testItem.id);
        expect(result.current.cart.items[0].quantity).toBe(1);
        expect(result.current.cart.totalItems).toBe(1);
        expect(result.current.cart.totalPrice).toBe(testItem.price);
    });

    it("increases quantity when adding the same item again", () => {
        const { result } = renderHook(() => useCart(), { wrapper });

        // First item
        act(() => {
            result.current.addToCart({ ...testItem });
        });

        // Same item again
        act(() => {
            result.current.addToCart({ ...testItem });
        });

        expect(result.current.cart.items).toHaveLength(1);
        expect(result.current.cart.items[0].quantity).toBe(2);

        // The implementation adds the full quantity each time, not just +1
        // So expect 1 (first add) + 1 (second add) = 2 items
        expect(result.current.cart.totalItems).toBe(2);
        expect(result.current.cart.totalPrice).toBe(testItem.price * 2);
    });

    it("adds different items separately", () => {
        const { result } = renderHook(() => useCart(), { wrapper });
        const secondItem = { ...testItem, id: "test-id-2", name: "Second Product" };

        act(() => {
            result.current.addToCart({ ...testItem });
        });

        act(() => {
            result.current.addToCart({ ...secondItem });
        });

        expect(result.current.cart.items).toHaveLength(2);

        // The totalItems count should be the sum of quantities
        // item1.quantity (1) + item2.quantity (1) = 2
        expect(result.current.cart.totalItems).toBe(2);
        expect(result.current.cart.totalPrice).toBe(testItem.price * 2);
    });

    it("treats items with different sizes as different items", () => {
        const { result } = renderHook(() => useCart(), { wrapper });
        const largeItem = { ...testItem, size: "L" };

        act(() => {
            result.current.addToCart({ ...testItem });
        });

        act(() => {
            result.current.addToCart({ ...largeItem });
        });

        expect(result.current.cart.items).toHaveLength(2);
        expect(result.current.cart.totalItems).toBe(2);
    });

    it("treats items with different colors as different items", () => {
        const { result } = renderHook(() => useCart(), { wrapper });
        const blueItem = { ...testItem, color: "Blue" };

        act(() => {
            result.current.addToCart({ ...testItem });
        });

        act(() => {
            result.current.addToCart({ ...blueItem });
        });

        expect(result.current.cart.items).toHaveLength(2);
        expect(result.current.cart.totalItems).toBe(2);
    });

    it("removes an item from cart correctly", () => {
        const { result } = renderHook(() => useCart(), { wrapper });

        act(() => {
            result.current.addToCart({ ...testItem });
        });

        act(() => {
            result.current.removeFromCart(testItem.id, testItem.color, testItem.size);
        });

        expect(result.current.cart.items).toHaveLength(0);
        expect(result.current.cart.totalItems).toBe(0);
        expect(result.current.cart.totalPrice).toBe(0);
    });

    it("updates quantity of an item correctly", () => {
        const { result } = renderHook(() => useCart(), { wrapper });
        const newQuantity = 3;

        act(() => {
            result.current.addToCart({ ...testItem });
        });

        act(() => {
            result.current.updateQuantity(testItem.id, testItem.color, testItem.size, newQuantity);
        });

        expect(result.current.cart.items[0].quantity).toBe(newQuantity);
        expect(result.current.cart.totalItems).toBe(newQuantity);
        expect(result.current.cart.totalPrice).toBe(testItem.price * newQuantity);
    });

    it("clears the cart correctly", () => {
        const { result } = renderHook(() => useCart(), { wrapper });

        act(() => {
            result.current.addToCart({ ...testItem });
        });

        act(() => {
            result.current.clearCart();
        });

        expect(result.current.cart.items).toHaveLength(0);
        expect(result.current.cart.totalItems).toBe(0);
        expect(result.current.cart.totalPrice).toBe(0);
    });

    it("throws an error when useCart is used outside of CartProvider", () => {
        const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});

        expect(() => {
            renderHook(() => useCart());
        }).toThrow("useCart must be used within a CartProvider");

        consoleErrorSpy.mockRestore();
    });
});
