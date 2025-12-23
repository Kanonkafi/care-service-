import { getServiceById } from "@/actions/server/getServices";
import Link from "next/link"; // ✅ Corrected here

export async function generateMetadata({ params }) {
  const { id } = await params;
  const service = await getServiceById(id);
  
  return {
    title: service?.title || "Service Details",
    description: service?.description?.slice(0, 160),
    openGraph: {
      images: [service?.image],
    },
  };
}

const ServiceDetailsPage = async ({ params }) => {
  const { id } = await params; 
  const service = await getServiceById(id);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-2xl font-bold text-error">সার্ভিসটি পাওয়া যায়নি!</h2>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center bg-base-100 p-10 shadow-xl rounded-2xl border border-gray-100">
        <div>
          <img 
            src={service.image} 
            alt={service.title} 
            className="w-full h-[400px] object-cover rounded-xl shadow-lg" 
          />
        </div>
        <div className="space-y-6">
          <h1 className="text-4xl font-extrabold text-primary">{service.title}</h1>
          <div className="badge badge-secondary p-4 font-bold">{service.category}</div>
          <p className="text-gray-600 text-lg leading-relaxed">{service.description}</p>
          <div className="bg-base-200 p-6 rounded-xl border-l-8 border-primary">
            <p className="text-sm text-gray-500 uppercase font-bold">Service Price</p>
            <p className="text-3xl font-black text-primary">${service.price}</p>
          </div>
          <div className="flex gap-4">
            {/* এখন এই Link গুলো কাজ করবে */}
            <Link href={`/checkout/${service._id}`} className="btn btn-primary btn-lg flex-1">
              Book Now
            </Link>
            <Link href="/services" className="btn btn-outline btn-lg flex-1">
              Go Back
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailsPage;