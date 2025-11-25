import { auth } from "@clerk/nextjs/server";
import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/ui/home/hero-section";
import { FeaturesSection } from "@/components/ui/home/features-section";
import { PricingSection } from "@/components/ui/home/pricing-section";
import { Footer } from "@/components/layout/footer";

export default async function HomePage() {
  const { userId } = await auth();

  return (
    <div className="flex min-h-screen flex-col ">
      {/* Hero Section */}
      <Navbar />
      <main className="flex-1 ">
        <HeroSection isAuthenticated={!!userId} />
        <FeaturesSection />
        <PricingSection />
      </main>
      <Footer />
    </div>
  );
}
