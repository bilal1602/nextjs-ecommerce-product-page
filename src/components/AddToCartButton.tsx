"use client";

import React from "react";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AddToCartButtonProps {
    onClick: () => void;
    disabled?: boolean;
    loading?: boolean;
    className?: string;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ onClick, disabled = false, loading = false, className }) => {
    return (
        <Button
            onClick={onClick}
            disabled={disabled || loading}
            className={className}
            variant="default"
            size="lg"
            type="button"
        >
            <ShoppingCart className="mr-2 h-5 w-5" />
            {loading ? "Adding..." : "Add to Cart"}
        </Button>
    );
};

export default AddToCartButton;
