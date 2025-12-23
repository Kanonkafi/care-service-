"use client";
import React, { useState } from 'react';
import { deleteBooking, updatePaymentStatus } from '@/actions/server/booking';
import Swal from 'sweetalert2';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "@/components/checkout/CheckoutForm";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const BookingTable = ({ initialBookings }) => {
    const [bookings, setBookings] = useState(initialBookings);
    const [selectedBooking, setSelectedBooking] = useState(null); 
    const [clientSecret, setClientSecret] = useState(""); // নতুন সিক্রেট স্টেট
    const [payLoading, setPayLoading] = useState(false); // পেমেন্ট লোডিং স্টেট

    const handleDelete = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "বুকিং বাতিল করলে আর ফিরে পাওয়া যাবে না!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, cancel it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await deleteBooking(id);
                if (res.success) {
                    setBookings(bookings.filter(b => b._id !== id));
                    Swal.fire("Deleted!", "বুকিং বাতিল করা হয়েছে।", "success");
                }
            }
        });
    };

    // পেমেন্ট শুরু করার ফাংশন
    const handlePayNow = async (booking) => {
        setPayLoading(booking._id); // নির্দিষ্ট রো-তে লোডিং দেখাবে
        try {
            const response = await fetch("/api/create-payment-intent", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ price: booking.totalPrice }),
            });
            const data = await response.json();
            
            if (data.clientSecret) {
                setClientSecret(data.clientSecret);
                setSelectedBooking(booking);
            } else {
                Swal.fire("Error", "পেমেন্ট গেটওয়ে কানেক্ট করতে সমস্যা হচ্ছে!", "error");
            }
        } catch (error) {
            console.error(error);
        } finally {
            setPayLoading(false);
        }
    };

    const closeModal = () => {
        setSelectedBooking(null);
        setClientSecret("");
    };

    return (
        <div className="relative">
            <table className="table table-zebra w-full bg-base-100">
                <thead className="bg-primary text-white">
                    <tr>
                        <th>Service Name</th>
                        <th>Date</th>
                        <th>Location</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.map((booking) => (
                        <tr key={booking._id}>
                            <td className="font-bold">{booking.serviceTitle}</td>
                            <td>{booking.date}</td>
                            <td className="text-xs">
                                {booking.location?.division}, {booking.location?.district}
                            </td>
                            <td className="font-bold text-primary">
                                ${booking.totalPrice || booking.price || 0}
                            </td>
                            <td>
                                <span className={`badge ${booking.status === 'paid' ? 'badge-success' : 'badge-warning'}`}>
                                    {booking.status}
                                </span>
                            </td>
                            <td className="flex gap-2">
                                {booking.status === "pending" && (
                                    <button 
                                        disabled={payLoading === booking._id}
                                        onClick={() => handlePayNow(booking)}
                                        className="btn btn-success btn-sm text-white"
                                    >
                                        {payLoading === booking._id ? "..." : "Pay Now"}
                                    </button>
                                )}
                                
                                <button 
                                    onClick={() => handleDelete(booking._id)} 
                                    className="btn btn-error btn-sm"
                                >
                                    Cancel
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {selectedBooking && clientSecret && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative">
                        <button onClick={closeModal} className="btn btn-sm btn-circle absolute right-4 top-4">✕</button>
                        
                        <h2 className="text-xl font-bold mb-4 text-primary">Complete Payment</h2>
                        <div className="bg-gray-50 p-4 rounded-xl mb-6 text-sm">
                            <p>Service: <strong>{selectedBooking.serviceTitle}</strong></p>
                            <p className="text-lg font-bold">Total Payable: ${selectedBooking.totalPrice}</p>
                        </div>

                        <Elements stripe={stripePromise} options={{ clientSecret }}>
                            <CheckoutForm 
                                price={selectedBooking.totalPrice} 
                                bookingData={{...selectedBooking, clientSecret}} // সিক্রেট কি সহ ডাটা পাঠালাম
                                onPaymentSuccess={() => {
                                    setBookings(bookings.map(b => 
                                        b._id === selectedBooking._id ? {...b, status: 'paid'} : b
                                    ));
                                    closeModal();
                                }}
                            />
                        </Elements>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookingTable;