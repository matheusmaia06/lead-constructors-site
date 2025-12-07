"use client"

import { useEffect, useRef, useState } from "react"
import type React from "react"
import { useScroll } from "framer-motion"
import { AnimatedBackground } from "./animated-background"

const PIN_MULTIPLIER = 3 // hero pinado por 3x a altura do viewport

export function HeroSection() {
  const [currentImage, setCurrentImage] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const containerRef = useRef<HTMLDivElement | null>(null)

  // Framer Motion scroll progress (muito mais suave)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  // baseline visual: mesmo com scroll 0, a hero já entra um pouco animada
  const visualScrollProgress = Math.max(scrollProgress, 0.07)

  const phase = (start: number, end: number) => {
    if (end <= start) return 0
    const t = (visualScrollProgress - start) / (end - start)
    return Math.min(1, Math.max(0, t))
  }

  const headlineProgress = phase(0.02, 0.15)
  const benefitsProgress = phase(0.15, 0.3)
  const finalResultsProgress = phase(0.4, 0.5)
  const underlineProgress = phase(0.1, 0.2)

  // liga o scrollYProgress do Framer no nosso scrollProgress bruto
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", value => {
      setScrollProgress(value)
    })
    return () => {
      unsubscribe()
    }
  }, [scrollYProgress])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage(prev => (prev + 1) % backgroundImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // HERO BACKGROUND IMAGES (mantido, caso queira usar depois)
  const backgroundImages = [
    "/abstract-technology-digital-blue-gradient.jpg",
    "/abstract-technology-digital-blue-gradient-2.jpg",
    "/abstract-technology-digital-blue-gradient-3.jpg",
  ]

  const headline = "Your business deserves... real digital presence."
  const headlineWords = headline.split(" ")

  const wordStyle = (index: number): React.CSSProperties => {
    const total = headlineWords.length
    const base = headlineProgress * (total + 1.5)
    const diff = base - index
    const p = Math.min(1, Math.max(0, diff))

    const eased = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2

    return {
      opacity: eased,
      transform: `translateY(${(1 - eased) * 20}px)`,
      filter: `blur(${(1 - eased) * 7}px)`,
      transition: "opacity 0.2s, transform 0.2s, filter 0.2s",
    }
  }

  // opacidade do "scroll cue": some suavemente conforme o usuário rola
  const scrollCueOpacity = 1 - Math.min(scrollProgress / 0.18, 1)

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ height: `${PIN_MULTIPLIER * 100}vh` }}
    >
      <section
        className="relative w-full overflow-hidden bg-secondary text-secondary-foreground"
        style={{
          height: "100vh",
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        {/* HERO BACKGROUND VIDEO */}
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            opacity: 0.7,
          }}
        >
          <source src="/bluetechbackground.webm" type="video/webm" />
        </video>

        <AnimatedBackground />
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/90 via-secondary/80 to-primary/30" />

        {/* HERO MAIN CONTENT (fade out quando entra JUST REAL RESULTS) */}
        <div
          className="container relative z-10 mx-auto flex h-full items-center px-4 sm:px-6 lg:px-8"
          style={{
            opacity: 1 - finalResultsProgress,
            transform: `scale(1 - finalResultsProgress * 0.04)`,
            transition:
              "opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <div className="w-full max-w-6xl mx-auto relative">
            {/* HERO HEADLINE */}
            <div className="max-w-2xl md:max-w-3xl">
              <h1
                className="font-bold leading-[1.1] text-left text-white"
                style={
                  {
                    fontSize: "clamp(2.6rem, 5vw, 4.2rem)",
                    letterSpacing: "-0.035em",
                  } as React.CSSProperties
                }
              >
                {headlineWords.map((word, index) => {
                  const baseStyle = wordStyle(index)

                  // se não é "deserves..." (começa com deserves), renderiza normal
                  if (!word.toLowerCase().startsWith("deserves")) {
                    return (
                      <span
                        key={index}
                        style={baseStyle}
                        className="inline-block mr-2"
                      >
                        {word}
                      </span>
                    )
                  }

                  // palavra "deserves..." com sublinhado animado
                  return (
                    <span
                      key={index}
                      style={baseStyle}
                      className="relative inline-block mr-2"
                    >
                      <span className="relative z-10">{word}</span>
                      <span
                        className="pointer-events-none absolute -bottom-1 left-0 h-[3px] rounded-full bg-cyan-300/80"
                        style={{
                          width: `${underlineProgress * 100}%`,
                          boxShadow:
                            underlineProgress > 0.1
                              ? "0 0 25px rgba(56, 189, 248, 0.9)"
                              : "none",
                          transition:
                            "width 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                        }}
                      />
                    </span>
                  )
                })}
              </h1>

              {/* SUBTÍTULO – POSITIVO / INSTITUCIONAL */}
              <p
                className="mt-6 max-w-xl text-base sm:text-lg md:text-xl text-sky-100/90"
                style={{
                  opacity: benefitsProgress,
                  transform: `translateY(${(1 - benefitsProgress) * 12}px)`,
                  filter: `blur(${(1 - benefitsProgress) * 6}px)`,
                  transition:
                    "opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1), transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), filter 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              >
                We design and build modern websites that combine strong visual
                presence with measurable business outcomes.{" "}
                <span className="text-sky-200/95">
                  Lean structure, senior execution, and transparent pricing
                  from the first conversation to launch.
                </span>
              </p>
            </div>

            {/* BLOCO DA DIREITA – BENEFÍCIOS POSITIVOS */}
            <div className="mt-10 grid gap-6 md:mt-0 md:absolute md:right-0 md:top-1/2 md:flex md:-translate-y-1/2 md:flex-col md:items-end">
              <div
                className="max-w-sm rounded-2xl border border-cyan-400/40 bg-slate-950/75 px-6 py-5 text-sky-50 shadow-lg shadow-cyan-900/40 backdrop-blur-md space-y-4"
                style={{
                  opacity: benefitsProgress,
                  transform: `translateY(${(1 - benefitsProgress) * 18}px)`,
                  transition:
                    "opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              >
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-300/80">
                  What you can expect
                </div>

                <div className="space-y-3 text-sm sm:text-base">
                  <div className="border-l-2 border-cyan-400/70 pl-3">
                    <p className="font-semibold">Structured, guided process</p>
                    <p className="mt-1 text-sky-100/80">
                      From discovery to launch, every step is mapped and
                      communicated so you always know what comes next.
                    </p>
                  </div>

                  <div className="border-l-2 border-cyan-400/70 pl-3">
                    <p className="font-semibold">Design aligned with outcomes</p>
                    <p className="mt-1 text-sky-100/80">
                      Interfaces crafted to support your positioning,
                      strengthen credibility, and generate qualified leads.
                    </p>
                  </div>

                  <div className="border-l-2 border-cyan-400/70 pl-3">
                    <p className="font-semibold">Complete delivery</p>
                    <p className="mt-1 text-sky-100/80">
                      Domain, hosting, analytics and integrations configured,
                      ready for you to grow from day one.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* HERO OVERLAY – JUST REAL RESULTS */}
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center z-20"
          style={{
            opacity: finalResultsProgress,
            transform: `scale(${
              0.9 + finalResultsProgress * 0.15
            }) translateY(${(1 - finalResultsProgress) * 30}px)`,
            transition:
              "opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <h2 className="text-center font-extrabold leading-tight uppercase px-4">
            <span
              className={`
        inline-block bg-gradient-to-r from-sky-300 via-cyan-400 to-emerald-300 
        bg-clip-text text-transparent 
        text-3xl sm:text-4xl md:text-5xl 
        tracking-[0.18em] sm:tracking-[0.3em] md:tracking-[0.5em]
      `}
              style={{
                textShadow: `
          0 0 20px rgba(56, 189, 248, 0.95),
          0 0 40px rgba(56, 189, 248, 0.65)
        `,
                filter: `blur(${(1 - finalResultsProgress) * 3}px)`,
              }}
            >
              <span className="block md:inline">JUST REAL</span>
              <span className="block md:inline md:ml-4">RESULTS.</span>
            </span>
          </h2>
        </div>

        {/* SCROLL CUE – chama o usuário pra rolar */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-8 flex justify-center z-30"
          style={{
            opacity: scrollCueOpacity,
            transform: `translateY(${(1 - scrollCueOpacity) * 8}px)`,
            transition:
              "opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1), transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <div className="flex flex-col items-center gap-3 text-[11px] sm:text-xs text-sky-100/80 tracking-[0.25em] uppercase">
            {/* texto só em telas maiores, pra não poluir o mobile */}
            <span className="hidden sm:block">Scroll to see how it works</span>

            {/* versão mobile: seta grande piscando no centro horizontal */}
            <div className="flex md:hidden h-12 w-12 items-center justify-center rounded-full border border-sky-200/70 bg-slate-950/80 backdrop-blur-md shadow-[0_0_22px_rgba(56,189,248,0.9)]">
              <span className="text-2xl leading-none scroll-arrow-pulse">
                ↓
              </span>
            </div>

            {/* versão desktop/tablet: mais discreta, como antes */}
            <div className="hidden md:flex h-9 w-6 items-center justify-center rounded-full border border-sky-200/60 bg-slate-950/60 backdrop-blur-md">
              <span className="text-lg leading-none animate-bounce">↓</span>
            </div>
          </div>
        </div>

        {/* animação custom da seta mobile */}
        <style jsx>{`
          @keyframes scrollArrowPulse {
            0% {
              transform: translateY(0);
              opacity: 0.3;
            }
            50% {
              transform: translateY(8px);
              opacity: 1;
            }
            100% {
              transform: translateY(0);
              opacity: 0.3;
            }
          }
          .scroll-arrow-pulse {
            animation: scrollArrowPulse 1.1s ease-in-out infinite;
          }
        `}</style>
      </section>
    </div>
  )
}
