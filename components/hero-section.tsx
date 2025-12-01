"use client"

import { useEffect, useRef, useState } from "react"
import type React from "react"
import { AnimatedBackground } from "./animated-background"

const PIN_MULTIPLIER = 9 // hero pinado por 14x a altura do viewport

export function HeroSection() {
  const [currentImage, setCurrentImage] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const containerRef = useRef<HTMLDivElement | null>(null)

  // HERO BACKGROUND IMAGES
  const backgroundImages = [
    "/abstract-technology-digital-blue-gradient.jpg",
    "/modern-architecture-geometric-pattern.jpg",
    "/futuristic-network-connections-data.jpg",
  ]

  // MAPEAR SCROLL -> PROGRESSO (0–1)
  const phase = (start: number, end: number) => {
    if (end <= start) return 0
    const t = (scrollProgress - start) / (end - start)
    return Math.min(1, Math.max(0, t))
  }

  // FASES DE ANIMAÇÃO
  const headlineProgress = phase(0.02, 0.15)       // headline da esquerda
  const negativesProgress = phase(0.15, 0.30)    // frases negativas
  const finalResultsProgress = phase(0.3, 0.50)  // JUST REAL RESULTS
  const underlineProgress = phase(0.1, 0.20)     // underline neon "deserves"

  // ATUALIZA PROGRESSO COM O SCROLL
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return
      const scrollY = window.scrollY
      const scrollDistance = window.innerHeight * PIN_MULTIPLIER
      const progress = Math.min(scrollY / scrollDistance, 1)
      setScrollProgress(progress)
    }

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("resize", handleScroll)
    handleScroll()

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleScroll)
    }
  }, [])

  // CROSSFADE SUAVE DO BACKGROUND
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage(prev => (prev + 1) % backgroundImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [backgroundImages.length])

  // HERO HEADLINE – palavra a palavra
  const headline = "Your business deserves real digital presence."
  const headlineWords = headline.split(" ")

  const wordStyle = (index: number): React.CSSProperties => {
    const total = headlineWords.length
    const base = headlineProgress * (total + 1.5)
    const diff = base - index
    const p = Math.min(1, Math.max(0, diff))

    // easing cúbico suave
    const eased = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2

    return {
      opacity: eased,
      transform: `translateY(${(1 - eased) * 20}px)`,
      filter: `blur(${(1 - eased) * 7}px)`,
      transition: "opacity 0.2s, transform 0.2s, filter 0.2s",
    }
  }

  // HERO WRAPPER (PINADO)
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
        {/* HERO BACKGROUND */}
{/* BACKGROUND GIF */}
<img
  src="https://i.pinimg.com/originals/b2/ad/fe/b2adfef979e22b3ee6d7fb8df41c80ee.gif"
  className="absolute inset-0 w-full h-full object-cover"
  style={{
    opacity: 0.22, // mesmo nível das imagens anteriores
  }}
/>


        <AnimatedBackground />
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/90 via-secondary/80 to-primary/30" />

        {/* HERO MAIN CONTENT (fade out quando entra JUST REAL RESULTS) */}
        <div
          className="container relative z-10 mx-auto flex h-full items-center px-4 sm:px-6 lg:px-8"
          style={{
            opacity: 1 - finalResultsProgress,
            transform: `scale(${1 - finalResultsProgress * 0.04})`,
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
                    // palavra normal
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

                  // palavra "deserves" com underline neon
                  return (
                    <span
                      key={index}
                      style={baseStyle}
                      className="inline-block mr-2 relative"
                    >
                      {word}
                      <span
                        className="pointer-events-none absolute left-0 right-0"
                        style={{
                          bottom: "-0.05em",
                          height: "3px",
                          borderRadius: "999px",
                          background:
                            "linear-gradient(90deg, #1FA2FF, #12D8FA, #A6FFCB)",
                          boxShadow:
                            "0 0 10px rgba(56, 189, 248, 0.9), 0 0 20px rgba(56, 189, 248, 0.7)",
                          transform: `scaleX(${underlineProgress})`,
                          transformOrigin: "left center",
                          opacity: underlineProgress,
                          transition:
                            "transform 0.1s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s cubic-bezier(0.04, 1, 0.3, 1)",
                        }}
                      />
                    </span>
                  )
                })}
              </h1>
            </div>

            {/* HERO NEGATIVE TEXT (DIREITA) */}
            <div
              className="hidden md:flex flex-col gap-4 absolute right-[10%] top-[26%] text-xl md:text-2xl font-medium text-white/90"
              style={{
                opacity: negativesProgress,
                transform: `translateY(${30 * (1 - negativesProgress)}px)`,
                transition:
                  "opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              <p>
                No{" "}
                <span className="relative font-semibold text-red-400">
                  <span className="relative z-10">complications</span>
                  <span className="pointer-events-none absolute left-0 right-0 top-1/2 h-[2px] -translate-y-1/2 bg-red-400/90" />
                </span>
                .
              </p>
              <p>
                No{" "}
                <span className="relative font-semibold text-red-400">
                  <span className="relative z-10">absurd prices</span>
                  <span className="pointer-events-none absolute left-0 right-0 top-1/2 h-[2px] -translate-y-1/2 bg-red-400/90" />
                </span>
                .
              </p>
            </div>
          </div>
        </div>

        {/* HERO OVERLAY – JUST REAL RESULTS (AZUL VIBRANTE) */}
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
          <h2
            className="text-center font-extrabold leading-tight uppercase"
            style={{
              letterSpacing: "0.5em",
            }}
          >
            <span
              className="block"
              style={{
                fontSize: "clamp(3.4rem, 6.4vw, 5.6rem)",
                backgroundImage:
                  "linear-gradient(90deg, #1FA2FF, #12D8FA, #A6FFCB)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                textShadow: `
                  0 0 20px rgba(56, 189, 248, 0.95),
                  0 0 40px rgba(56, 189, 248, 0.65)
                `,
                filter: `blur(${(1 - finalResultsProgress) * 3}px)`,
              }}
            >
              JUST&nbsp;REAL&nbsp;RESULTS.
            </span>
          </h2>
        </div>
      </section>
    </div>
  )
}
