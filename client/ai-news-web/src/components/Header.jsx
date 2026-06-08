"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">

      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LOGO */}
        <Link href="/">
          <h1 className="text-3xl font-bold text-gray-900 cursor-pointer">
            AI Daily News
          </h1>
        </Link>

        {/* MENU */}
        <div className="hidden md:flex gap-6 text-gray-600 font-medium">

          <Link
            href="/"
            className="hover:text-black transition"
          >
            Home
          </Link>

          <button className="hover:text-black transition">
            Trending
          </button>

          <button className="hover:text-black transition">
            AI Tools
          </button>

          <Link
            href="/about"
            className="hover:text-black transition"
          >
            About
          </Link>

        </div>

      </div>

    </header>
  );
}