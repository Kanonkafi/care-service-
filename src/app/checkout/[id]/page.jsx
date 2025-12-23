"use client";
import React, { useState, useEffect, use } from "react";
import { useSession } from "next-auth/react";
import { getServiceById } from "@/actions/server/getServices";
import { postBooking } from "@/actions/server/booking";
import { bdLocations } from "@/lib/locations";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const CheckoutPage = ({ params: paramsPromise }) => {
    const { data: session } = useSession();
    const router = useRouter();
    const params = use(paramsPromise);

    const [service, setService] = useState(null);
    const [duration, setDuration] = useState(1);
    const [selectedDivision, setSelectedDivision] = useState("");
    const [districts, setDistricts] = useState([]);
    const [loading, setLoading] = useState(false); // লোডিং স্টেট

    useEffect(() => {
        getServiceById(params.id).then((data) => setService(data));
    }, [params.id]);

    const handleDivisionChange = (e) => {
        const division = e.target.value;
        setSelectedDivision(division);
        setDistricts(bdLocations[division] || []);
    };

    // --- পরিবর্তন: সরাসরি বুকিং সেভ হবে পেমেন্ট ছাড়াই ---
    const handleBookingSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const form = e.target;

        const bookingInfo = {
            serviceId: service._id,
            serviceTitle: service.title,
            image: service.image, // My Booking এ দেখানোর জন্য ইমেজও পাঠালাম
            basePrice: service.price,
            duration: duration,
            totalPrice: service.price * duration,
            customerName: session?.user?.name,
            email: session?.user?.email,
            date: form.date.value,
            phone: form.phone.value,
            location: {
                division: selectedDivision,
                district: form.district.value,
                address: form.address.value
            },
            status: "pending", // পেমেন্ট না করা পর্যন্ত পেন্ডিং থাকবে
        };

        const res = await postBooking(bookingInfo);
        setLoading(false);

        if (res.success) {
            Swal.fire({
                icon: 'success',
                title: 'Booking Saved!',
                text: 'আপনার বুকিংটি সেভ হয়েছে। এখন My Bookings থেকে পেমেন্ট করুন।',
            });
            router.push("/my-bookings");
        }
    };

    if (!service) return <div className="min-h-screen flex items-center justify-center"><span className="loading loading-spinner loading-lg text-primary"></span></div>;

    return (
        <div className="min-h-screen bg-base-200 py-12 px-4">
            <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* সার্ভিস সামারি */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="card bg-base-100 shadow-xl overflow-hidden">
                        <img src={service.image} alt={service.title} className="w-full h-48 object-cover" />
                        <div className="card-body p-6">
                            <h3 className="text-xl font-bold">{service.title}</h3>
                            <div className="divider"></div>
                            <div className="flex justify-between font-bold text-primary">
                                <span>Total:</span>
                                <span>${service.price * duration}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* বুকিং ফর্ম */}
                <div className="lg:col-span-2">
                    <div className="card bg-base-100 shadow-xl p-8 border border-gray-100">
                        <h2 className="text-2xl font-bold mb-6 border-b pb-4 italic">Confirm Service Booking</h2>
                        <form onSubmit={handleBookingSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {/* ... আগের সব ইনপুট ফিল্ডগুলো এখানে থাকবে ... */}
                            <div className="form-control">
                                <label className="label text-xs font-bold uppercase text-primary">Duration (Days)</label>
                                <input type="number" min="1" value={duration} onChange={(e) => setDuration(e.target.value)} className="input input-bordered border-primary" required />
                            </div>
                            <div className="form-control">
                                <label className="label text-xs font-bold uppercase text-primary">Phone Number</label>
                                <input type="text" name="phone" placeholder="017XXXXXXXX" required className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label text-xs font-bold uppercase text-primary">Booking Date</label>
                                <input type="date" name="date" required className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label text-xs font-bold uppercase text-primary">Division</label>
                                <select onChange={handleDivisionChange} className="select select-bordered" required>
                                    <option value="">Select Division</option>
                                    {Object.keys(bdLocations).map(div => <option key={div} value={div}>{div}</option>)}
                                </select>
                            </div>
                            <div className="form-control">
                                <label className="label text-xs font-bold uppercase text-primary">District</label>
                                <select name="district" className="select select-bordered" required disabled={!districts.length}>
                                    <option value="">Select District</option>
                                    {districts.map(dis => <option key={dis} value={dis}>{dis}</option>)}
                                </select>
                            </div>
                            <div className="form-control md:col-span-2">
                                <label className="label text-xs font-bold uppercase text-primary">Detailed Address</label>
                                <textarea name="address" placeholder="House no, Street name..." className="textarea textarea-bordered h-24" required></textarea>
                            </div>
                            
                            <div className="md:col-span-2 mt-6">
                                <button type="submit" disabled={loading} className="btn btn-primary w-full btn-lg">
                                    {loading ? "Saving..." : "Save & Continue to Pay"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;