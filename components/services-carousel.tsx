"use client"

import { useEffect, useRef, useState } from "react"
import { Code, Palette, Rocket, Search, Smartphone, Zap } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FancySectionTitle } from "@/components/FancySectionTitle"

type Service = {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  title: string
  description: string
  color: string
}

const services: Service[] = [
  {
    icon: Code,
    title: "Web Development",
    description: "Modern websites built with cutting-edge technologies and best practices",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Smartphone,
    title: "Responsive Design",
    description: "Pixel-perfect interfaces that adapt seamlessly to any device",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Search,
    title: "SEO Optimized",
    description: "Rank higher on Google and drive organic traffic to your business",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Zap,
    title: "High Performance",
    description: "Lightning-fast load times that keep visitors engaged and converting",
    color: "from-yellow-500 to-orange-500",
  },
  {
    icon: Palette,
    title: "Premium Design",
    description: "Sophisticated visuals that elevate your brand and build trust",
    color: "from-red-500 to-pink-500",
  },
  {
    icon: Rocket,
    title: "Fast Launch",
    description: "Your professional website delivered in 7 days, ready to generate leads",
    color: "from-indigo-500 to-blue-500",
  },
]

export function ServicesCarousel() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.1 },
    )

    observer.observe(section)

    return () => {
      observer.disconnect()
    }
  }, [])

  const getCardPosition = (index: number, rotation = 0) => {
    const angle = (index * (360 / services.length) - rotation) * (Math.PI / 180)
    const radius = 340

    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
    }
  }

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative w-full py-20 md:py-32 overflow-hidden"
    >
      {/* BACKGROUND GIF + OVERLAY (somente dentro da section) */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <img
          src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/c4cd2469553149.5b85760ee5e4b.gif"
          alt=""
          className="h-full w-full object-cover"
          style={{
            opacity: 0.16, // bem discretinho
            filter: "brightness(1.08) contrast(1.05)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/88 via-background/78 to-background/92" />
      </div>

      {/* Glows / pattern acima do GIF */}
      <div className="absolute inset-0 dot-pattern opacity-10 z-[1]" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-glow z-[1]" />
      <div
        className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-glow z-[1]"
        style={{ animationDelay: "1.5s" }}
      />

      <div className="container relative z-10 px-4 sm:px-6 lg:px-8 mx-auto">
        {/* Título / descrição */}
        <div className="text-center mb-16 space-y-4 max-w-3xl mx-auto">
          <FancySectionTitle duration={2.2}>
            Our Services
          </FancySectionTitle>

          <p className="text-lg sm:text-xl text-muted-foreground text-balance leading-relaxed">
            Everything you need for a powerful and professional digital presence
          </p>
        </div>

        {/* Orbital Carousel Container */}
        <div className="relative max-w-6xl mx-auto">
          <div className="relative w-full aspect-square max-w-4xl mx-auto flex items-center justify-center">
            <div
              className={`absolute inset-0 ${isVisible ? "animate-spin-slow" : ""}`}
              style={{ animationDuration: "60s" }}
            >
              {/* Núcleo central */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                <div className="relative w-48 h-48 md:w-64 md:h-64">
                  {/* Outer rotating ring */}
                  <div
                    className="absolute inset-0 rounded-full border-4 border-primary/20"
                    style={{
                      background:
                        "conic-gradient(from 0deg, hsl(var(--primary) / 0.3), transparent 50%, hsl(var(--primary) / 0.3))",
                    }}
                  />

                  {/* Middle ring */}
                  <div className="absolute inset-4 rounded-full border-2 border-primary/30 backdrop-blur-sm bg-background/50" />

                  {/* Inner core */}
                  <div className="absolute inset-8 rounded-full bg-gradient-to-br from-primary/20 via-accent/20 to-primary/20 backdrop-blur-md" />
                </div>
              </div>

              {/* SVG para linhas de conexão */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
                <defs>
                  <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.2" />
                    <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.2" />
                  </linearGradient>
                </defs>

                <circle
                  cx="50%"
                  cy="50%"
                  r="45%"
                  fill="none"
                  stroke="url(#lineGradient)"
                  strokeWidth="2"
                  strokeDasharray="10 5"
                  className="animate-pulse"
                />

                {services.map((_, index) => {
                  const pos = getCardPosition(index)
                  const offsetX = (pos.x / 340) * 45
                  const offsetY = (pos.y / 340) * 45

                  return (
                    <line
                      key={index}
                      x1="50%"
                      y1="50%"
                      x2={`${50 + offsetX}%`}
                      y2={`${50 + offsetY}%`}
                      stroke="url(#lineGradient)"
                      strokeWidth={hoveredIndex === index ? 3 : 1.5}
                      className="transition-all duration-300"
                    />
                  )
                })}
              </svg>

              {/* Cards de serviços */}
              {services.map((service, index) => {
                const pos = getCardPosition(index)
                const isHovered = hoveredIndex === index

                return (
                  <div
                    key={service.title}
                    className="absolute top-1/2 left-1/2 z-30 transition-transform duration-300"
                    style={{
                      transform: `translate(calc(-50% + ${pos.x}px), calc(-50% + ${pos.y}px)) scale(${
                        isHovered ? 1.1 : 1
                      })`,
                    }}
                  >
                    <div
                      className={isVisible ? "animate-spin-slow-reverse" : ""}
                      style={{ animationDuration: "60s" }}
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    >
                      <Card
                        className={`group relative overflow-hidden border-border/50 backdrop-blur-md bg-card/80 transition-all duration-500 w-44 md:w-52 hover:shadow-2xl hover:shadow-primary/20 ${
                          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                        } ${isHovered ? "z-50" : ""}`}
                      >
                        <div
                          className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                        />

                        <CardHeader className="text-center pb-2 p-3 md:p-4">
                          <div
                            className={`inline-flex h-12 w-12 md:h-16 md:w-16 items-center justify-center rounded-xl bg-gradient-to-br ${service.color} mb-2 mx-auto transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-lg`}
                          >
                            <service.icon className="h-6 w-6 md:h-8 md:w-8 text-white" />
                          </div>
                          <CardTitle className="text-sm md:text-base group-hover:text-primary transition-colors duration-300">
                            {service.title}
                          </CardTitle>
                        </CardHeader>

                        <CardContent className="text-center p-3 pt-0 md:p-4 md:pt-0">
                          <CardDescription className="text-xs md:text-sm leading-relaxed line-clamp-3">
                            {service.description}
                          </CardDescription>
                        </CardContent>

                        <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <div
                            className={`absolute inset-0 rounded-lg bg-gradient-to-r ${service.color} opacity-20 blur-sm`}
                          />
                        </div>
                      </Card>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
