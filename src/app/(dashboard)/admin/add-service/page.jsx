"use client";
import React, { useState } from "react";
import { addService } from "@/actions/server/getServices"; // অ্যাকশন ইমপোর্ট
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const AddServicePage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleAddService = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;

    const newService = {
      title: form.title.value,
      image: form.image.value,
      price: parseFloat(form.price.value),
      category: form.category.value,
      description: form.description.value,
    };

    const res = await addService(newService);
    setLoading(false);

    if (res.success) {
      Swal.fire({
        title: "Success!",
        text: "New Service is now live on Home Page!",
        icon: "success",
        confirmButtonColor: "#3085d6",
      });
      form.reset();
      router.push("/services"); // সার্ভিস লিস্টে নিয়ে যাবে
    } else {
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100">
        <h2 className="text-3xl font-black mb-8 text-primary uppercase tracking-tight">
          🚀 Post a New Service
        </h2>
        
        <form onSubmit={handleAddService} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="form-control">
            <label className="label text-sm font-bold text-gray-600">SERVICE TITLE</label>
            <input type="text" name="title" placeholder="e.g. Premium Home Cleaning" className="input input-bordered focus:border-primary bg-gray-50" required />
          </div>

          <div className="form-control">
            <label className="label text-sm font-bold text-gray-600">IMAGE URL</label>
            <input type="text" name="image" placeholder="https://imgur.com/your-image.jpg" className="input input-bordered focus:border-primary bg-gray-50" required />
          </div>

          <div className="form-control">
            <label className="label text-sm font-bold text-gray-600">PRICE ($)</label>
            <input type="number" name="price" placeholder="49.99" className="input input-bordered focus:border-primary bg-gray-50" required />
          </div>

          <div className="form-control">
            <label className="label text-sm font-bold text-gray-600">CATEGORY</label>
            <select name="category" className="select select-bordered focus:border-primary bg-gray-50 font-semibold">
              <option>Cleaning</option>
              <option>Repair</option>
              <option>Nursing</option>
              <option>Electric</option>
              <option>Plumbing</option>
            </select>
          </div>

          <div className="form-control md:col-span-2">
            <label className="label text-sm font-bold text-gray-600">DETAILED DESCRIPTION</label>
            <textarea name="description" className="textarea textarea-bordered h-32 focus:border-primary bg-gray-50" placeholder="Describe the benefits of this service..." required></textarea>
          </div>

          <div className="md:col-span-2 mt-4">
            <button 
              type="submit" 
              disabled={loading}
              className={`btn btn-primary w-full text-lg shadow-lg ${loading ? 'loading' : ''}`}
            >
              {loading ? "Uploading..." : "Publish Service"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddServicePage;