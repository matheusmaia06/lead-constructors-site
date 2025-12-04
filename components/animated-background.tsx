"use client"

import { useEffect, useRef } from "react"

interface Orb {
  x: number
  y: number
  radius: number
  dx: number
  dy: number
  hue: number
  alpha: number
}

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  pulsePhase: number
  baseAlpha: number
}

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const setCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1
      const { innerWidth, innerHeight } = window

      canvas.width = innerWidth * dpr
      canvas.height = innerHeight * dpr
      canvas.style.width = `${innerWidth}px`
      canvas.style.height = `${innerHeight}px`

      // Normaliza o sistema de coordenadas para 1:1 com CSS pixels
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    setCanvasSize()
    window.addEventListener("resize", setCanvasSize)

    const isMobile = window.innerWidth < 768
    const prefersReducedMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const ORB_COUNT = prefersReducedMotion ? 0 : isMobile ? 6 : 10
    const PARTICLE_COUNT = prefersReducedMotion ? 12 : isMobile ? 28 : 56

    const orbs: Orb[] = []
    const particles: Particle[] = []

    const randomInRange = (min: number, max: number) =>
      Math.random() * (max - min) + min

    // Orbs grandes, neon
    for (let i = 0; i < ORB_COUNT; i++) {
      orbs.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        radius: randomInRange(120, 260),
        dx: randomInRange(-0.08, 0.08),
        dy: randomInRange(-0.06, 0.06),
        hue: randomInRange(180, 210), // entre ciano e azul
        alpha: randomInRange(0.06, 0.16),
      })
    }

    // Partículas pequenas
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: randomInRange(-0.12, 0.12),
        vy: randomInRange(-0.12, 0.12),
        size: randomInRange(1, 2.5),
        pulsePhase: Math.random() * Math.PI * 2,
        baseAlpha: randomInRange(0.25, 0.6),
      })
    }

    let animationFrameId: number
    let lastTime = performance.now()

    const render = (time: number) => {
      const delta = time - lastTime
      lastTime = time

      // Em devices mais fracos, se der um "pulo" muito grande, suaviza
      const dt = Math.min(delta, 40)

      const width = window.innerWidth
      const height = window.innerHeight

      ctx.clearRect(0, 0, width, height)

      // Orbs neon
      orbs.forEach(orb => {
        orb.x += orb.dx * dt
        orb.y += orb.dy * dt

        if (orb.x + orb.radius < 0) orb.x = width + orb.radius
        if (orb.x - orb.radius > width) orb.x = -orb.radius
        if (orb.y + orb.radius < 0) orb.y = height + orb.radius
        if (orb.y - orb.radius > height) orb.y = -orb.radius

        const gradient = ctx.createRadialGradient(
          orb.x,
          orb.y,
          0,
          orb.x,
          orb.y,
          orb.radius
        )

        gradient.addColorStop(
          0,
          `hsla(${orb.hue}, 100%, 70%, ${orb.alpha * 1.1})`
        )
        gradient.addColorStop(
          0.4,
          `hsla(${orb.hue}, 100%, 60%, ${orb.alpha})`
        )
        gradient.addColorStop(
          1,
          `hsla(${orb.hue}, 100%, 50%, 0)`
        )

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2)
        ctx.fill()
      })

      // Partículas / estrelas
      particles.forEach(p => {
        p.x += p.vx * dt * 0.03
        p.y += p.vy * dt * 0.03
        p.pulsePhase += 0.03

        if (p.x < 0) p.x = width
        if (p.x > width) p.x = 0
        if (p.y < 0) p.y = height
        if (p.y > height) p.y = 0

        const pulse = Math.sin(p.pulsePhase) * 0.4 + 1
        const currentSize = p.size * pulse
        const alpha = p.baseAlpha * (0.5 + 0.5 * pulse)

        ctx.beginPath()
        ctx.fillStyle = `rgba(180, 230, 255, ${alpha})`
        ctx.arc(p.x, p.y, currentSize, 0, Math.PI * 2)
        ctx.fill()
      })

      animationFrameId = window.requestAnimationFrame(render)
    }

    animationFrameId = window.requestAnimationFrame(render)

    return () => {
      window.removeEventListener("resize", setCanvasSize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 opacity-60"
      style={{ mixBlendMode: "screen" }}
      aria-hidden="true"
    />
  )
}
