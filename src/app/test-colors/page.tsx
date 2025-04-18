import React from "react";
import ColorTest from "@/components/ColorTest";
import PrimaryColorTest from "@/components/PrimaryColorTest";

export default function TestColorsPage() {
    return (
        <main className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-8">Color Testing Page</h1>
            <div className="mb-12">
                <PrimaryColorTest />
            </div>
            <div className="mb-12">
                <ColorTest />
            </div>
        </main>
    );
}
