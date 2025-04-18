import React from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";
import CartDrawer from "@/components/CartDrawer";
import { CartProvider } from "@/context/CartContext";

// Mock the useCart hook
jest.mock("@/hooks/useCart", () => ({
    useCart: () => ({
        cart: {
            items: [
                {
                    id: "test-1",
                    name: "Test Product 1",
                    price: 99.99,
                    color: "Red",
                    size: "M",
                    quantity: 1,
                    image: "/test-image.jpg",
                },
                {
                    id: "test-2",
                    name: "Test Product 2",
                    price: 49.99,
                    color: "Blue",
                    size: "L",
                    quantity: 2,
                    image: "/test-image-2.jpg",
                },
            ],
            totalItems: 3,
            totalPrice: 199.97,
        },
        removeFromCart: jest.fn(),
        updateQuantity: jest.fn(),
    }),
}));

// Mock sheet component from ui since we don't need to test its functionality
jest.mock("@/components/ui/sheet", () => ({
    SheetContent: ({ children }: { children: React.ReactNode }) => <div data-testid="sheet-content">{children}</div>,
    SheetHeader: ({ children }: { children: React.ReactNode }) => <div data-testid="sheet-header">{children}</div>,
    SheetTitle: ({ children }: { children: React.ReactNode }) => <div data-testid="sheet-title">{children}</div>,
    SheetFooter: ({ children }: { children: React.ReactNode }) => <div data-testid="sheet-footer">{children}</div>,
    SheetClose: ({ children, asChild }: { children: React.ReactNode; asChild?: boolean }) => (
        <div data-testid="sheet-close">{children}</div>
    ),
}));

// Mock the Button component
jest.mock("@/components/ui/button", () => ({
    Button: ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => (
        <button onClick={onClick} data-testid={typeof children === "string" ? children : "button"}>
            {children}
        </button>
    ),
}));

// Mock the Separator component
jest.mock("@/components/ui/separator", () => ({
    Separator: () => <hr data-testid="separator" />,
}));

describe("CartDrawer", () => {
    it("renders cart items correctly", () => {
        render(<CartDrawer />);

        expect(screen.getByText("Shopping Cart (3)")).toBeInTheDocument();
        expect(screen.getByText("Test Product 1")).toBeInTheDocument();
        expect(screen.getByText("Test Product 2")).toBeInTheDocument();
        expect(screen.getByText("Color: Red")).toBeInTheDocument();
        expect(screen.getByText("Size: M")).toBeInTheDocument();
        expect(screen.getByText("Color: Blue")).toBeInTheDocument();
        expect(screen.getByText("Size: L")).toBeInTheDocument();
        expect(screen.getByText("$99.99")).toBeInTheDocument();
        expect(screen.getByText("$49.99")).toBeInTheDocument();
    });

    it("displays cart summary correctly", () => {
        render(<CartDrawer />);

        expect(screen.getByText("Subtotal")).toBeInTheDocument();
        expect(screen.getAllByText("$199.97")[0]).toBeInTheDocument();
        expect(screen.getByText("Shipping")).toBeInTheDocument();
        expect(screen.getByText("Calculated at checkout")).toBeInTheDocument();
        expect(screen.getByText("Total")).toBeInTheDocument();
    });

    it("has a checkout button", () => {
        render(<CartDrawer />);

        const footer = screen.getByTestId("sheet-footer");
        const checkoutButton = within(footer).getByText("Checkout");
        expect(checkoutButton).toBeInTheDocument();
    });
});
