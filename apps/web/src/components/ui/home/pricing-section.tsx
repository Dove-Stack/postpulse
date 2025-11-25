import { Check } from "lucide-react";
import Link from "next/link";
import { Button } from "../button";

const plansData = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for trying out PostPulse",
    features: [
      "1 social account",
      "Basic analytics",
      "Communtiy support",
      "Up to 10 scheduled posts",
    ],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$29",
    description: "For serious content creators",
    features: [
      "Priority support",
      "10 social accounts",
      "Unlimited Scheduled posts",
      "Team collaboration (up to 5)",
      "AI-powered timing suggestions",
      "Advanced analytics & reporting",
    ],
    cta: "Start Free Trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large teams and agencies",
    features: [
      "Everything in Pro",
      "Custom integrations",
      "SLA & uptime gurantees",
      "Unlimited social accounts",
      "Dedicated account gurantees",
      "Advanced security & compliance",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
];

export function PricingSection() {
  return (
    <section
      id="pricing"
      className="py-20 px-4 bg-gradient-to-b from-white to-violet-50"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Simple,{" "}
            <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
              transparent pricing
            </span>
          </h2>
          <p className="text-4xl text-gray-600">
            Start free, upgrade when you're ready
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plansData.map((plan, index) => (
            <div
              key={index}
              className={`relative p-8 rounded-2xl border-2 transition-all duration-300 ${
                plan.highlighted
                  ? "border-violet-500 shadow-2xl scale-105 bg-white"
                  : "border-purple-100 hover:border-purple-400 bg-white hover:shadow-lg"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-violet-600 to-purple-600 text-white text-sm font-semibold rounded-full">
                  Most Popular
                </div>
              )}

              <div className="mb-6 ">
                <h3 className="text-3xl font-serif font-bold bg-gradient-to-r from-violet-900 via-purple-600 to-pink-600  bg-clip-text text-transparent">
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-5xl font-serif mt-3  p-3 font-extrabold bg-gradient-to-r from-pink-600 via-violet-600 to-purple-600  bg-clip-text text-transparent">
                    {plan.price}
                  </span>
                  {/* {plan.price !== "Custom"  && (
                    <span className="text-gray-600 ">/month</span>
                  )} */}
                </div>
                <p className="text-gray-600 font-serif">{plan.description}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <Check className="h-7 w-7 text-gray-200 flex-shrink-0 p-2 mt-0.5 rounded-full bg-gradient-to-t from-violet-700 via-purple-500 to-pink-500" />
                    <span className="text-gray-700 font-bold ">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link href="/sign-up">
                <Button
                  className={`w-full  ${
                    plan.highlighted
                      ? "bg-gradient-to-l from-violet-500 via-purple-600 to-pink-600 text-white hover:bg-violet-700 p-6 text-xs font rounded-md"
                      : "bg-white text-violet-600 border-2 border-violet-200 hover:bg-violet-50 text-sm p-6 rounded-md shadow-none"
                  }`}
                  // size="lg"
                >
                  {plan.cta}
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
