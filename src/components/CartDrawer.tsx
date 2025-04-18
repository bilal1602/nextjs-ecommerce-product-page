"use client";

import React from "react";
import { X, Trash2 } from "lucide-react";
import { SheetContent, SheetHeader, SheetTitle, SheetFooter, SheetClose } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { Separator } from "@/components/ui/separator";
import QuantitySelector from "./QuantitySelector";

const CartDrawer = () => {
    const { cart, removeFromCart, updateQuantity } = useCart();

    const handleQuantityChange = (id: string, color: string, size: string, quantity: number) => {
        updateQuantity(id, color, size, quantity);
    };

    const handleRemoveItem = (id: string, color: string, size: string) => {
        removeFromCart(id, color, size);
    };

    return (
        <SheetContent className="w-full bg-secondary sm:max-w-md overflow-y-auto">
            <SheetHeader className="px-1">
                <div className="flex items-center justify-between">
                    <SheetTitle>Shopping Cart ({cart.totalItems})</SheetTitle>
                </div>
            </SheetHeader>

            {cart.items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-72 text-center">
                    <div className="rounded-full bg-gray-100 p-6 mb-4">
                        <ShoppingBag className="h-12 w-12 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">Your cart is empty</h3>
                    <p className="text-gray-500 mb-6">Looks like you haven't added any items to your cart yet.</p>
                    <SheetClose asChild>
                        <Button>Continue Shopping</Button>
                    </SheetClose>
                </div>
            ) : (
                <>
                    <div className="space-y-6 py-6">
                        {cart.items.map(item => (
                            <div key={`${item.id}-${item.color}-${item.size}`} className="flex gap-4">
                                <div className="h-24 w-24 overflow-hidden rounded-md border">
                                    <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                                </div>
                                <div className="flex flex-1 flex-col justify-between">
                                    <div className="space-y-1">
                                        <h4 className="text-sm font-medium">{item.name}</h4>
                                        <div className="flex flex-wrap gap-x-4 text-sm text-gray-500">
                                            <p>Color: {item.color}</p>
                                            <p>Size: {item.size}</p>
                                        </div>
                                        <p className="text-sm font-medium">${item.price.toFixed(2)}</p>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="w-24">
                                            <QuantitySelector
                                                quantity={item.quantity}
                                                setQuantity={quantity =>
                                                    handleQuantityChange(item.id, item.color, item.size, quantity)
                                                }
                                                min={1}
                                                max={10}
                                            />
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => handleRemoveItem(item.id, item.color, item.size)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                            <span className="sr-only">Remove</span>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <Separator className="my-4" />

                    <div className="space-y-4">
                        <div className="flex justify-between text-sm">
                            <span>Subtotal</span>
                            <span>${cart.totalPrice.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span>Shipping</span>
                            <span>Calculated at checkout</span>
                        </div>
                        <div className="flex justify-between text-base font-medium">
                            <span>Total</span>
                            <span>${cart.totalPrice.toFixed(2)}</span>
                        </div>
                    </div>

                    <SheetFooter className="mt-6">
                        <Button className="w-full">Checkout</Button>
                    </SheetFooter>
                </>
            )}
        </SheetContent>
    );
};

// ShoppingBag icon component
const ShoppingBag = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    >
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4H6zM3 6h18" />
        <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
);

export default CartDrawer;
