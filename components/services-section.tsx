"use client"

import { Code, Palette, Rocket, Search, Smartphone, Zap } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useRef, useState } from "react"
import { FancySectionTitle } from "./FancySectionTitle"

const services = [
  {
    icon: Code,
    title: "Web Development",
    description: "Modern websites built with cutting-edge technologies and best practices.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Smartphone,
    title: "Responsive Design",
    description: "Pixel-perfect interfaces that adapt seamlessly to any device.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Search,
    title: "SEO Optimized",
    description: "Rank higher on Google and drive organic traffic to your business.",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Zap,
    title: "High Performance",
    description: "Lightning-fast load times that keep visitors engaged and converting.",
    color: "from-yellow-500 to-orange-500",
  },
  {
    icon: Palette,
    title: "Premium Design",
    description: "Sophisticated visuals that elevate your brand and build trust.",
    color: "from-red-500 to-pink-500",
  },
  {
    icon: Rocket,
    title: "Fast Launch",
    description: "Your professional website delivered in 7 days, ready to generate leads.",
    color: "from-indigo-500 to-blue-500",
  },
]

export function ServicesSection() {
  const [visibleCards, setVisibleCards] = useState<boolean[]>(new Array(services.length).fill(false))
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            services.forEach((_, index) => {
              setTimeout(() => {
                setVisibleCards((prev) => {
                  const newState = [...prev]
                  newState[index] = true
                  return newState
                })
              }, index * 100)
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
      id="services"
      className="relative w-full py-20 md:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 dot-pattern opacity-30" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
      <div
        className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-glow"
        style={{ animationDelay: "1.5s" }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl animate-float" />

      <div className="container relative z-10 px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="text-center mb-16 space-y-4 max-w-3xl mx-auto">
          <FancySectionTitle duration={2.2}>
            Our Services
          </FancySectionTitle>

          <p className="text-lg sm:text-xl text-muted-foreground text-balance leading-relaxed">
            Everything you need for a powerful and professional digital presence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <Card
              key={service.title}
              className={`group relative overflow-hidden border-border/50 backdrop-blur-sm bg-card/50 hover:bg-card transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20 ${
                visibleCards[index] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
              />
              <div
                className={`absolute inset-0 bg-gradient-to-tl ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-700`}
                style={{ transitionDelay: "100ms" }}
              />

              <CardHeader>
                <div
                  className={`inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${service.color} mb-4 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-lg group-hover:shadow-2xl`}
                >
                  <service.icon className="h-7 w-7 text-white" />
                </div>
                <CardTitle className="text-2xl group-hover:text-primary transition-colors duration-300">
                  {service.title}
                </CardTitle>
              </CardHeader>

              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  {service.description}
                </CardDescription>
              </CardContent>

              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 animate-shimmer" />
              </div>

              <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className={`absolute inset-0 rounded-lg bg-gradient-to-r ${service.color} opacity-20 blur-sm`} />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
