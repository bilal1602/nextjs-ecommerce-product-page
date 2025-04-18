import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import QuantitySelector from "@/components/QuantitySelector";

// Mock next-themes
jest.mock("next-themes", () => ({
    useTheme: () => ({
        theme: "light",
        setTheme: jest.fn(),
    }),
}));

describe("QuantitySelector", () => {
    const mockSetQuantity = jest.fn();

    beforeEach(() => {
        mockSetQuantity.mockClear();
    });

    it("renders correctly with default values", () => {
        render(<QuantitySelector quantity={1} setQuantity={mockSetQuantity} />);

        expect(screen.getByRole("spinbutton")).toHaveValue(1);
        expect(screen.getByLabelText("Decrease quantity")).toBeDisabled();
        expect(screen.getByLabelText("Increase quantity")).not.toBeDisabled();
    });

    it("increases quantity when plus button is clicked", () => {
        render(<QuantitySelector quantity={1} setQuantity={mockSetQuantity} />);

        fireEvent.click(screen.getByLabelText("Increase quantity"));

        expect(mockSetQuantity).toHaveBeenCalledWith(2);
    });

    it("decreases quantity when minus button is clicked", () => {
        render(<QuantitySelector quantity={2} setQuantity={mockSetQuantity} />);

        fireEvent.click(screen.getByLabelText("Decrease quantity"));

        expect(mockSetQuantity).toHaveBeenCalledWith(1);
    });

    it("does not decrease below minimum value", () => {
        render(<QuantitySelector quantity={1} setQuantity={mockSetQuantity} min={1} />);

        fireEvent.click(screen.getByLabelText("Decrease quantity"));

        expect(mockSetQuantity).not.toHaveBeenCalled();
    });

    it("does not increase above maximum value", () => {
        render(<QuantitySelector quantity={10} setQuantity={mockSetQuantity} max={10} />);

        fireEvent.click(screen.getByLabelText("Increase quantity"));

        expect(mockSetQuantity).not.toHaveBeenCalled();
    });

    it("updates quantity when input value changes", () => {
        render(<QuantitySelector quantity={1} setQuantity={mockSetQuantity} />);

        fireEvent.change(screen.getByRole("spinbutton"), { target: { value: "5" } });

        expect(mockSetQuantity).toHaveBeenCalledWith(5);
    });

    it("handles non-numeric input correctly", () => {
        render(<QuantitySelector quantity={1} setQuantity={mockSetQuantity} />);

        fireEvent.change(screen.getByRole("spinbutton"), { target: { value: "abc" } });

        expect(mockSetQuantity).toHaveBeenCalledWith(1); // Should reset to min value
    });

    it("constrains input within min/max range", () => {
        render(<QuantitySelector quantity={5} setQuantity={mockSetQuantity} min={1} max={10} />);

        // Try to set below min
        fireEvent.change(screen.getByRole("spinbutton"), { target: { value: "0" } });
        expect(mockSetQuantity).not.toHaveBeenCalled();

        // Try to set above max
        fireEvent.change(screen.getByRole("spinbutton"), { target: { value: "11" } });
        expect(mockSetQuantity).not.toHaveBeenCalled();
    });

    it("applies custom className when provided", () => {
        const customClass = "custom-class";
        render(<QuantitySelector quantity={1} setQuantity={mockSetQuantity} className={customClass} />);

        const container = screen.getByRole("spinbutton").closest("div");
        expect(container?.className).toContain(customClass);
    });
});
