import { getProducts, getProductById } from "@/services/productService";

export async function fetchProducts() {
    try {
        return await getProducts();
    } catch (error) {
        console.error("Error fetching products:", error);
        throw new Error("Failed to fetch products");
    }
}

export async function fetchProductById(id: string) {
    try {
        const product = await getProductById(id);
        if (!product) {
            throw new Error(`Product with id ${id} not found`);
        }
        return product;
    } catch (error) {
        console.error(`Error fetching product ${id}:`, error);
        throw new Error(`Failed to fetch product ${id}`);
    }
}
