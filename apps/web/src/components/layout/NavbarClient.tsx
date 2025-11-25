"use client";

import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { useState } from "react";
import { Button } from "../ui/button";
import { Menu, X } from "lucide-react";

export default function NavbarCLient({ userId }: { userId: string | null }) {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-purple-100 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex justify-between items-center h-16">
          <Link href="" className="flex items-center space-x-2">
            {/* <div className="w-8 h-8 bg-gradient-to-br from violet-600 to-purple-400 rounded-lg">njs</div> this is supposed to be the logo */}
            <span className="text-xl font-bold bg-gradient-to-br from-violet-900 to-purple-400 bg-clip-text text-transparent">
              PostPulse
            </span>
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="#features"
              className="text-gray-600 hover:text-violet-600 transition"
            >
              Features
            </Link>
            <Link
              href="#pricing"
              className="text-gray-600 hover:text-violet-600 transition"
            >
              Pricing
            </Link>
            <Link
              href="#about"
              className="text-gray-600 hover:text-violet-600 transition"
            >
              About
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            {userId ? (
              <>
                <Link href="/dashboard">
                  <Button >Dashboard</Button>
                </Link>
                <UserButton afterSignOutUrl="" />
              </>
            ) : (
              <>
                <Link href="/sign-in">
                  <Button variant="ctaBtnTwo" size="btnNav">
                    Sign In
                  </Button>
                </Link>
                <Link href="/sign-up">
                  <Button
                    variant="ctaBtnOne"
                    size="lg"
                    className="bg-violet-600 text-white hover:bg-violet-700"
                  >
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>

          <button
            className={`md:hidden p-2 rounded-lg hover:bg-gray-100 transition ${
              navOpen  ? "bg-violet-200 hover:bg-violet-300 text-gray-600" : "bg-violet-200 text-gray-500 hover:bg-violet-400"
            }`}
            onClick={() => setNavOpen(!navOpen)}
            aria-label="Toggle Menu"
          >
            {navOpen ? <X size={24} /> : <Menu size={24} className="" />}
          </button>
        </div>
      </div>

      {navOpen && (
        <div className="md:hidden  border-t border-purple-100 shadow-sm animate-slideDown ">
          <div className="flex flex-col px-6 py-4 space-y-8">
            <Link
              href="#features"
              onClick={() => setNavOpen(false)}
              className="text-gray-700 hover:text-violet-600 transition p-4 hover:bg-violet-100 rounded-sm border-b border-b-violet-200"
            >
              Features
            </Link>
            <Link
              href="#pricing"
              onClick={() => setNavOpen(false)}
              className="text-gray-700 hover:text-violet-600 transition p-4 hover:bg-violet-100 rounded-sm border-b border-b-violet-200"
            >
              Pricing
            </Link>
            <Link
              href="#about"
              onClick={() => setNavOpen(false)}
              className="text-gray-700 hover:text-violet-600 transition p-4 hover:bg-violet-100 rounded-sm border-b border-b-violet-200"
            >
              About
            </Link>

            <div className="pt-6 ">
              {userId ? (
                <>
                  <Link href="/dashboard" onClick={() => setNavOpen(false)}>
                    <Button variant="ghost" className="w-full">
                      Dashboard
                    </Button>
                  </Link>
                  <div className="mt-2">
                    <UserButton afterSignOutUrl="/" />
                  </div>
                </>
              ) : (
                <>
                  <div className="flex flex-col gap-5">
                    <Link
                      href="/sign-in"
                      className="hover:bg-violet-100 font-medium py-4 px-4 rounded-lg bg-violet-50 text-violet-500 text-center"
                      onClick={() => setNavOpen(false)}
                    >
                      Sign In
                      {/* <Button className="bg-transparent" size="">Sign In</Button> */}
                    </Link>
                    <Link
                      href="/sign-up"
                      className="text-sm px-4 py-4 bg-violet-600 text-white hover:bg-violet-700 text-center rounded-md"
                      onClick={() => setNavOpen(false)}
                    >
                      Get Started
                      {/* <Button variant="ctaBtnOne">Get Started</Button> */}
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
