"use client";

import React from "react";

interface FooterLink {
    href: string;
    label: string;
}

interface FooterLinkGroupProps {
    title: string;
    links: FooterLink[];
}

export function FooterLinkGroup({ title, links }: FooterLinkGroupProps) {
    return (
        <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">{title}</h3>
            <ul className="space-y-2">
                {links.map((link, index) => (
                    <li key={index}>
                        <a
                            href={link.href}
                            className="text-gray-800 dark:text-gray-300 hover:text-blue-700 dark:hover:text-white transition-colors duration-200"
                        >
                            {link.label}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}
