"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import AddProductForm from "@/components/AddProductForm";
import UpdateProductForm from "@/components/UpdateProductForm";
import ProductModal from "@/components/ProductModal";
import { DeleteProduct, fetchAllProducts, fetchProductByImdbId } from "@/lib/api";
import { Product } from "@/types";

export default function Dashboard() {
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    const checkAuth = async () => {
        try {
            const res = await fetch("http://localhost:8005/api/v1/auth/check", {
                credentials: "include",
            });
            if (!res.ok) {
                router.push("/login");
            } else {
                setIsAuthenticated(true);
            }
        } catch {
            router.push("/login");
        }
    };

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
        checkAuth();
        if (isAuthenticated) {
            fetchProducts();
        }
    }, [isAuthenticated]);

    const handleProductClick = async (imdbId: string) => {
        try {
            const product = await fetchProductByImdbId(imdbId);
            setSelectedProduct(product);
            setIsUpdating(true);
        } catch (err) {
            setError("Error fetching product details");
        }
    };

    const handleProductDelete = async (imdbId: string) => {
        if (confirm("Are you sure you want to delete this product?")) {
            try {
                await DeleteProduct(imdbId);
                setProducts(products.filter((product) => product.imdbId !== imdbId));
                setSelectedProduct(null);
                setIsUpdating(false);
            } catch (err) {
                setError("Error deleting product");
            }
        }
    };

    const handleProductAdded = () => {
        fetchProducts();
        setIsUpdating(false);
    };

    const handleProductUpdated = () => {
        fetchProducts();
        setSelectedProduct(null);
        setIsUpdating(false);
    };

    const handleLogout = async () => {
        await fetch("http://localhost:8005/api/v1/logout", {
            method: "POST",
            credentials: "include",
        });
        router.push("/login");
    };

    if (!isAuthenticated) {
        return <p className="text-center">Redirecting to login...</p>;
    }

    return (
        <div className="container mx-auto p-8 min-h-screen font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-8">
                <section className="text-center">
                    <h2 className="text-3xl font-bold mb-4">DVS Computers Dashboard</h2>
                    <p className="text-lg text-gray-600">
                        Manage your product inventory and add new products.
                    </p>
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </section>
                {error && <p className="text-red-500 text-center">{error}</p>}
                <section className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    <div className="relative">
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                            onMouseEnter={() => setIsDropdownOpen(true)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                 className="size-6">
                                <path
                                    d="M17.004 10.407c.138.435-.216.842-.672.842h-3.465a.75.75 0 0 1-.65-.375l-1.732-3c-.229-.396-.053-.907.393-1.004a5.252 5.252 0 0 1 6.126 3.537ZM8.12 8.464c.307-.338.838-.235 1.066.16l1.732 3a.75.75 0 0 1 0 .75l-1.732 3c-.229.397-.76.5-1.067.161A5.23 5.23 0 0 1 6.75 12a5.23 5.23 0 0 1 1.37-3.536ZM10.878 17.13c-.447-.098-.623-.608-.394-1.004l1.733-3.002a.75.75 0 0 1 .65-.375h3.465c.457 0 .81.407.672.842a5.252 5.252 0 0 1-6.126 3.539Z"/>
                                <path fill-rule="evenodd"
                                      d="M21 12.75a.75.75 0 1 0 0-1.5h-.783a8.22 8.22 0 0 0-.237-1.357l.734-.267a.75.75 0 1 0-.513-1.41l-.735.268a8.24 8.24 0 0 0-.689-1.192l.6-.503a.75.75 0 1 0-.964-1.149l-.6.504a8.3 8.3 0 0 0-1.054-.885l.391-.678a.75.75 0 1 0-1.299-.75l-.39.676a8.188 8.188 0 0 0-1.295-.47l.136-.77a.75.75 0 0 0-1.477-.26l-.136.77a8.36 8.36 0 0 0-1.377 0l-.136-.77a.75.75 0 1 0-1.477.26l.136.77c-.448.121-.88.28-1.294.47l-.39-.676a.75.75 0 0 0-1.3.75l.392.678a8.29 8.29 0 0 0-1.054.885l-.6-.504a.75.75 0 1 0-.965 1.149l.6.503a8.243 8.243 0 0 0-.689 1.192L3.8 8.216a.75.75 0 1 0-.513 1.41l.735.267a8.222 8.222 0 0 0-.238 1.356h-.783a.75.75 0 0 0 0 1.5h.783c.042.464.122.917.238 1.356l-.735.268a.75.75 0 0 0 .513 1.41l.735-.268c.197.417.428.816.69 1.191l-.6.504a.75.75 0 0 0 .963 1.15l.601-.505c.326.323.679.62 1.054.885l-.392.68a.75.75 0 0 0 1.3.75l.39-.679c.414.192.847.35 1.294.471l-.136.77a.75.75 0 0 0 1.477.261l.137-.772a8.332 8.332 0 0 0 1.376 0l.136.772a.75.75 0 1 0 1.477-.26l-.136-.771a8.19 8.19 0 0 0 1.294-.47l.391.677a.75.75 0 0 0 1.3-.75l-.393-.679a8.29 8.29 0 0 0 1.054-.885l.601.504a.75.75 0 0 0 .964-1.15l-.6-.503c.261-.375.492-.774.69-1.191l.735.267a.75.75 0 1 0 .512-1.41l-.734-.267c.115-.439.195-.892.237-1.356h.784Zm-2.657-3.06a6.744 6.744 0 0 0-1.19-2.053 6.784 6.784 0 0 0-1.82-1.51A6.705 6.705 0 0 0 12 5.25a6.8 6.8 0 0 0-1.225.11 6.7 6.7 0 0 0-2.15.793 6.784 6.784 0 0 0-2.952 3.489.76.76 0 0 1-.036.098A6.74 6.74 0 0 0 5.251 12a6.74 6.74 0 0 0 3.366 5.842l.009.005a6.704 6.704 0 0 0 2.18.798l.022.003a6.792 6.792 0 0 0 2.368-.004 6.704 6.704 0 0 0 2.205-.811 6.785 6.785 0 0 0 1.762-1.484l.009-.01.009-.01a6.743 6.743 0 0 0 1.18-2.066c.253-.707.39-1.469.39-2.263a6.74 6.74 0 0 0-.408-2.309Z"
                                      clip-rule="evenodd"/>
                            </svg>
                        </button>
                        {isDropdownOpen && (
                            <div
                                className="absolute z-10 mt-2 w-48 bg-white rounded-md shadow-lg"
                                onMouseEnter={() => setIsDropdownOpen(true)}
                                onMouseLeave={() => setIsDropdownOpen(false)}
                            >
                                <div className="py-1">
                                    <button
                                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition"
                                        onClick={() => {
                                            setSelectedProduct(null);
                                            setIsUpdating(false);
                                        }}
                                    >
                                        Add Product
                                    </button>
                                    <button
                                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        onClick={() => {
                                            if (products.length > 0) {
                                                handleProductClick(products[0].imdbId);
                                            }
                                        }}
                                    >
                                        Update Product
                                    </button>
                                </div>
                            </div>
                        )}
                        {isUpdating && selectedProduct ? (
                            <UpdateProductForm
                                product={selectedProduct}
                                onProductUpdated={handleProductUpdated}
                            />
                        ) : (
                            <AddProductForm onProductAdded={handleProductAdded}/>
                        )}
                    </div>
                    <div className="lg:col-span-3">
                        <h3 className="text-2xl font-semibold mb-4">Current Products</h3>
                        {loading ? (
                            <p className="text-center text-gray-600">Loading products...</p>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                {products.map((product) => (
                                    <div key={product.imdbId} className="flex flex-col gap-2">
                                        <ProductCard
                                            product={product}
                                            onClick={() => handleProductClick(product.imdbId)}
                                        />
                                        <div className="flex gap-2">
                                            <button
                                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                                                onClick={() => handleProductClick(product.imdbId)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
                                                onClick={() => handleProductDelete(product.imdbId)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </section>
                {selectedProduct && !isUpdating && (
                    <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
                )}
            </main>
        </div>
    );
}