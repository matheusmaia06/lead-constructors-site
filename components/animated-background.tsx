'use client'

import { useEffect, useRef } from 'react'

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const setCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    setCanvasSize()
    window.addEventListener('resize', setCanvasSize)

    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      opacity: number
      color: string
      pulsePhase: number
    }> = []

    const colors = [
      'rgba(99, 102, 241, ',   // primary blue
      'rgba(96, 165, 250, ',   // light blue
      'rgba(59, 130, 246, ',   // sky blue
      'rgba(147, 197, 253, ',  // cyan
    ]

    const particleCount = 250
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.6 + 0.3,
        color: colors[Math.floor(Math.random() * colors.length)],
        pulsePhase: Math.random() * Math.PI * 2
      })
    }

    const orbs: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      opacity: number
      color: string
      pulseSpeed: number
    }> = []

    for (let i = 0; i < 12; i++) {
      orbs.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        size: Math.random() * 100 + 80,
        opacity: Math.random() * 0.2 + 0.05,
        color: colors[Math.floor(Math.random() * colors.length)],
        pulseSpeed: Math.random() * 0.02 + 0.01
      })
    }

    let animationFrameId: number
    let time = 0
    
    const animate = () => {
      time += 0.016
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      orbs.forEach((orb) => {
        orb.x += orb.vx
        orb.y += orb.vy

        if (orb.x < -orb.size) orb.x = canvas.width + orb.size
        if (orb.x > canvas.width + orb.size) orb.x = -orb.size
        if (orb.y < -orb.size) orb.y = canvas.height + orb.size
        if (orb.y > canvas.height + orb.size) orb.y = -orb.size

        const pulse = Math.sin(time * orb.pulseSpeed) * 0.3 + 1
        const currentSize = orb.size * pulse

        const gradient = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, currentSize)
        gradient.addColorStop(0, `${orb.color}${orb.opacity * pulse})`)
        gradient.addColorStop(0.5, `${orb.color}${orb.opacity * 0.5 * pulse})`)
        gradient.addColorStop(1, `${orb.color}0)`)
        
        ctx.beginPath()
        ctx.arc(orb.x, orb.y, currentSize, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()
      })

      particles.forEach((particle, i) => {
        particle.x += particle.vx
        particle.y += particle.vy
        particle.pulsePhase += 0.05

        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        const pulse = Math.sin(particle.pulsePhase) * 0.3 + 1
        const currentSize = particle.size * pulse
        const currentOpacity = particle.opacity * pulse

        ctx.shadowBlur = 12
        ctx.shadowColor = particle.color + currentOpacity + ')'
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, currentSize, 0, Math.PI * 2)
        ctx.fillStyle = `${particle.color}${currentOpacity})`
        ctx.fill()
        ctx.shadowBlur = 0

        particles.slice(i + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 250) {
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            const lineOpacity = 0.3 * (1 - distance / 250)
            ctx.strokeStyle = `${particle.color}${lineOpacity})`
            ctx.lineWidth = 2
            ctx.stroke()
          }
        })
      })

      animationFrameId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener('resize', setCanvasSize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 opacity-60"
      style={{ mixBlendMode: 'screen' }}
    />
  )
}
