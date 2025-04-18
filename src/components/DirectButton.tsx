"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface DirectButtonProps {
    onClick?: () => void;
    disabled?: boolean;
    children: React.ReactNode;
    className?: string;
    variant?: "primary" | "secondary" | "outline";
}

const DirectButton: React.FC<DirectButtonProps> = ({
    onClick,
    disabled = false,
    children,
    className,
    variant = "primary",
}) => {
    const baseClasses =
        "inline-flex h-11 px-8 items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50";

    const variantClasses = {
        primary:
            "bg-[#1e293b] text-white hover:bg-[#334155] dark:bg-[#f8fafc] dark:text-[#0f172a] dark:hover:bg-[#e2e8f0]",
        secondary:
            "bg-[#f1f5f9] text-[#1e293b] hover:bg-[#e2e8f0] dark:bg-[#334155] dark:text-[#f8fafc] dark:hover:bg-[#475569]",
        outline: "border border-[#e2e8f0] hover:bg-[#f1f5f9] dark:border-[#334155] dark:hover:bg-[#1e293b]",
    };

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={cn(baseClasses, variantClasses[variant], className)}
            type="button"
        >
            {children}
        </button>
    );
};

export default DirectButton;
