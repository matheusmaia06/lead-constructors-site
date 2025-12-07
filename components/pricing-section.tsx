"use client"

import { Check, Crown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useEffect, useRef, useState } from "react"

const plans = [
  {
    name: "Essential",
    description: "Complete landing page for your online presence",
    price: "$399.90",
    icon: Crown,
    popular: false,
    features: [
      "Professional landing page",
      "About Us section",
      "Interactive FAQ",
      "Client portfolio showcase",
      "WhatsApp button integration",
      "Google Maps location",
      "Contact form",
      "Premium responsive design",
      "Hosting included",
      "Domain included",
    ],
    color: "from-blue-500 to-cyan-500",
  },
  {
    name: "Professional",
    description: "Full website with extended support",
    price: "$995.90",
    icon: Crown,
    popular: true,
    features: [
      "Up to 5 custom pages",
      "Everything in Essential",
      "Exclusive premium design",
      "Full year of support",
      "Unlimited improvements",
      "Design modifications",
      "Content updates",
      "Monthly consulting",
      "Hosting included",
      "Domain included",
    ],
    color: "from-purple-500 to-pink-500",
  },
]

export function PricingSection() {
  const [visibleCards, setVisibleCards] = useState<boolean[]>(
    new Array(plans.length).fill(false),
  )
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            plans.forEach((_, index) => {
              setTimeout(() => {
                setVisibleCards(prev => {
                  const newState = [...prev]
                  newState[index] = true
                  return newState
                })
              }, index * 150)
            })
          }
        })
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="pricing"
      className="relative w-full py-20 md:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background blur-reveal" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
      <div
        className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-3xl animate-pulse-glow"
        style={{ animationDelay: "1s" }}
      />

      <div className="container relative z-10 px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="text-center mb-16 space-y-4 max-w-3xl mx-auto">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            <span className="inline-block px-1 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient">
              Plans & Pricing
            </span>
          </h2>

          <p className="text-lg sm:text-xl text-muted-foreground text-balance leading-relaxed smooth-appear">
            Affordable investment with everything included. We handle it all for you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`group relative overflow-hidden backdrop-blur-sm smooth-hover-lift glow-on-hover ${
                plan.popular
                  ? "border-primary/50 shadow-2xl shadow-primary/20 bg-card lg:-translate-y-4"
                  : "border-border/50 bg-card/50 hover:bg-card hover:shadow-xl"
              } ${
                visibleCards[index]
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{
                transitionDelay: `${index * 150}ms`,
                transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-primary to-accent text-primary-foreground text-xs font-bold px-4 py-1 rounded-bl-lg z-10">
                  MOST POPULAR
                </div>
              )}

              <div
                className={`absolute inset-0 bg-gradient-to-br ${plan.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
              />

              <CardHeader className="relative">
                <div
                  className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${plan.color} mb-4 transition-transform group-hover:scale-110 group-hover:rotate-3 shadow-lg`}
                >
                  <plan.icon className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-3xl">{plan.name}</CardTitle>
                <CardDescription className="text-base">
                  {plan.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="relative space-y-6">
                <div className="space-y-2">
                  <div className="flex items-baseline gap-2">
                    <div className="text-5xl font-bold tracking-tight">
                      {plan.price}
                    </div>
                    <span className="text-base font-semibold opacity-80">
                      + $50/mo
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    one-time payment + ongoing monthly support
                  </div>
                </div>

                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-start gap-3"
                    >
                      <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm leading-relaxed">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              {/* 🔥 UPDATED BUTTON WITH PAYPAL LINKS */}
              <CardFooter className="relative">
                <Button
                  asChild
                  className={`w-full h-12 text-base transition-all ${
                    plan.popular
                      ? "bg-gradient-to-r from-primary to-accent hover:shadow-xl hover:shadow-primary/50 hover:scale-105"
                      : "hover:scale-105"
                  }`}
                  variant={plan.popular ? "default" : "outline"}
                >
                  <a
                    href={
                      plan.name === "Essential"
                        ? "https://www.paypal.com/ncp/payment/THR5NWFSZF4EW"
                        : "https://www.paypal.com/ncp/payment/ZFRKG3GVZUQUL"
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Get Started
                  </a>
                </Button>
              </CardFooter>

              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-primary/5 to-transparent" />
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12 space-y-2">
          <p className="text-lg font-semibold text-foreground">
            Everything included: hosting, domain, and complete setup
          </p>
          <p className="text-muted-foreground">
            We take care of everything. You just focus on your business.
          </p>
        </div>
      </div>
    </section>
  )
}
