import { dbConnect, collections } from "@/lib/dbconnect";
import AdminBookingTable from "@/components/admin/AdminBookingTable";

const AdminDashboard = async () => {
  // ডাটাবেস থেকে সব বুকিং নিয়ে আসা
  const bookings = await dbConnect(collections.CART).find().toArray();
  
  // MongoDB ID গুলোকে স্ট্রিং করে নেওয়া যাতে সিরিয়ালাইজেশন এরর না আসে
  const serializedBookings = bookings.map(b => ({
    ...b,
    _id: b._id.toString()
  })).reverse(); // লেটেস্ট বুকিং উপরে দেখাবে

  return (
    <div className="p-4 md:p-10">
      <div className="flex justify-between items-center mb-8">
         <h1 className="text-3xl font-bold italic underline text-primary">Admin Panel: All Bookings</h1>
         <div className="badge badge-secondary p-4 font-bold">Total: {bookings.length}</div>
      </div>
      
      {/* আমরা ডাটাগুলো পাঠিয়ে দিচ্ছি ক্লায়েন্ট টেবিল কম্পোনেন্টে */}
      <AdminBookingTable allBookings={serializedBookings} />
    </div>
  );
};

export default AdminDashboard;