"use client"

import { useEffect, useRef, useState } from "react"
import type React from "react"
import { useScroll } from "framer-motion"
import { AnimatedBackground } from "./animated-background"

const PIN_MULTIPLIER = 5 // hero pinado por 5x a altura do viewport

export function HeroSection() {
  const [currentImage, setCurrentImage] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const containerRef = useRef<HTMLDivElement | null>(null)

  // Framer Motion scroll progress (muito mais suave)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const phase = (start: number, end: number) => {
    if (end <= start) return 0
    const t = (scrollProgress - start) / (end - start)
    return Math.min(1, Math.max(0, t))
  }

  const headlineProgress = phase(0.02, 0.15)
  const negativesProgress = phase(0.15, 0.3)
  const finalResultsProgress = phase(0.4, 0.5)
  const underlineProgress = phase(0.1, 0.2)

  // liga o scrollYProgress do Framer no nosso scrollProgress
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

  // HERO BACKGROUND IMAGES
  const backgroundImages = [
    "/abstract-technology-digital-blue-gradient.jpg",
    "/abstract-technology-digital-blue-gradient-2.jpg",
    "/abstract-technology-digital-blue-gradient-3.jpg",
  ]

  const headline = "Your business deserves real digital presence."
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
                style={{
                  fontSize: "clamp(2.6rem, 5vw, 4.2rem)",
                  letterSpacing: "-0.035em",
                }}
              >
                {headlineWords.map((word, index) => {
                  const baseStyle = wordStyle(index)

                  if (word !== "deserves") {
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

                  // palavra com sublinhado animado
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

              {/* SUBTÍTULO */}
              <p
                className="mt-6 max-w-xl text-base sm:text-lg md:text-xl text-sky-100/90"
                style={{
                  opacity: negativesProgress,
                  transform: `translateY(${(1 - negativesProgress) * 12}px)`,
                  filter: `blur(${(1 - negativesProgress) * 6}px)`,
                  transition:
                    "opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1), transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), filter 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              >
                We build high-converting, modern websites for freelancers and
                small businesses that care about results, not just aesthetics.{" "}
                <span className="text-sky-200/95">
                  No bloated retainers, no overpriced agencies – just real work
                  that brings clients.
                </span>
              </p>
            </div>

            {/* BLOCO DA DIREITA – “NO BULLSHIT” */}
            <div className="mt-10 grid gap-6 md:mt-0 md:absolute md:right-0 md:top-1/2 md:flex md:-translate-y-1/2 md:flex-col md:items-end">
              <div
  className="max-w-sm rounded-2xl border border-red-400/40 bg-red-950/60 px-6 py-5 
             text-red-50 shadow-lg shadow-red-900/40 backdrop-blur-md space-y-2"
  style={{
    opacity: negativesProgress,
    transform: `translateY(${(1 - negativesProgress) * 18}px)`,
    transition:
      "opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
  }}
>
  <p className="text-lg sm:text-xl font-semibold leading-tight tracking-tight">
    No{" "}
    <span className="relative text-red-300 font-extrabold">
      <span className="relative z-10">complications</span>
      <span className="pointer-events-none absolute left-0 right-0 top-1/2 h-[2px] 
                       -translate-y-1/2 bg-red-400/90" />
    </span>
    .
  </p>

  <p className="text-lg sm:text-xl font-semibold leading-tight tracking-tight">
    No{" "}
    <span className="relative text-red-300 font-extrabold">
      <span className="relative z-10">absurd prices</span>
      <span className="pointer-events-none absolute left-0 right-0 top-1/2 h-[2px] 
                       -translate-y-1/2 bg-red-400/90" />
    </span>
    .
  </p>

  <p className="text-lg sm:text-xl font-semibold leading-tight tracking-tight">
    No{" "}
    <span className="relative text-red-300 font-extrabold">
      <span className="relative z-10">agency bullshit</span>
      <span className="pointer-events-none absolute left-0 right-0 top-1/2 h-[2px] 
                       -translate-y-1/2 bg-red-400/90" />
    </span>
    .
  </p>
</div>
            </div>
          </div>
        </div>

        {/* HERO OVERLAY – JUST REAL RESULTS */}
        <div
  className="pointer-events-none absolute inset-0 flex items-center justify-center z-20"
  style={{
    opacity: finalResultsProgress,
    transform: `scale(${0.9 + finalResultsProgress * 0.15}) translateY(${
      (1 - finalResultsProgress) * 30
    }px)`,
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
      </section>
    </div>
  )
}
