import React from 'react';

export default function Contact() {
    return (
        <div className="container mx-auto p-8 min-h-screen font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-8">
                <section className="text-center">
                    <h2 className="text-3xl font-bold mb-4">Contact DVS Computers</h2>
                    <p className="text-lg text-gray-600">
                        Get in touch with us for inquiries, support, or custom orders.
                    </p>
                </section>
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="flex flex-col gap-6">
                        <h3 className="text-2xl font-semibold">Reach Out</h3>
                        <p className="text-gray-600">
                            Have questions about our products or need assistance? Our team is here to help.
                        </p>
                        <div className="space-y-4">
                            <p><strong>Email:</strong> support@dvscomputers.com</p>
                            <p><strong>Phone:</strong> (555) 123-4567</p>
                            <p><strong>Address:</strong> 123 Tech Street, Innovation City, TC 12345</p>
                            <p><strong>Hours:</strong> Mon-Fri 9 AM - 6 PM, Sat 10 AM - 4 PM</p>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-2xl font-semibold mb-4">Send Us a Message</h3>
                        <div className="flex flex-col gap-4">
                            <input
                                type="text"
                                placeholder="Your Name"
                                className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                type="email"
                                placeholder="Your Email"
                                className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <textarea
                                placeholder="Your Message"
                                rows={5}
                                className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            ></textarea>
                            <button
                                className="bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition"
                            >
                                Send Message
                            </button>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}