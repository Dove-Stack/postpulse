import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { Button } from "../ui/button";

export async function Navbar() {
  const { userId } = await auth();

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-purple-100 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex justify-between items-center h-16">
          <Link href="" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from violet-600 to-purple-400 rounded-lg" />
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

          <div className="flex items-center space-x-4">
            {userId ? (
              <>
                <Link href="/dashboard">
                  <Button variant="ghost">Dashboard</Button>
                </Link>
                <UserButton afterSignOutUrl="" />
              </>
            ) : (
              <>
                <Link href="/sign-in">
                  <Button variant="ghost" size="btnNav">
                    Sign In
                  </Button>
                </Link>
                <Link href="/sign-up">
                  <Button
                    variant="ghost"
                    size="lg"
                    className="bg-gradient-to-br rounded-lg from-violet-900 to-purple-500 text-white hover:bg-violet-600"
                  >
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
