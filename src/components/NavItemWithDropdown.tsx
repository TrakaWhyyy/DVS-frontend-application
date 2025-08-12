"use client";

import React, { useState } from 'react';

export default function NavItemWithDropdown() {
    const [isOpen, setIsOpen] = useState(false);

    const productCategories = [
        { name: 'Gaming PCs', href: '/products/gaming-pcs' },
        { name: 'Workstations', href: '/products/workstations' },
        { name: 'Laptops', href: '/products/laptops' },
        { name: 'Accessories', href: '/products/accessories' },
    ];

    return (
        <li className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                onMouseEnter={() => setIsOpen(true)}
                className="hover:text-blue-600 transition"
            >
                Products
            </button>
            {isOpen && (
                <ul
                    onMouseLeave={() => setIsOpen(false)}
                    className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10"
                >
                    {productCategories.map((category) => (
                        <li key={category.name}>
                            <a
                                href={category.href}
                                className="block px-4 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition"
                            >
                                {category.name}
                            </a>
                        </li>
                    ))}
                </ul>
            )}
        </li>
    );
}