"use client"

import { useEffect, useRef, useState } from "react"

export function useScrollFade(offset = 100) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true)
      },
      { threshold: 0.2 }
    )

    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return {
    ref,
    className: `
      transition-all duration-[1.3s]
      ease-[cubic-bezier(0.22,1,0.36,1)]
      ${visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-95"}
    `
  }
}
