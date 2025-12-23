import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

// আপনি যে যে রুটগুলো প্রটেক্ট করতে চান
const privateRoute = ["/dashboard", "/cart", "/checkout", "/my-bookings"];

export async function middleware(req) {
  // টোকেন চেক করা হচ্ছে
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const isAuthenticated = Boolean(token);
  const reqPath = req.nextUrl.pathname;
  
  // চেক করা হচ্ছে বর্তমান পাথটি প্রাইভেট রুটের লিস্টে আছে কি না
  const isPrivateReq = privateRoute.some((route) =>
    reqPath.startsWith(route)
  );

  // যদি ইউজার লগইন না থাকে এবং প্রাইভেট পেজে যেতে চায়
  if (!isAuthenticated && isPrivateReq) {
    return NextResponse.redirect(
      new URL(`/login?callbackUrl=${reqPath}`, req.url)
    );
  }

  // কনসোলে চেক করার জন্য (প্রোডাকশনে এটি বাদ দিতে পারেন)
  console.log({ token: !!token, isPrivateReq, reqPath, isAuthenticated });

  return NextResponse.next();
}

// কোন কোন পাথে এই মিডলওয়্যারটি ট্রিগার হবে
export const config = {
  matcher: [
    "/dashboard/:path*", 
    "/cart/:path*", 
    "/checkout/:path*",
    "/my-bookings/:path*"
  ],
};