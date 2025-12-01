"use client"

import { useEffect, useRef, useState } from "react"

type RevealHeadingProps = {
  text: string
  className?: string
}

/**
 * Heading com efeito de letras surgindo com blur + suavidade,
 * parecido com o da hero, mas dispara quando entra na tela.
 */
export function RevealHeading({ text, className = "" }: RevealHeadingProps) {
  const [revealProgress, setRevealProgress] = useState(0)
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    let animationFrame: number | null = null
    let startTime: number | null = null

    const duration = 900 // ms

    const step = (timestamp: number) => {
      if (startTime === null) startTime = timestamp
      const elapsed = timestamp - startTime
      const t = Math.min(1, elapsed / duration)

      // easing cúbico suave
      const eased = t < 0.5
        ? 4 * t * t * t
        : 1 - Math.pow(-2 * t + 2, 3) / 2

      setRevealProgress(eased)

      if (t < 1) {
        animationFrame = requestAnimationFrame(step)
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // começa animação
          if (animationFrame === null) {
            animationFrame = requestAnimationFrame(step)
          }
        }
      },
      { threshold: 0.3 },
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
      if (animationFrame !== null) cancelAnimationFrame(animationFrame)
    }
  }, [])

  const characters = text.split("")

  const totalChars = characters.length
  const fadeWindow = 3

  const getOpacity = (charIndex: number) => {
    const visibleChars = revealProgress * totalChars
    const charProgress = (visibleChars - charIndex) / fadeWindow

    if (charProgress <= 0) return 0
    if (charProgress >= 1) return 1

    // mesmo easing local por letra
    return charProgress < 0.5
      ? 4 * charProgress * charProgress * charProgress
      : 1 - Math.pow(-2 * charProgress + 2, 3) / 2
  }

  return (
    <div
      ref={ref}
      className={`font-bold leading-[1.15] text-left word-mask ${className}`}
      style={{
        fontSize: "clamp(2.1rem, 4vw, 3rem)",
        fontWeight: 700,
        letterSpacing: "-0.03em",
      }}
    >
      {characters.map((char, index) => {
        const opacity = getOpacity(index)

        return (
          <span
            key={index}
            className="inline-block"
            style={{
              opacity,
              transform: `translateY(${(1 - opacity) * 10}px)`,
              filter: `blur(${(1 - opacity) * 4}px)`,
              transition:
                "opacity 0.2s cubic-bezier(0.16, 1, 0.3, 1), transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), filter 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        )
      })}
    </div>
  )
}
