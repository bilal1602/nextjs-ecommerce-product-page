import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AddToCartButton from "@/components/AddToCartButton";

describe("AddToCartButton", () => {
    const mockOnClick = jest.fn();

    beforeEach(() => {
        mockOnClick.mockClear();
    });

    it("renders correctly", () => {
        render(<AddToCartButton onClick={mockOnClick} />);

        expect(screen.getByRole("button", { name: /add to cart/i })).toBeInTheDocument();
        expect(screen.getByText("Add to Cart")).toBeInTheDocument();
    });

    it("calls onClick handler when clicked", () => {
        render(<AddToCartButton onClick={mockOnClick} />);

        fireEvent.click(screen.getByRole("button", { name: /add to cart/i }));

        expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it("shows loading state", () => {
        render(<AddToCartButton onClick={mockOnClick} loading={true} />);

        expect(screen.getByText("Adding...")).toBeInTheDocument();
        expect(screen.queryByText("Add to Cart")).not.toBeInTheDocument();
    });

    it("is disabled when the disabled prop is true", () => {
        render(<AddToCartButton onClick={mockOnClick} disabled={true} />);

        expect(screen.getByRole("button", { name: /add to cart/i })).toBeDisabled();
    });

    it("is disabled when in loading state", () => {
        render(<AddToCartButton onClick={mockOnClick} loading={true} />);

        expect(screen.getByRole("button", { name: /adding/i })).toBeDisabled();
    });

    it("applies custom className when provided", () => {
        const customClass = "custom-class";
        render(<AddToCartButton onClick={mockOnClick} className={customClass} />);

        const button = screen.getByRole("button", { name: /add to cart/i });
        expect(button.className).toContain(customClass);
    });
});
