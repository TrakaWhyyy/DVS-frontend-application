import { Product } from "@/types";

interface ProductModalProps {
    product: Product;
    onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
                <h3 className="text-xl font-semibold mb-4">{product.name}</h3>
                <img
                    src={product.photos || "https://via.placeholder.com/300x200?text=No+Image"}
                    alt={product.name}
                    className="w-full h-48 object-cover mb-4"
                />
                <p className="text-gray-600 mb-2">{product.description}</p>
                <p className="text-lg font-bold mb-2">${product.price.toFixed(2)}</p>
                <p className="text-gray-600 mb-2">
                    Availability: {product.availability ? "In Stock" : "Out of Stock"}
                </p>
                <p className="text-gray-600 mb-4">Types: {product.productTypes}</p>
                <button
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </div>
    );
}