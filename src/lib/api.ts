import { Product } from "@/types";
const API_URL = "/api/v1/product"; // Use relative path for proxy

export async function fetchAllProducts(): Promise<Product[]> {
    try {
        const response = await fetch(API_URL, { cache: 'no-store' });
        if (!response.ok) {
            throw new Error(`Failed to fetch products: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        console.log("API response:", data); // Log response for debugging
        return data;
    } catch (error) {
        console.error("Error in fetchAllProducts:", error);
        throw error;
    }
}

export async function fetchProductByImdbId(imdbId: string): Promise<Product> {
    try {
        const response = await fetch(`${API_URL}/${imdbId}`, { cache: 'no-store' });
        if (!response.ok) {
            throw new Error(`Failed to fetch product: ${response.status} ${response.statusText}`);
        }
        return response.json();
    } catch (error) {
        console.error(`Error fetching product ${imdbId}:`, error);
        throw error;
    }
}

export async function createProduct(product: Omit<Product, "imdbId"> & { imdbId: string }): Promise<Product> {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(product),
        });
        if (!response.ok) {
            throw new Error(`Failed to create product: ${response.status} ${response.statusText}`);
        }
        return response.json();
    } catch (error) {
        console.error("Error in createProduct:", error);
        throw error;
    }
}

export async function updateProduct(imdbId: string, product: Partial<Omit<Product, "imdbId">> & { imdbId: string }): Promise<Product> {
    try {
        console.log(`Updating product with imdbId: ${imdbId}`, product); // Debug log
        const response = await fetch(`${API_URL}/${imdbId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(product),
        });
        if (!response.ok) {
            const errorText = await response.text(); // Get error details
            throw new Error(`Failed to update product: ${response.status} ${response.statusText}. Details: ${errorText}`);
        }
        return response.json();
    } catch (error) {
        console.error(`Error in updateProduct for imdbId ${imdbId}:`, error);
        throw error;
    }
}

export async function DeleteProduct(imdbId: string): Promise<Product> {
    try {
        const response = await fetch(`${API_URL}/${imdbId}`, { method: "DELETE" });
        if (!response.ok) {
            throw new Error(`Failed to delete product: ${response.status} ${response.statusText}`);
        }
        return response.json();
    } catch (error) {
        console.error(`Error in deleteProduct ${imdbId}:`, error);
        throw error;
    }
}