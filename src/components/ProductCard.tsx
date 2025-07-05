import { Product } from "@/types";

interface ProductCardProps {
    product: Product;
    onClick?: () => void;
}

export default function ProductCard({ product, onClick }: ProductCardProps) {
    return (
        <div
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
            onClick={onClick}
        >
            <img
                src={product.photos[0] || "https://via.placeholder.com/300x200?text=No+Image"}
                alt={product.name}
                className="w-full h-48 object-cover"
            />
            <div className="p-4">
                <h3 className="text-xl font-semibold text-black">{product.name}</h3>
                <p className="text-gray-600 mt-2">{product.description}</p>
                <p className="text-lg font-bold mt-2 text-black">${product.price.toFixed(2)}</p>
                <button className="mt-4 bg-green-400 text-white px-4 py-2 rounded hover:bg-green-700">
                    {product.availability ? "In Stock" : "Out of Stock"}
                </button>
            </div>
        </div>
    );
}