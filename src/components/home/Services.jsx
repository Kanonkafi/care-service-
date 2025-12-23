import React from 'react';
import ServiceCard from '../cards/ServiceCard';
import { getAllServices } from '@/actions/server/getServices';

const Services = async () => {
    // সার্ভার অ্যাকশন কল করে ডাটা আনা হচ্ছে
    const servicesData = await getAllServices();

    return (
        <section className="py-20 bg-base-100">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold mb-2">আমাদের সেবাসমূহ</h2>
                    <p className="text-gray-500">আপনার পরিবারের জন্য সেরা যত্ন নিশ্চিত করুন</p>
                </div>

                {/* যদি ডাটা না থাকে তবে মেসেজ দেখাবে */}
                {servicesData.length === 0 ? (
                    <div className="text-center py-10">
                        <p className="text-xl text-error">কোনো সার্ভিস পাওয়া যায়নি!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {servicesData.map(service => (
                            <ServiceCard key={service._id} service={service} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default Services;