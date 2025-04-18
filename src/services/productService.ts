import productData from "@/data/products.json";

export interface Product {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    description: string;
    features: string[];
    colors: {
        name: string;
        value: string;
        inStock: boolean;
    }[];
    sizes: {
        name: string;
        value: string;
        inStock: boolean;
    }[];
    details: string;
    materials: string;
    shipping: string;
    images: {
        src: string;
        alt: string;
        color?: string;
    }[];
}

// Simulate API request delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const getProducts = async (): Promise<Product[]> => {
    // Simulate network request
    // await delay(500);
    return productData;
};

export const getProductById = async (id: string): Promise<Product | undefined> => {
    // Simulate network request
    await delay(500);
    return productData.find(product => product.id === id);
};
