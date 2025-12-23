import React from 'react';
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getMyBookings } from '@/actions/server/booking';
import BookingTable from '@/components/my-bookings/BookingTable';

const MyBookingsPage = async () => {
    // সার্ভার থেকে সেশন নেওয়া হচ্ছে
    const session = await getServerSession(authOptions);
    
    // ইউজারের ইমেইল দিয়ে বুকিং ডাটা আনা হচ্ছে
    const bookings = await getMyBookings(session?.user?.email);

    return (
        <div className="container mx-auto px-4 py-12 min-h-screen">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold italic underline decoration-primary">
                    My Bookings: {bookings.length}
                </h1>
            </div>
            
            {bookings.length === 0 ? (
                <div className="text-center py-20 bg-base-200 rounded-3xl border-2 border-dashed border-gray-300">
                    <p className="text-2xl font-semibold text-gray-500">আপনি এখনো কোনো সার্ভিস বুক করেননি।</p>
                </div>
            ) : (
                <div className="overflow-x-auto shadow-2xl rounded-2xl border border-gray-100">
                    <BookingTable initialBookings={bookings} />
                </div>
            )}
        </div>
    );
};

export default MyBookingsPage;