"use client"

import { useMotionValue, useTransform, motion } from "framer-motion"
import { ReactNode } from "react"

export function MouseParallax({ children }: { children: ReactNode }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useTransform(y, [-0.5, 0.5], ["10deg", "-10deg"])
  const rotateY = useTransform(x, [-0.5, 0.5], ["-10deg", "10deg"])

  return (
    <motion.div
      onMouseMove={(e) => {
        const { clientX, clientY, currentTarget } = e
        const rect = currentTarget.getBoundingClientRect()
        const px = (clientX - rect.left) / rect.width - 0.5
        const py = (clientY - rect.top) / rect.height - 0.5
        x.set(px)
        y.set(py)
      }}
      style={{ rotateX, rotateY }}
      transition={{ type: "spring", stiffness: 80, damping: 15 }}
      className="will-change-transform"
    >
      {children}
    </motion.div>
  )
}
