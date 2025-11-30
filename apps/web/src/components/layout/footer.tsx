import { Github, LucideLinkedin, Twitter } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-gradient-to-br from-violet-600 to-purple-400 rounded-lg" />
              <span className="text-3xl font-bold text-white">PostPulse</span>
            </div>
            <p className="text-sm">
              The Smartest way to manage your social media presence.
            </p>
          </div>

          <div>
            <h4 className="text-white text-2xl font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="#features"
                  className="hover:text-violet-400 transition"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="#pricing"
                  className="hover:text-violet-400 transition"
                >
                  Princing
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="hover:text-violet-400 transition"
                >
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-2xl font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="#about"
                  className="hover:text-violet-400 transition"
                >
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-violet-400 transition">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-violet-400 transition">
                  Carers
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-2xl font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="hover:text-violet-400 transition">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-violet-400 transition">
                  Terms
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-violet-400 transition"
                ></Link>
              </li>
            </ul>
          </div>
        </div>

        {/* <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="texts-sm">© 2024 PostPulse. All rights reserved</p>

          <div className="flex gap-6">
            <Link
              href="https://github.com"
              className="hover:text-violet-400 transition"
              ><Github className="w-5 h-5"/>
            </Link>
            <Link
              href="https://twitter.com"
              className="hover:text-violet-400 transition">
                <Twitter className="w-5 h-5"/></Link>
            <Link
              href="https://linkedin.com"
              className="hover:text-violet-400 transition"
              >
                <LucideLinkedin className="w-5 h-5"></Link>
              
          </div>
          </div> */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm">© 2024 PostPulse. All rights reserved.</p>

          <div className="flex gap-6">
            <Link
              href="https://github.com"
              className="hover:text-violet-400 transition"
            >
              <Github className="w-5 h-5" />
            </Link>
            <Link
              href="https://twitter.com"
              className="hover:text-violet-400 transition"
            >
              <Twitter className="w-5 h-5" />
            </Link>
            <Link
              href="https://linkedin.com"
              className="hover:text-violet-400 transition"
            >
              <LucideLinkedin className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
