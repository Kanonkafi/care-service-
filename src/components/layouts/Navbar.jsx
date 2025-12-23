import React from "react";
import Logo from "./Logo"; 
import Link from "next/link";
import NavLink from "../buttons/NavLink"; 
import { FiShoppingCart } from "react-icons/fi"; 
import AuthButtons from "../buttons/AuthButtons"; 
import { getServerSession } from "next-auth"; // সেশন এর জন্য
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; 
import { getMyBookings } from "@/actions/server/booking"; 


const Navbar = async () => {
  // সার্ভার সাইড সেশন নেওয়া
  const session = await getServerSession(authOptions);
  
  // যদি ইউজার লগইন থাকে তবেই তার বুকিং সংখ্যা আনা হবে
  let bookingCount = 0;
  if (session?.user?.email) {
    const bookings = await getMyBookings(session.user.email);
    bookingCount = bookings.length;
  }

  const nav = (
    <>
      <li><NavLink href={"/"}>Home</NavLink></li>
      <li><NavLink href={"/services"}>Services</NavLink></li>
      {/* শুধু লগইন থাকলেই My Bookings মেনু দেখাবে */}
      {session && <li><NavLink href={"/my-bookings"}>My Bookings</NavLink></li>}
      {/*<li><NavLink href={"/blog"}>Blog</NavLink></li> */}
      {/* <li><NavLink href={"/contact"}>Contact</NavLink></li> */}
     
      {/* Navbar-এর লিঙ্কের ভেতরে এটি bosbe */}
      <li><NavLink href="/admin" className="font-semibold text-primary">Dashboard</NavLink></li>
    </>
  );

  return (
    <div className="bg-base-100 shadow-md sticky top-0 z-50">
      <div className="navbar container mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              {nav}
            </ul>
          </div>
          <Logo />
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-2">
            {nav}
          </ul>
        </div>

        <div className="navbar-end space-x-4">
          {/* কার্ট আইকন - বুকিং কাউন্ট সহ */}
          <Link href={"/my-bookings"} className="btn btn-ghost btn-circle">
            <div className="indicator">
              <FiShoppingCart className="text-xl" />
              {bookingCount > 0 && (
                <span className="badge badge-sm indicator-item badge-primary">
                  {bookingCount}
                </span>
              )}
            </div>
          </Link>
          
          <AuthButtons />
        </div>
      </div>
    </div>
  );
};

export default Navbar;