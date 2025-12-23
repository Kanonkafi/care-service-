"use server";

import { collections, dbConnect } from "@/lib/dbconnect";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";

// ১. নতুন বুকিং সেভ করার ফাংশন
export const postBooking = async (payload) => {
  try {
    const result = await dbConnect(collections.CART).insertOne(payload);
    revalidatePath("/");
    revalidatePath("/my-bookings");
    return {
      success: true,
      message: "Booking confirmed successfully!",
      insertedId: result.insertedId.toString(),
    };
  } catch (error) {
    return { success: false, message: "Something went wrong!" };
  }
};

// ২. পেমেন্ট সফল হলে স্ট্যাটাস আপডেট করার ফাংশন
export const updatePaymentStatus = async (id, transactionId) => {
  try {
    const result = await dbConnect(collections.CART).updateOne(
      { _id: new ObjectId(id) },
      { 
        $set: { 
          status: "paid", 
          transactionId: transactionId 
        } 
      }
    );
    revalidatePath("/my-bookings");
    revalidatePath("/admin"); // অ্যাডমিন পেজও রিফ্রেশ হবে
    return { success: true };
  } catch (error) {
    return { success: false };
  }
};

// ৩. অ্যাডমিন প্যানেল থেকে স্ট্যাটাস আপডেট করার নতুন ফাংশন 
export const updateBookingStatus = async (id, newStatus) => {
  try {
    const result = await dbConnect(collections.CART).updateOne(
      { _id: new ObjectId(id) },
      { $set: { status: newStatus } }
    );
    revalidatePath("/admin");
    revalidatePath("/my-bookings");
    return { success: true };
  } catch (error) {
    return { success: false };
  }
};

// ৪. ইউজারের ইমেল অনুযায়ী সব বুকিং ডাটা আনা
export const getMyBookings = async (email) => {
  try {
    const bookings = await dbConnect(collections.CART).find({ email: email }).toArray();
    return bookings.map(booking => ({
      ...booking,
      _id: booking._id.toString()
    }));
  } catch (error) {
    return [];
  }
};

// ৫. বুকিং ডিলিট করার ফাংশন
export const deleteBooking = async (id) => {
  try {
    const result = await dbConnect(collections.CART).deleteOne({
      _id: new ObjectId(id)
    });
    revalidatePath("/");
    revalidatePath("/my-bookings");
    revalidatePath("/admin");
    return { success: result.deletedCount > 0 };
  } catch (error) {
    return { success: false };
  }
};