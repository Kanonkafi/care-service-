"use server";

import { collections, dbConnect } from "@/lib/dbconnect";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";

// ১. সব সার্ভিস আনার ফাংশন (Caching সহ)
export const getAllServices = async () => {
  try {
    const services = await dbConnect(collections.SERVICES).find({}).sort({ _id: -1 }).toArray();
    
    // ডাটা ক্যাশ থেকে দ্রুত লোড হবে
    return services.map(service => ({
      ...service,
      _id: service._id.toString()
    }));
  } catch (error) {
    console.error("Error fetching services:", error);
    return [];
  }
};

// ২. আইডি দিয়ে একটি সিঙ্গেল সার্ভিস আনা
export const getServiceById = async (id) => {
  try {
    // আইডি ভ্যালিড কি না চেক করে নেওয়া ভালো
    if (!ObjectId.isValid(id)) return null;

    const service = await dbConnect(collections.SERVICES).findOne({
      _id: new ObjectId(id),
    });
    
    if (!service) return null;

    return {
      ...service,
      _id: service._id.toString(),
    };
  } catch (error) {
    console.error("Error fetching service by id:", error);
    return null;
  }
};

/**
 * বোনাস টিপস: 
 * যখনই আপনি এডমিন প্যানেল থেকে নতুন সার্ভিস অ্যাড করবেন বা এডিট করবেন, 
 * তখন নিচের ফাংশনটি কল করবেন যাতে ইউজার সাথে সাথে নতুন ডাটা দেখতে পায়।
 */
export const refreshServiceCache = async () => {
    revalidatePath("/services");
    revalidatePath("/");
};


// নতুন সার্ভিস যোগ করার অ্যাকশন
export const addService = async (formData) => {
  try {
    const res = await dbConnect(collections.SERVICES).insertOne(formData);
    
    // হোম পেজ এবং সার্ভিস পেজের ক্যাশ আপডেট করা যাতে নতুন ডাটা দেখা যায়
    revalidatePath("/");
    revalidatePath("/services");
    
    return { success: true, message: "Service added successfully!" };
  } catch (error) {
    console.error("Error adding service:", error);
    return { success: false, message: "Failed to add service" };
  }
};