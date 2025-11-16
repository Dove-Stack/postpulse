import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "../button";

interface HeroSectionProps {
  isAuthenticated: boolean;
}

export function HeroSection({ isAuthenticated }: HeroSectionProps) {
  return (
    <section className="pt-32 pb-20 px-4 bg-gradient-to-b from-white via-violet-50 to bg-purple-100">
      <div className="max-w-6xl mx-auto text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-100 rounded-full text-violet-700 text-sm font-medium ">
          <Sparkles className="w-4 h-4" />
          <span>Now with AI-powered scheduling </span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold leading-tight">
          <span className="bg-gradient-to-r from-violet-900 via-purple-600 to-pink-600 px-8 bg-clip-text text-transparent">
            Schedule Smarter
          </span>
          <br />
          <span className="text-gray-900">Grow Faster</span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Manage All your social media in one place. Schedule posts, analyze
          performance and engage with your audience - all powered by AI
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
          {isAuthenticated ? (
            <Link href="/dashboard">
              <Button
                size="lg"
                className="bg-violet-600 text-white hover:bg-violet-700"
              >
                Go to Dashboard
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          ) : (
            <>
              <Link href="/sign-up">
                <Button
                  size="lg"
                  className="bg-violet-600 text-white hover:bg-violet-700"
                >
                  Start Free Trial
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/sign-in">
                <Button
                  variant="outline"
                  size="lg"
                  //   className="border-violet-300 text-violet-700 hover:bg-violet-50"
                >
                  Sign in
                </Button>
              </Link>
            </>
          )}
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-400 to-purple-600 border-2 border-white"
                ></div>
              ))}
            </div>
            <span>Trusted by 10,000+ creators</span>
            <div className="flex items-center gap-2">
              <span className="text-yellow-500">★★★★★</span>
              <span>4.9/5 rating</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
