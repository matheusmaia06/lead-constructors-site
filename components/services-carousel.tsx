"use client"

import { useEffect, useRef, useState } from "react"
import { Code, Palette, Rocket, Search, Smartphone, Zap } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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
    description:
      "Modern websites built with cutting-edge technologies and best practices.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Smartphone,
    title: "Responsive Design",
    description:
      "Pixel-perfect interfaces that adapt seamlessly to any device.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Search,
    title: "SEO Optimized",
    description:
      "Rank higher on Google and drive organic traffic to your business.",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Zap,
    title: "High Performance",
    description:
      "Lightning-fast load times that keep visitors engaged and converting.",
    color: "from-yellow-500 to-orange-500",
  },
  {
    icon: Palette,
    title: "Premium Design",
    description:
      "Clean, modern visuals aligned with your brand and audience.",
    color: "from-red-500 to-pink-500",
  },
  {
    icon: Rocket,
    title: "Conversion Focused",
    description:
      "Every section designed to drive leads, bookings and real revenue.",
    color: "from-indigo-500 to-blue-500",
  },
]

// raio maior para afastar os cards do centro no desktop
const DESKTOP_RADIUS = 260

export function ServicesCarousel() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement | null>(null)

  // client-only flag para evitar diferenças de trig entre Node e browser
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
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
    const angle =
      ((index / services.length) * 360 + rotation) * (Math.PI / 180)

    const radius = DESKTOP_RADIUS

    const x = Math.cos(angle) * radius
    const y = Math.sin(angle) * radius

    return { x, y }
  }

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative w-full py-20 md:py-32 overflow-hidden"
    >
      {/* BACKGROUND VIDEO + OVERLAY */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          aria-hidden="true"
          className="h-full w-full object-cover"
          style={{
            opacity: 0.9,
            filter: "brightness(1.05) contrast(1.04)",
          }}
        >
          <source src="/portfolio/loopwave.webm" type="video/webm" />
        </video>
        <div className="absolute inset-0 bg-slate-950/70" />
      </div>

      {/* Glows / pattern acima do vídeo */}
      <div className="absolute inset-0 dot-pattern opacity-15 z-[1]" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/15 rounded-full blur-3xl animate-pulse-glow z-[1]" />
      <div
        className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/15 rounded-full blur-3xl animate-pulse-glow z-[1]"
        style={{ animationDelay: "1.5s" }}
      />

      <div className="container relative z-10 px-4 sm:px-6 lg:px-8 mx-auto">
        {/* Título / descrição */}
        <div className="text-center mb-16 space-y-4 max-w-3xl mx-auto">
          <FancySectionTitle>
            Our Services
          </FancySectionTitle>

          <p className="text-lg sm:text-xl text-muted-foreground text-balance leading-relaxed">
            Everything you need for a powerful and professional digital
            presence.
          </p>
        </div>

        {/* MOBILE – grid simples, sem órbita */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 md:hidden">
          {services.map(service => (
            <Card
              key={service.title}
              className="relative overflow-hidden border border-cyan-500/15 bg-slate-950/85 backdrop-blur-md"
            >
              <CardHeader className="pb-2">
                <div
                  className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${service.color} mb-3`}
                >
                  <service.icon className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-base text-sky-100">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 pb-4">
                <CardDescription className="text-sm leading-relaxed">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* DESKTOP – Orbital Carousel (client-only para evitar hydration mismatch de trig) */}
        {mounted && (
          <div className="relative max-w-6xl mx-auto hidden md:block">
            <div className="relative w-full md:aspect-[4/3] max-w-4xl mx-auto flex items-center justify-center">
              <div
                className={`absolute inset-0 ${
                  isVisible ? "animate-spin-slow" : ""
                }`}
                style={{ animationDuration: "60s" }}
              >
                {/* Núcleo central */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                  <div className="relative w-48 h-48 md:w-64 md:h-64">
                    <div
                      className="absolute inset-0 rounded-full border-[3px] border-cyan-500/25"
                      style={{
                        background:
                          "conic-gradient(from 0deg, rgba(34,211,238,0.35), transparent 55%, rgba(34,211,238,0.4))",
                      }}
                    />
                    <div className="absolute inset-4 rounded-full border border-cyan-400/35 backdrop-blur-md bg-slate-950/60" />
                    <div className="absolute inset-8 rounded-full bg-gradient-to-br from-cyan-500/25 via-sky-500/15 to-emerald-400/25 backdrop-blur-xl" />
                  </div>
                </div>

                {/* Linhas de conexão (SVG) */}
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none z-10"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <defs>
                    <linearGradient
                      id="lineGradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#020617" stopOpacity="0" />
                      <stop
                        offset="35%"
                        stopColor="#0ea5e9"
                        stopOpacity="0.45"
                      />
                      <stop
                        offset="70%"
                        stopColor="#22d3ee"
                        stopOpacity="0.35"
                      />
                      <stop
                        offset="100%"
                        stopColor="#020617"
                        stopOpacity="0"
                      />
                    </linearGradient>
                  </defs>

                  {services.map((_, index) => {
                    const pos = getCardPosition(index, 25)
                    const offsetX = (pos.x / DESKTOP_RADIUS) * 40
                    const offsetY = (pos.y / DESKTOP_RADIUS) * 40

                    return (
                      <line
                        key={index}
                        x1="50"
                        y1="50"
                        x2={50 + offsetX}
                        y2={50 + offsetY}
                        stroke="url(#lineGradient)"
                        strokeWidth={hoveredIndex === index ? 2.4 : 1.2}
                        className="transition-all duration-300 opacity-80"
                      />
                    )
                  })}
                </svg>

                {/* Cards em órbita */}
                {services.map((service, index) => {
                  const pos = getCardPosition(index)
                  const isHovered = hoveredIndex === index

                  return (
                    <div
                      key={service.title}
                      className="absolute top-1/2 left-1/2 z-30 transition-transform duration-300"
                      style={{
                        transform: `translate(calc(-50% + ${pos.x}px), calc(-50% + ${pos.y}px)) scale(${
                          isHovered ? 1.08 : 1
                        })`,
                      }}
                    >
                      <div
                        className={isVisible ? "animate-spin-slow-reverse" : ""}
                        style={{ animationDuration: "60s" }}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                      >
                        <Card className="relative w-48 md:w-56 min-h-[190px] bg-slate-950/95 border border-cyan-500/40 shadow-xl shadow-cyan-500/25 overflow-hidden rounded-2xl">
                          {/* Glow de fundo */}
                          <div
                            className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-60`}
                          />
                          <div className="absolute inset-[1px] rounded-2xl bg-slate-950/95 backdrop-blur-xl" />

                          <CardHeader className="relative z-10 pb-1">
                            <div className="flex items-center gap-2">
                              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900/80 border border-cyan-400/60">
                                <service.icon className="h-5 w-5 text-cyan-300" />
                              </div>
                              <CardTitle className="text-sm md:text-base leading-tight text-sky-100">
                                {service.title}
                              </CardTitle>
                            </div>
                          </CardHeader>

                          <CardContent className="relative z-10 pt-1 pb-3">
                            <CardDescription className="text-xs md:text-sm text-slate-200/85 leading-relaxed line-clamp-3">
                              {service.description}
                            </CardDescription>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
