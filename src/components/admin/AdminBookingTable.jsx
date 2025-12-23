"use client";
import React, { useState } from 'react';
import { updateBookingStatus } from '@/actions/server/booking';
import Swal from 'sweetalert2';

const AdminBookingTable = ({ allBookings }) => {
    const [bookings, setBookings] = useState(allBookings);

    const handleStatusChange = async (id, newStatus) => {
        const res = await updateBookingStatus(id, newStatus);
        if (res.success) {
            setBookings(bookings.map(b => b._id === id ? { ...b, status: newStatus } : b));
            Swal.fire({
                icon: "success",
                title: "Status Updated!",
                text: `Status changed to ${newStatus}`,
                showConfirmButton: false,
                timer: 1500
            });
        }
    };

    return (
        <div className="overflow-x-auto bg-white rounded-xl shadow-md border border-gray-100">
            <table className="table w-full">
                <thead className="bg-primary text-white text-center">
                    <tr>
                        <th>Customer</th>
                        <th>Service</th>
                        <th>Date</th>
                        <th>Price</th>
                        <th>Current Status</th>
                        <th>Action (Update)</th>
                    </tr>
                </thead>
                <tbody className="text-center">
                    {bookings.map((booking) => (
                        <tr key={booking._id} className="hover">
                            <td className="text-left">
                                <div className="font-bold">{booking.customerName}</div>
                                <div className="text-xs opacity-50">{booking.email}</div>
                            </td>
                            <td className="font-semibold">{booking.serviceTitle}</td>
                            <td>{booking.date}</td>
                            <td className="font-bold text-primary">${booking.totalPrice || booking.price}</td>
                            <td>
                                <span className={`badge badge-sm font-bold uppercase ${
                                    booking.status === 'paid' ? 'badge-success' : 
                                    booking.status === 'completed' ? 'badge-info' : 
                                    'badge-warning'
                                }`}>
                                    {booking.status}
                                </span>
                            </td>
                            <td>
                                <select 
                                    className="select select-bordered select-sm w-full max-w-xs focus:outline-primary"
                                    value={booking.status}
                                    onChange={(e) => handleStatusChange(booking._id, e.target.value)}
                                >
                                    <option value="pending">Pending</option>
                                    <option value="paid">Paid</option>
                                    <option value="in-progress">In Progress</option>
                                    <option value="completed">Completed</option>
                                    <option value="cancelled">Cancelled</option>
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminBookingTable;