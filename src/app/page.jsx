import About from "@/components/home/About";
import Banner from "@/components/home/Banner";
import Services from "@/components/home/Services";
import Testimonials from "@/components/home/Testimonials";

// --- Home Page SEO ---
export const metadata = {
  title: "Care Service | Trusted Home Care & Nursing",
  description: "Explore our wide range of professional home care services. We provide caregivers, nursing, and elderly care.",
};

export default async function Home() {
  return (
    <div className="space-y-20">
      <section><Banner /></section>
      <section><About /></section>
      <section><Services /></section>
      <section><Testimonials /></section>
    </div>
  );
}