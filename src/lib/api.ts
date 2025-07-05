import { Product } from "@/types";
const API_URL = "http://localhost:8005/api/v1/product";

export async function fetchAllProducts(): Promise<Product[]> {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Failed to fetch products");
    return response.json();
}

export async function fetchProductByImdbId(imdbId: string): Promise<Product> {
    const response = await fetch(`${API_URL}/${imdbId}`);
    if (!response.ok) throw new Error("Failed to fetch product");
    return response.json();
}

export async function createProduct(product: Omit<Product, "imdbId"> & { imdbId: string }): Promise<Product> {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
    });
    if (!response.ok) throw new Error("Failed to create product");
    return response.json();
}