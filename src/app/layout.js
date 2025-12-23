import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import NextAuthProvider from "@/provider/NextAuthProvider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "400", "500", "600", "800"],
});

// --- SEO Metadata Update ---
export const metadata = {
  title: {
    default: "Care Service | Expert Home Care Solutions",
    template: "%s | Care Service"
  },
  description: "Best home care and caregiver services in Bangladesh. Professional and experienced support for your loved ones.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <body className={`${poppins.className} antialiased`}>
        <NextAuthProvider>
          <header className="py-2 md:w-11/12 mx-auto">
            <Navbar />
          </header>
          <main className="py-2 md:w-11/12 mx-auto min-h-[calc(100vh-302px)]">
            {children}
          </main>
          <footer>
            <Footer />
          </footer>
        </NextAuthProvider>
      </body>
    </html>
  );
}