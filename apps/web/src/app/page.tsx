import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calendar, BarChart3, Zap } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";

export default async function HomePage() {
  const { userId } = await auth();

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
        <Navbar/>
    </div>
  );
}
