"use client";

import { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import AddProductForm from "@/components/AddProductForm";
import ProductModal from "@/components/ProductModal";
import { fetchAllProducts, fetchProductByImdbId } from "@/lib/api";
import { Product } from "@/types";

export default function Dashboard() {
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProducts = async () => {
        try {
            const data = await fetchAllProducts();
            setProducts(data);
            setLoading(false);
        } catch (err) {
            setError("Error fetching products");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleProductClick = async (imdbId: string) => {
        try {
            const product = await fetchProductByImdbId(imdbId);
            setSelectedProduct(product);
        } catch (err) {
            setError("Error fetching product details");
        }
    };

    const handleProductAdded = () => {
        fetchProducts();
    };

    return (
        <div className="container mx-auto p-8 min-h-screen font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-8">
                <section className="text-center">
                    <h2 className="text-3xl font-bold mb-4">DVS Computers Dashboard</h2>
                    <p className="text-lg text-gray-600">
                        Manage your product inventory and add new products.
                    </p>
                </section>
                {error && <p className="text-red-500 text-center">{error}</p>}
                <section className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    <AddProductForm onProductAdded={handleProductAdded} />
                    <div className="lg:col-span-3">
                        <h3 className="text-2xl font-semibold mb-4">Current Products</h3>
                        {loading ? (
                            <p className="text-center text-gray-600">Loading products...</p>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                {products.map((product) => (
                                    <ProductCard
                                        key={product.imdbId}
                                        product={product}
                                        onClick={() => handleProductClick(product.imdbId)}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </section>
                {selectedProduct && (
                    <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
                )}
            </main>
        </div>
    );
}