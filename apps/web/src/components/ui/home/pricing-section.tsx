import { Check } from "lucide-react";
import Link from "next/link";
import { Button } from "../button";

const plansData = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for trying out PostPulse",
    features: [
      "Up to 10 scheduled posts",
      "1 social account",
      "Basic analytics",
      "Communtiy support",
    ],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$29",
    description: "For serious content creators",
    features: [
      "Unlimited Scheduled posts",
      "10 social accounts",
      "Advanced analytics & reporting",
      "AI-powered timing suggestions",
      "Priority support",
      "Team collaboration (up to 5)",
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
      "Unlimited social accounts",
      "Custom integrations",
      "Dedicated account gurantees",
      "SLA & uptime gurantees",
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
                  : "border-purple-100 hover:border-purple-300 bg-white hover:shadow-lg"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-violet-600 to-purple-600 text-white text-sm font-semibold rounded-full">
                  Most Popular
                </div>
              )}

              <div className="mb-6 text-center ">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-violet-900 via-purple-600 to-pink-600  bg-clip-text text-transparent">
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-5xl my-4 font-bold text-center mx-auto text-gray-900">
                    {plan.price}
                  </span>
                  {/* {plan.price !== "Custom"  && (
                    <span className="text-gray-600 ">/month</span>
                  )} */}
                </div>
                <p className="text-gray-600">{plan.description}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-violet-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link href="/sign-up">
                <Button
                  className={`w-full  ${
                    plan.highlighted
                      ? "bg-violet-600 text-white hover:bg-violet-700"
                      : "bg-white text-violet-600 border-2 border-violet-200 hover:bg-violet-50"
                  }`}
                  size="lg"
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
