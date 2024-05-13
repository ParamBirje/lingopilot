import Link from "next/link";
import React from "react";

export default function navbar() {
  return (
    <nav className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">LingoPilot</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal items-center gap-3 px-1">
          <li>
            <Link href="#">Features</Link>
          </li>
          <li>
            <Link href="#">Pricing</Link>
          </li>
          <li>
            <Link href="#">About</Link>
          </li>

          <Link href="/login" className="btn btn-primary text-white">
            Sign Up
          </Link>
        </ul>
      </div>
    </nav>
  );
}
