import React from 'react';
import { getAllServices } from '@/actions/server/getServices';
import ServiceCard from '@/components/cards/ServiceCard';

const ServicesPage = async () => {
    // আমরা আগের তৈরি করা সার্ভার অ্যাকশনটিই এখানে আবার ব্যবহার করবো
    const servicesData = await getAllServices();

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="mb-10 text-center">
                <h1 className="text-4xl font-bold mb-4">আমাদের সকল সার্ভিস</h1>
                <p className="text-gray-500 max-w-2xl mx-auto">
                    আমরা পেশাদার এবং অভিজ্ঞ কেয়ার-গিভারদের মাধ্যমে আপনাদের প্রিয়জনদের সেবা প্রদান করি।
                </p>
            </div>

            {/* সার্ভিস গ্রিড */}
            {servicesData.length === 0 ? (
                <div className="text-center py-20">
                    <p className="text-xl">কোনো সার্ভিস পাওয়া যায়নি।</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {servicesData.map(service => (
                        <ServiceCard key={service._id} service={service} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ServicesPage;