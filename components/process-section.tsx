"use client"

import { CheckCircle2, MessageSquare, Palette, Rocket } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

const steps = [
  {
    icon: MessageSquare,
    title: "Discovery",
    subtitle: "Deep understanding",
    description:
      "We immerse ourselves in your business goals, target audience, and industry to uncover opportunities.",
    duration: "30 min",
  },
  {
    icon: Palette,
    title: "Design",
    subtitle: "World-class creative",
    description:
      "Custom, sophisticated design that captures your brand essence and converts visitors into clients.",
    duration: "2 days",
  },
  {
    icon: CheckCircle2,
    title: "Build",
    subtitle: "Cutting-edge tech",
    description:
      "Professional development with modern technologies for blazing-fast performance and reliability.",
    duration: "3 days",
  },
  {
    icon: Rocket,
    title: "Launch",
    subtitle: "End-to-end delivery",
    description:
      "Complete deployment with domain, hosting, and everything configured so you can focus on growth.",
    duration: "1 day",
  },
]

const BORDER_LENGTH = 1200

export function ProcessSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement | null>(null)

  // reveal da seção
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setIsVisible(true)
        })
      },
      { threshold: 0.2 },
    )

    const node = sectionRef.current
    if (node) observer.observe(node)

    return () => {
      if (node) observer.unobserve(node)
      observer.disconnect()
    }
  }, [])

  // scroll-sync para borda e tilt
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "end 20%"],
  })

  const borderOffset = useTransform(scrollYProgress, [0.1, 0.9], [BORDER_LENGTH, 0])
  const tiltRight = useTransform(scrollYProgress, [0, 1], [-8, 8])
  const tiltLeft = useTransform(scrollYProgress, [0, 1], [8, -8])

  return (
    <section
      ref={sectionRef}
      id="process"
      className="w-full bg-background py-24 md:py-32 lg:py-40"
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* HEADER DA SEÇÃO */}
        <div className="mb-20">
          <div className="section-title-wrapper">
            <h2
              className={`premium-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold transition-all duration-1000 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
            >
              <span className="premium-title-inner bg-gradient-to-r from-primary via-primary/90 to-accent bg-clip-text text-transparent">
                Move Fast + Make Things
              </span>
            </h2>
            <span className="section-title-bar" />
          </div>

          <p
            className={`mt-6 max-w-3xl text-xl text-muted-foreground transition-all duration-1000 delay-200 md:text-2xl ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            Our streamlined process delivers exceptional results in record time.
          </p>
        </div>

        {/* LISTA DE ETAPAS */}
        <div className="space-y-24 md:space-y-32">
          {steps.map((step, index) => {
            const tilt = index % 2 === 0 ? tiltRight : tiltLeft

            const isDiscovery = index === 0
            const isDesign = index === 1
            const isBuild = index === 2
            const isLaunch = index === 3

            return (
              <div
                key={step.title}
                className={`grid items-center gap-12 transition-all duration-1000 lg:grid-cols-2 lg:gap-20 ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                } ${index % 2 === 1 ? "lg:grid-flow-dense" : ""}`}
                style={{ transitionDelay: `${(index + 2) * 200}ms` }}
              >
                {/* TEXTO */}
                <div className={`space-y-6 ${index % 2 === 1 ? "lg:col-start-2" : ""}`}>
                  <div className="inline-flex items-center gap-4">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-2xl font-bold text-primary">
                      {index + 1}
                    </span>
                    <span className="rounded-full bg-accent/20 px-4 py-1.5 text-sm font-semibold uppercase tracking-wide text-accent">
                      {step.duration}
                    </span>
                  </div>

                  <div>
                    <h3 className="mb-3 text-4xl font-bold leading-none md:text-5xl lg:text-6xl">
                      {step.title}
                    </h3>
                    <p className="text-2xl font-medium text-accent">{step.subtitle}</p>
                  </div>

                  <p className="max-w-xl text-xl leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>

                {/* QUADRADO ANIMADO */}
                <div
                  className={`relative ${
                    index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""
                  }`}
                >
                  <div className="relative mx-auto aspect-square max-w-md">
                    {/* glow de fundo */}
                    <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-br from-primary/25 via-accent/20 to-primary/30 blur-3xl" />

                    {/* card com tilt + wow */}
                    <motion.div
                      className="group relative flex h-full items-center justify-center overflow-hidden rounded-[3rem] border border-border/40 bg-gradient-to-br from-card to-card/60 backdrop-blur-sm"
                      style={{ rotate: tilt }}
                      whileHover={{
                        scale: 1.03,
                        y: -6,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 24,
                      }}
                    >
                      {/* BORDA VIBRANTE QUE DESENHA */}
                      <motion.svg
                        className="pointer-events-none absolute inset-0 h-full w-full"
                        viewBox="0 0 340 340"
                      >
                        <defs>
                          <linearGradient
                            id={`processBorderGradient-${index}`}
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="100%"
                          >
                            <stop offset="0%" stopColor="#38bdf8" />
                            <stop offset="40%" stopColor="#0ea5e9" />
                            <stop offset="100%" stopColor="#22c1c3" />
                          </linearGradient>
                        </defs>

                        {/* borda de glow suave */}
                        <rect
                          x="20"
                          y="20"
                          width="300"
                          height="300"
                          rx="48"
                          stroke="rgba(56, 189, 248, 0.25)"
                          strokeWidth="2"
                          fill="none"
                        />

                        {/* borda principal animada */}
                        <motion.rect
                          x="20"
                          y="20"
                          width="300"
                          height="300"
                          rx="48"
                          stroke={`url(#processBorderGradient-${index})`}
                          strokeWidth="2"
                          fill="none"
                          strokeDasharray={BORDER_LENGTH}
                          style={{ strokeDashoffset: borderOffset }}
                          strokeLinecap="round"
                          vectorEffect="non-scaling-stroke"
                        />
                      </motion.svg>

                      {/* CONTEÚDO CENTRAL – GIFs + ícone fallback */}
                      <div className="absolute inset-0 flex items-center justify-center p-6">
                        {isDiscovery && (
                          <motion.img
                            src="/portfolio/processdiscovery.gif"
                            alt="Discovery process animation"
                            className="h-full w-full rounded-[2.5rem] object-cover pointer-events-none"
                            initial={{ scale: 1.02 }}
                            animate={{ scale: [1.02, 1.08, 1.02] }}
                            transition={{
                              duration: 10,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                          />
                        )}

                        {isDesign && (
                          <motion.img
                            src="/portfolio/sodenberg.webp"
                            alt="Design exploration animation"
                            className="h-full w-full rounded-[2.5rem] object-cover pointer-events-none"
                            initial={{ scale: 1.02 }}
                            animate={{ scale: [1.02, 1.08, 1.02] }}
                            transition={{
                              duration: 10,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                          />
                        )}

                        {isBuild && (
                          <motion.img
                            src="/portfolio/catcoding.gif"
                            alt="Build & development animation"
                            className="h-full w-full rounded-[2.5rem] object-cover pointer-events-none"
                            initial={{ scale: 1.02 }}
                            animate={{ scale: [1.02, 1.07, 1.02] }}
                            transition={{
                              duration: 9,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                          />
                        )}

                        {isLaunch && (
                          <motion.img
                            src="/portfolio/launchgif.gif"
                            alt="Launch celebration animation"
                            className="h-full w-full rounded-[2.5rem] object-cover pointer-events-none"
                            initial={{ scale: 1.02, rotate: -1 }}
                            animate={{
                              scale: [1.02, 1.09, 1.02],
                              rotate: [-1, 1, -1],
                            }}
                            transition={{
                              duration: 8,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                          />
                        )}

                        {/* fallback pra futuros steps sem GIF */}
                        {!isDiscovery && !isDesign && !isBuild && !isLaunch && (
                          <motion.div
                            className="flex items-center justify-center"
                            initial={{ scale: 0.9, opacity: 0.85 }}
                            animate={{
                              scale: [0.9, 1, 0.97, 1],
                              opacity: 1,
                            }}
                            transition={{
                              duration: 8,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                          >
                            <step.icon
                              className="h-40 w-40 text-primary/70 drop-shadow-[0_0_18px_rgba(56,189,248,0.55)]"
                              strokeWidth={0.7}
                            />
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
