"use client";

import { useState } from "react";
import { createProduct } from "@/lib/api";

interface AddProductFormProps {
    onProductAdded: () => void;
}

export default function AddProductForm({ onProductAdded }: AddProductFormProps) {
    const [formData, setFormData] = useState({
        imdbId: "",
        name: "",
        price: "",
        description: "",
        photos: "",
        availability: true,
        productTypes: "",
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
            await createProduct(productPayload);
            setFormData({
                imdbId: "",
                name: "",
                price: "",
                description: "",
                photos: "",
                availability: true,
                productTypes: "",
            });
            onProductAdded();
            setError(null);
        } catch (err) {
            setError("Failed to add product");
        }
    };

    return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-md p-6">
            <h3 className="text-2xl font-semibold mb-4">Add New Product</h3>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="text"
                    name="imdbId"
                    placeholder="IMDB ID"
                    value={formData.imdbId}
                    onChange={handleInputChange}
                    className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
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
                    <option value="All in one system">Workstation</option>
                    <option value="Processor">Processor</option>
                    <option value="Motherboard">Motherboard</option>
                    <option value="RAM">RAM</option>
                    <option value="Graphics card">Graphics card</option>
                    <option value="Power supply">Power supply</option>
                    <option value="Cooling & Ligthing">Cooling & Lighting</option>
                    <option value="Storage & nas">Storage & nas</option>
                    <option value="Casings">Casings</option>
                    <option value="Speaking & Headsets">Speaking & Headsets</option>
                    <option value="Printer">Printer</option>
                    <option value="External Storage">External Storage</option>
                    <option value="External">External</option>
                </select>
                <button
                    type="submit"
                    className="bg-green-400 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                >
                    Add Product
                </button>
            </form>
        </div>
    );
}