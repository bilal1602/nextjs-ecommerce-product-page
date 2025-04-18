"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import DirectButton from "./DirectButton";

const PrimaryColorTest: React.FC = () => {
    return (
        <div className="p-6 space-y-8">
            <div className="space-y-4">
                <h2 className="text-xl font-semibold">Primary Color Test</h2>

                <div className="flex flex-wrap gap-4">
                    <Button>Default Button</Button>
                    <Button variant="outline">Outline Button</Button>
                    <Button variant="secondary">Secondary Button</Button>
                    <Button variant="destructive">Destructive Button</Button>
                </div>

                <div className="mt-6">
                    <h3 className="text-lg font-medium mb-3">Direct Buttons (Hardcoded Colors)</h3>
                    <div className="flex flex-wrap gap-4">
                        <DirectButton>Direct Primary</DirectButton>
                        <DirectButton variant="secondary">Direct Secondary</DirectButton>
                        <DirectButton variant="outline">Direct Outline</DirectButton>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <div className="p-4 border rounded">
                        <p className="text-primary">Text Primary</p>
                    </div>
                    <div className="p-4 bg-primary text-primary-foreground rounded">Background Primary</div>
                    <div className="p-4 border-2 border-primary rounded">Border Primary</div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div className="p-4 border rounded">
                        <p className="text-primary-direct">Text Primary Direct</p>
                    </div>
                    <div className="p-4 bg-primary-direct text-white dark:text-gray-900 rounded">
                        Background Primary Direct
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <h2 className="text-xl font-semibold">CSS Variable Tests</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 border rounded">
                        <p style={{ color: "hsl(var(--primary))" }}>HSL using var(--primary)</p>
                    </div>
                    <div className="p-4 border rounded">
                        <p style={{ color: "hsl(222.2, 47.4%, 11.2%)" }}>Direct HSL value</p>
                    </div>
                    <div className="p-4 border rounded">
                        <p style={{ color: "hsl(222.2 47.4% 11.2%)" }}>HSL without commas</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="text-lg font-medium">Background Tests</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 text-white rounded" style={{ backgroundColor: "hsl(var(--primary))" }}>
                            Background with var(--primary)
                        </div>
                        <div className="p-4 text-white rounded" style={{ backgroundColor: "hsl(222.2, 47.4%, 11.2%)" }}>
                            Background with commas
                        </div>
                        <div className="p-4 text-white rounded" style={{ backgroundColor: "hsl(222.2 47.4% 11.2%)" }}>
                            Background without commas
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrimaryColorTest;
