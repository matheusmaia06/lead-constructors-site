"use client"

import * as React from "react"
import { motion } from "framer-motion"

type FancySectionTitleProps = {
  children: React.ReactNode
  className?: string
}

export function FancySectionTitle({ children, className }: FancySectionTitleProps) {
  // garante string
  const text =
    typeof children === "string"
      ? children
      : React.Children.toArray(children).join(" ")

  const chars = Array.from(text)

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }} // começa cedo no scroll
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      <div className="relative inline-block">
        {/* TÍTULO – FONTE GRANDE, COR FIXA */}
        <span
          className={[
            "relative inline-block font-semibold tracking-tight",
            "text-3xl sm:text-4xl md:text-5xl lg:text-6xl",
            "text-sky-300 drop-shadow-[0_0_18px_rgba(56,189,248,0.55)]",
          ].join(" ")}
        >
          {chars.map((ch, index) => {
            if (ch === " ") {
              return (
                <span key={index} className="inline-block mx-[0.18em]">
                  {" "}
                </span>
              )
            }

            return (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  duration: 0.4,
                  ease: [0.16, 1, 0.3, 1],
                  delay: index * 0.03, // efeito cascata
                }}
                className="inline-block"
              >
                {ch}
              </motion.span>
            )
          })}
        </span>

        {/* UNDERLINE NEON */}
        <motion.span
          className="pointer-events-none absolute left-0 right-0 -bottom-2 h-[3px] rounded-full"
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{
            duration: 0.5,
            delay: chars.length * 0.03 - 0.1,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{
            transformOrigin: "left center",
            background:
              "linear-gradient(90deg, #1FA2FF, #12D8FA, #A6FFCB)",
            boxShadow:
              "0 0 12px rgba(56,189,248,0.9), 0 0 26px rgba(56,189,248,0.65)",
          }}
        />
      </div>
    </motion.div>
  )
}
