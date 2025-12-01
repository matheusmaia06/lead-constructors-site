"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"

function useRevealOnScroll(threshold = 0.2) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setVisible(true)
        })
      },
      { threshold },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, visible }
}

const makeWordStyle =
  (visible: boolean) =>
  (index: number): React.CSSProperties => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0px)" : "translateY(18px)",
    filter: visible ? "blur(0px)" : "blur(6px)",
    transition:
      "opacity 0.5s cubic-bezier(0.16,1,0.3,1), transform 0.5s cubic-bezier(0.16,1,0.3,1), filter 0.5s cubic-bezier(0.16,1,0.3,1)",
    transitionDelay: visible ? `${index * 70}ms` : "0ms",
    display: "inline-block",
    marginRight: "0.35em",
  })

export function RealResultsHeading() {
  const { ref, visible } = useRevealOnScroll(0.35)
  const styleFor = makeWordStyle(visible)

  const line1 = "Real Results"
  const line2 = "Real Growth"

  const words1 = line1.split(" ")
  const words2 = line2.split(" ")

  return (
    <div ref={ref} className="space-y-2">
      <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight">
        {words1.map((w, i) => (
          <span key={`${w}-${i}`} style={styleFor(i)}>
            {w}
          </span>
        ))}
      </div>
      <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-sky-500">
        {words2.map((w, i) => (
          <span key={`${w}-${i}`} style={styleFor(words1.length + i)}>
            {w}
          </span>
        ))}
      </div>
      <p className="mt-4 max-w-xl text-base sm:text-lg text-muted-foreground">
        Real projects shipped, measurable impact on leads and revenue, and a web presence
        that finally looks like the quality of your work.
      </p>
    </div>
  )
}
