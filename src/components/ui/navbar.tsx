import Link from "next/link";
import React from "react";

import { Indie_Flower } from "next/font/google";

const indie = Indie_Flower({
  weight: "400",
  subsets: ["latin"],
});

export default function Navbar() {
  return (
    <nav className="navbar mx-auto max-w-7xl bg-base-100">
      <div className="flex-1">
        <Link href="/" className={`relative top-1 text-4xl ${indie.className}`}>
          LingoPilot
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal items-center gap-3 px-1 !font-medium">
          <li>
            <Link href="#">Features</Link>
          </li>
          <li>
            <Link href="#">Pricing</Link>
          </li>
          <li>
            <Link href="#">About</Link>
          </li>

          <Link href="/login" className="btn btn-primary btn-sm text-white">
            Sign Up
          </Link>
        </ul>
      </div>
    </nav>
  );
}
