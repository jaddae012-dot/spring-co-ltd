import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Pricing" };

export default function FastRiderPricing() {
  const plans = [
    {
      name: "Standard",
      price: "GH₵ 15",
      unit: "per delivery",
      desc: "For everyday deliveries within your area",
      features: [
        "Within-city delivery",
        "Delivery within 3–5 hours",
        "SMS notifications",
        "Basic tracking",
        "Up to 5 kg",
      ],
      cta: "Book Now",
      popular: false,
    },
    {
      name: "Express",
      price: "GH₵ 30",
      unit: "per delivery",
      desc: "When speed matters most — same-day guaranteed",
      features: [
        "Same-day delivery",
        "Delivery within 1–2 hours",
        "Real-time GPS tracking",
        "Priority handling",
        "Up to 10 kg",
        "Photo proof of delivery",
      ],
      cta: "Book Express",
      popular: true,
    },
    {
      name: "Business",
      price: "Custom",
      unit: "monthly plan",
      desc: "Tailored logistics solutions for your business",
      features: [
        "Unlimited deliveries",
        "Dedicated fleet",
        "Monthly invoicing",
        "Account manager",
        "API integration",
        "Bulk discounts",
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ];

  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="py-24 relative">
        <div className="absolute inset-0" aria-hidden="true">
          <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-red-700/8 rounded-full blur-2xl" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Simple, Transparent <span className="text-red-700">Pricing</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            No hidden fees. Choose the plan that works for you.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, i) => (
              <div
                key={i}
                className={`rounded-2xl p-8 relative ${
                  plan.popular
                    ? "bg-gradient-to-b from-red-700/10 to-red-500/10 border-2 border-red-700/30"
                    : "glass"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-red-700 text-white text-xs font-bold">
                    MOST POPULAR
                  </div>
                )}
                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="mb-1">
                  <span className="text-4xl font-black text-red-700">{plan.price}</span>
                </div>
                <p className="text-sm text-gray-500 mb-4">{plan.unit}</p>
                <p className="text-gray-400 text-sm mb-6">{plan.desc}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-gray-300">
                      <svg className="w-4 h-4 text-red-700 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={plan.name === "Business" ? "/fastrider/contact" : "/fastrider/book"}
                  className={`block w-full py-3 rounded-xl text-center font-semibold transition-colors duration-200 ${
                    plan.popular
                      ? "bg-gradient-to-r from-red-700 to-red-500 text-white"
                      : "glass text-white hover:bg-white/10"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
