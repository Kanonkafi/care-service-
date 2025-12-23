import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }) {
  const session = await getServerSession(authOptions);

  // --- নিরাপত্তা: অ্যাডমিন ছাড়া অন্য কেউ ঢুকতে পারবে না ---
  // আপনার ইমেইলটা এখানে বসান (টেস্টিং এর জন্য)
  const isAdmin = session?.user?.email === "admin@gmail.com"; // এখানে আপনার আসল ইমেইল দিন

  if (!isAdmin) {
    redirect("/"); // অ্যাডমিন না হলে সরাসরি হোম পেজে পাঠিয়ে দিবে
  }

  return (
    <div className="flex min-h-screen bg-[#F4F7FE]">
      {/* মডার্ন সাইডবার */}
      <aside className="w-72 bg-white shadow-2xl z-10 hidden md:block border-r border-gray-100">
        <div className="p-8">
          <h2 className="text-2xl font-black text-primary tracking-tighter italic">
            CARE<span className="text-secondary">ADMIN</span>
          </h2>
        </div>
        
        <nav className="mt-4 px-4 space-y-2">
          <Link href="/admin" className="flex items-center gap-3 py-3 px-6 rounded-xl hover:bg-primary hover:text-white transition-all font-medium group">
            <span>📊</span> Manage Bookings
          </Link>
          <Link href="/admin/add-service" className="flex items-center gap-3 py-3 px-6 rounded-xl hover:bg-primary hover:text-white transition-all font-medium">
            <span>➕</span> Add New Service
          </Link>
          <div className="pt-10">
            <Link href="/" className="flex items-center gap-3 py-3 px-6 rounded-xl bg-gray-50 hover:bg-red-50 hover:text-red-500 transition-all font-medium border border-gray-100 text-gray-500">
              <span>🏠</span> Exit to Home
            </Link>
          </div>
        </nav>
      </aside>

      {/* মেইন কন্টেন্ট এরিয়া */}
      <main className="flex-1 overflow-y-auto">
        {/* টপ বার (User Profile) */}
        <header className="bg-white/80 backdrop-blur-md h-20 flex items-center justify-between px-10 sticky top-0 border-b border-gray-100 z-50">
          <h1 className="text-xl font-bold text-gray-800 uppercase tracking-widest">Control Panel</h1>
          <div className="flex items-center gap-4">
             <span className="text-sm font-semibold text-gray-500">{session?.user?.name} (Admin)</span>
             <img src={session?.user?.image} className="w-10 h-10 rounded-full border-2 border-primary" alt="admin" />
          </div>
        </header>

        <div className="p-10">
          {children}
        </div>
      </main>
    </div>
  );
}