"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

type FancySectionTitleProps = {
  children: ReactNode
  duration?: number
  className?: string
}

export function FancySectionTitle({
  children,
  duration = 2,
  className = "",
}: FancySectionTitleProps) {
  const baseDuration = duration || 2

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: baseDuration * 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={`relative inline-flex items-center justify-center ${className}`}
    >
      {/* Cápsula/contorno atrás do texto */}
      <motion.div
        className="absolute inset-0 rounded-full pointer-events-none"
        initial={{ opacity: 0, scaleY: 0.2 }}
        animate={{ opacity: 1, scaleY: 1 }}
        transition={{
          delay: baseDuration * 0.35,
          duration: baseDuration * 0.45,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {/* Borda em gradiente (parece caro) */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/70 via-primary/40 to-accent/70 opacity-80" />
        {/* Fundo interno levemente translúcido pra não matar o background */}
        <div className="absolute inset-[1.5px] rounded-full bg-background/80 backdrop-blur-sm" />
      </motion.div>

      {/* Underline que desenha antes da cápsula ficar óbvia */}
      <motion.div
        className="absolute left-4 right-4 bottom-1 h-[2px] rounded-full bg-gradient-to-r from-primary via-primary/80 to-accent origin-center"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{
          delay: baseDuration * 0.15,
          duration: baseDuration * 0.4,
          ease: [0.16, 1, 0.3, 1],
        }}
      />

      {/* Glow bem sutil pra dar “luxo” */}
      <motion.div
        className="absolute inset-0 rounded-full pointer-events-none blur-xl bg-gradient-to-r from-primary/40 via-primary/0 to-accent/40"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: [0, 0.6, 0], scale: [0.9, 1.02, 1] }}
        transition={{
          delay: baseDuration * 0.5,
          duration: baseDuration * 0.7,
          ease: "easeOut",
        }}
      />

      {/* Texto em cima de tudo */}
      <span className="relative z-10 px-6 py-2 text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/90 to-accent">
          {children}
        </span>
      </span>
    </motion.div>
  )
}