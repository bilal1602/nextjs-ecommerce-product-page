"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface ExpandableSectionProps {
    title: string;
    children: React.ReactNode;
    initiallyExpanded?: boolean;
    className?: string;
}

const ExpandableSection: React.FC<ExpandableSectionProps> = ({
    title,
    children,
    initiallyExpanded = false,
    className,
}) => {
    const [isExpanded, setIsExpanded] = useState(initiallyExpanded);

    return (
        <div className={cn("border-t border-gray-200 dark:border-gray-700", className)}>
            <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex justify-between items-center w-full py-4 text-left"
                aria-expanded={isExpanded}
            >
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">{title}</h3>
                {isExpanded ? (
                    <ChevronUp className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                )}
            </button>

            <div
                className={cn(
                    "overflow-hidden transition-all duration-300 ease-in-out",
                    isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                )}
            >
                <div className="pb-4">{children}</div>
            </div>
        </div>
    );
};

export default ExpandableSection;
