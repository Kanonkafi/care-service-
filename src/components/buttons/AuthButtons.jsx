"use client";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

const AuthButtons = () => {
  const { data: session, status } = useSession();

  if (status === "loading") return <span className="loading loading-spinner loading-xs"></span>;

  if (status === "authenticated") {
    return (
      <button onClick={() => signOut()} className="btn btn-primary btn-sm btn-outline">
        Logout
      </button>
    );
  }

  return (
    <Link href="/login" className="btn btn-primary btn-sm px-6">
      Login
    </Link>
  );
};

export default AuthButtons;