"use client";

import React from "react";
import { parseHtmlString } from "@/lib/parseHtml";
import { cn } from "@/lib/utils";

interface HtmlContentProps {
    content: string;
    className?: string;
}

const HtmlContent: React.FC<HtmlContentProps> = ({ content, className }) => {
    return <div className={cn("prose prose-sm dark:prose-invert", className)}>{parseHtmlString(content)}</div>;
};

export default HtmlContent;
