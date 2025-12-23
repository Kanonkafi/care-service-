import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href={"/"} className="flex items-center gap-1">
      <Image
        alt="logo-care-service"
        src={"/assets/logo.jpg"}
        width={70}
        height={60}
        style={{ width: 'auto', height: 'auto' }}
      />
      <h2 className="text-xl font-bold">
        Care <span className="text-primary">Service</span>{" "}
      </h2>
    </Link>
  );
};

export default Logo;