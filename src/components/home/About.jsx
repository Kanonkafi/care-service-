import React from 'react';

const About = () => {
    return (
        <section className="py-16 bg-base-200">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center gap-12">
                    {/* বাম পাশে ইমেজ বা ইলাস্ট্রেশন */}
                    <div className="flex-1">
                        <img 
                            src="https://images.pexels.com/photos/3768114/pexels-photo-3768114.jpeg" 
                            alt="Care Mission" 
                            className="rounded-2xl shadow-xl w-full h-[400px] object-cover"
                        />
                    </div>

                    {/* ডান পাশে টেক্সট কন্টেন্ট */}
                    <div className="flex-1 space-y-6">
                        <h2 className="text-4xl font-bold text-gray-800">
                            আমাদের মিশন: <span className="text-primary">Care.xyz</span>
                        </h2>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            Care.xyz একটি ওয়েব অ্যাপ্লিকেশন যা ব্যবহারকারীদের শিশু, বৃদ্ধ বা অসুস্থ ব্যক্তির জন্য নির্ভরযোগ্য এবং trusted care service বুক করতে সাহায্য করে। আমাদের লক্ষ্য হচ্ছে কেয়ারগিভিং বা যত্ন নেওয়ার প্রক্রিয়াটিকে সহজ, নিরাপদ এবং সবার জন্য অ্যাক্সেসেবল করা।
                        </p>
                        <ul className="space-y-3 font-medium">
                            <li className="flex items-center gap-2">
                                ✅ নির্ভরযোগ্য এবং যাচাইকৃত কেয়ারগিভার
                            </li>
                            <li className="flex items-center gap-2">
                                ✅ সহজ এবং দ্রুত বুকিং সিস্টেম
                            </li>
                            <li className="flex items-center gap-2">
                                ✅ সার্বক্ষণিক কাস্টমার সাপোর্ট
                            </li>
                        </ul>
                        <button className="btn btn-primary px-8">আমাদের সম্পর্কে আরও জানুন</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;