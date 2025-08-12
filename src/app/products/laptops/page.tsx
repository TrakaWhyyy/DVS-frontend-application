"use client";

import { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import { fetchAllProducts } from "@/lib/api";
import { Product } from "@/types";

export default function Laptops() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await fetchAllProducts();
                const laptops = data.filter((product) =>
                    product.productTypes.includes("Laptop")
                );
                setProducts(laptops);
                setLoading(false);
            } catch (err) {
                setError("Error fetching products");
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div className="container mx-auto p-8 min-h-screen font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-8">
                <section className="text-center">

                </section>
                {error && <p className="text-red-500 text-center">{error}</p>}
                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {loading ? (
                        <p className="text-center text-gray-600">Loading products...</p>
                    ) : (
                        products.map((product) => (
                            <ProductCard key={product.imdbId} product={product} />
                        ))
                    )}
                </section>
            </main>
        </div>
    );
}