"use client";

import { useState } from "react";
import { updateProduct } from "@/lib/api";

interface UpdateProductFormProps {
    product: {
        imdbId: string;
        name: string;
        price: number;
        description: string;
        photos: string;
        availability: boolean;
        productTypes: string;
    };
    onProductUpdated: () => void;
}

export default function UpdateProductForm({ product, onProductUpdated }: UpdateProductFormProps) {
    const [formData, setFormData] = useState({
        imdbId: product.imdbId,
        name: product.name,
        price: product.price.toString(),
        description: product.description,
        photos: product.photos,
        availability: product.availability,
        productTypes: product.productTypes,
    });
    const [error, setError] = useState<string | null>(null);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "availability" ? value === "true" : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const productPayload = {
                imdbId: formData.imdbId,
                name: formData.name,
                price: parseFloat(formData.price),
                description: formData.description,
                photos: formData.photos,
                availability: formData.availability,
                productTypes: formData.productTypes,
            };
            await updateProduct(product.imdbId, productPayload);
            onProductUpdated();
            setError(null);
        } catch (err) {
            setError("Failed to update product");
        }
    };

    return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-md p-6">
            <h3 className="text-2xl font-semibold mb-4">Update Product</h3>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="text"
                    name="name"
                    placeholder="Product Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    rows={4}
                    value={formData.description}
                    onChange={handleInputChange}
                    className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
                <input
                    type="text"
                    name="photos"
                    placeholder="Image URLs (comma-separated)"
                    value={formData.photos}
                    onChange={handleInputChange}
                    className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
                <select
                    name="availability"
                    value={formData.availability.toString()}
                    onChange={handleInputChange}
                    className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="true">In Stock</option>
                    <option value="false">Out of Stock</option>
                </select>
                <select
                    name="productTypes"
                    value={formData.productTypes.toString()}
                    onChange={handleInputChange}
                    className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                >
                    <option value="Accessory">Accessories</option>
                    <option value="Gaming PC">Gaming PC</option>
                    <option value="Laptop">Laptop</option>
                    <option value="Workstation">Workstation</option>
                </select>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                    Update Product
                </button>
            </form>
        </div>
    );
}