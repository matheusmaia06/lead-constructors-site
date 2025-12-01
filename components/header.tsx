"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"

const HERO_PIN_MULTIPLIER = 8

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [showHeader, setShowHeader] = useState(false)
  const [pageProgress, setPageProgress] = useState(0)

  // baseline de scroll quando o header aparece pela primeira vez
  const [baselineScroll, setBaselineScroll] = useState<number | null>(null)

  const links = [
    { label: "About", href: "#benefits" },
    { label: "Solutions", href: "#services" },
    { label: "Work", href: "#portfolio" },
    { label: "Process", href: "#process" },
    { label: "FAQ", href: "#faq" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const heroDistance = window.innerHeight * HERO_PIN_MULTIPLIER

      const heroProgress = Math.min(scrollY / heroDistance, 1)
      const shouldShowHeader = heroProgress >= 0.9

      setShowHeader(shouldShowHeader)
      setScrolled(scrollY > heroDistance * 0.95)

      // quando o header for mostrado pela primeira vez, travamos o baseline
      if (shouldShowHeader) {
        setBaselineScroll((prev) => (prev === null ? scrollY : prev))
      } else {
        // se voltar pro topo/hero, resetamos
        setBaselineScroll(null)
      }

      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight

      if (!shouldShowHeader || docHeight <= 0 || baselineScroll === null) {
        setPageProgress(0)
        return
      }

      const effectiveBaseline = baselineScroll

      if (scrollY <= effectiveBaseline) {
        setPageProgress(0)
      } else {
        const remainingScrollable = Math.max(docHeight - effectiveBaseline, 1)
        const adjustedScroll = scrollY - effectiveBaseline
        const progress = Math.min(adjustedScroll / remainingScrollable, 1)
        setPageProgress(progress)
      }
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll)
    window.addEventListener("resize", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleScroll)
    }
  }, [baselineScroll])

  const scrollToSection = (href: string) => {
    const target = document.querySelector(href)
    if (!target) return

    const headerOffset = 80
    const rect = target.getBoundingClientRect()
    const offsetTop = rect.top + window.scrollY - headerOffset

    window.scrollTo({
      top: offsetTop,
      behavior: "smooth",
    })
  }

  const baseClasses =
    "fixed left-0 right-0 top-0 z-40 transition-colors duration-500"
  const visibilityClasses = showHeader
    ? "pointer-events-auto"
    : "pointer-events-none"

  const styleClasses = scrolled
    ? "bg-[#020817]/98 backdrop-blur-lg border-b border-sky-500/15 shadow-[0_16px_40px_rgba(0,0,0,0.85)]"
    : "bg-gradient-to-b from-[#020b1f]/95 via-[#020818]/92 to-[#020817]/90 backdrop-blur-md border-b border-sky-500/10"

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={
        showHeader
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y: -16 }
      }
      transition={{ duration: 0.45, ease: "easeOut" }}
      className={[baseClasses, visibilityClasses, styleClasses].join(" ")}
    >
      {/* Barra de progresso */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[1.5px] bg-transparent">
        <div
          className="h-full origin-left bg-gradient-to-r from-sky-500 via-cyan-400 to-emerald-400 transition-transform duration-150"
          style={{ transform: `scaleX(${pageProgress})` }}
        />
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* LOGO DESTACADA */}
        <button
          type="button"
          onClick={() => scrollToSection("#top")}
          className="group relative flex items-center"
        >
          {/* Glow */}
          <div className="absolute -inset-3 rounded-2xl bg-[radial-gradient(circle_at_center,rgba(45,212,191,0.5),transparent_60%)] opacity-60 blur-xl group-hover:opacity-90 group-hover:blur-[38px] transition-all" />

          {/* Logo */}
          <div className="relative h-12 w-12 sm:h-14 sm:w-14">
            <Image
              src="/lead-constructors-logo.png"
              alt="Lead Constructors"
              fill
              sizes="60px"
              className="object-contain drop-shadow-[0_0_22px_rgba(56,189,248,0.95)] group-hover:drop-shadow-[0_0_32px_rgba(56,189,248,1)] transition-all"
            />
          </div>
        </button>

        {/* NAV DESKTOP */}
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((item) => (
            <button
              key={item.href}
              type="button"
              onClick={() => scrollToSection(item.href)}
              className="group relative text-sm font-medium text-slate-100/90 hover:text-teal-300 transition-colors"
            >
              <span>{item.label}</span>
              <span className="pointer-events-none absolute inset-x-0 -bottom-1 h-px origin-center scale-x-0 bg-gradient-to-r from-sky-500 via-cyan-400 to-emerald-400 transition-transform duration-200 group-hover:scale-x-100" />
            </button>
          ))}

          <Button
            type="button"
            className="relative overflow-hidden rounded-full bg-gradient-to-r from-sky-500 via-cyan-400 to-emerald-400 px-5 text-sm font-semibold text-slate-950 shadow-lg shadow-sky-500/35 transition-all hover:-translate-y-[1px] hover:shadow-sky-400/50"
            onClick={() => scrollToSection("#cta")}
          >
            <span className="relative z-10">Get Started</span>
          </Button>
        </nav>

        {/* HAMBURGUER MOBILE */}
        <button
          className="inline-flex items-center justify-center rounded-full border border-slate-700/70 bg-slate-900/70 p-2 text-slate-100 shadow-sm hover:bg-slate-800/90 md:hidden"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>

        {/* MENU MOBILE */}
        {isOpen && (
          <div className="absolute inset-x-4 top-[3.25rem] z-40 rounded-2xl border border-slate-700/80 bg-[#020818]/98 p-4 shadow-2xl shadow-black/80 md:hidden">
            <nav className="flex flex-col gap-2">
              {links.map((item) => (
                <button
                  key={item.href}
                  type="button"
                  onClick={() => {
                    scrollToSection(item.href)
                    setIsOpen(false)
                  }}
                  className="rounded-xl px-3 py-2 text-sm font-medium text-slate-100 hover:bg-slate-900/80 hover:text-teal-300 transition-colors text-left"
                >
                  {item.label}
                </button>
              ))}

              <Button
                type="button"
                className="mt-3 w-full rounded-full bg-gradient-to-r from-sky-500 via-cyan-400 to-emerald-400 text-sm font-semibold"
                onClick={() => {
                  scrollToSection("#cta")
                  setIsOpen(false)
                }}
              >
                Get Started
              </Button>
            </nav>
          </div>
        )}
      </div>
    </motion.header>
  )
}
