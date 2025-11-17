import { BarChart3, Calendar, Clock, Shield, Users, Zap } from "lucide-react";

const featuresData = [
  {
    icon: Calendar,
    title: "Smart Scheduling",
    description:
      "Schedule posts across Twitter, LinkedIn, Facebook, and Instagram with AI-powered optimal timing suggestions.",
    gradient: "from-violet-500 to-purple-500",
  },
  {
    icon: BarChart3,
    title: "Real-Time Analytics",
    description:
      "Track engagement, views, clicks, and performance metrics in real-time with beautiful dashboards.",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Built with modern tech stack ensuring sub-second response times and smooth user experience.",
    gradient: "from-pink-500 to-rose-500",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description:
      "Invite team members, assign roles, and manage multiple brands under one organization.",
    gradient: "from-blue-500 to-violet-500",
  },
  {
    icon: Clock,
    title: "Queue Management",
    description:
      "Build content queues, set posting schedules, and let PostPulse handle the rest automatically.",
    gradient: "from-indigo-500 to-purple-500",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description:
      "Bank-level encryption, SOC 2 compliance, and row-level security for multi-tenant data isolation.",
    gradient: "from-violet-600 to-indigo-600",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-6xl md:5xl font-bold text-gray-900">
            Everything you need to{" "}
            <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
              grow faster
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Powerful features designed for modern social media managers and
            growing teams
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuresData.map((feature, index) => (
            <div
              key={index}
              className="group p-8 rounded-2xl border-purple-100 hover:border-purple-300 hover:shadow-xl transition-alll duration-300 bg-white hover:bg-gradient-to-br hover:from-violet-100 hover:to-purple-300"
            >
              <div
                className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.gradient} mb-6`}
              >
                <feature.icon className="w-6 h-6 text-white" />
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
