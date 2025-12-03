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
  const [isMobile, setIsMobile] = useState(false)

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
    const updateIsMobile = () => {
      if (typeof window === "undefined") return
      setIsMobile(window.innerWidth < 768)
    }

    updateIsMobile()
    window.addEventListener("resize", updateIsMobile)
    return () => window.removeEventListener("resize", updateIsMobile)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight

      if (isMobile) {
        // No mobile, o header fica sempre visível e usamos um progresso simples da página toda
        setShowHeader(true)
        setScrolled(scrollY > 16)

        if (docHeight > 0) {
          setPageProgress(Math.min(scrollY / docHeight, 1))
        } else {
          setPageProgress(0)
        }

        return
      }

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
  }, [baselineScroll, isMobile])

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
    : "pointer-events-none opacity-0 -translate-y-4"
  const scrolledClasses = scrolled
    ? "bg-slate-950/90 backdrop-blur-xl border-b border-slate-800/60 shadow-lg shadow-slate-900/60"
    : "bg-gradient-to-b from-slate-950/80 via-slate-950/30 to-transparent border-b border-transparent"

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={showHeader ? { opacity: 1, y: 0 } : { opacity: 0, y: -16 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`${baseClasses} ${visibilityClasses} ${scrolledClasses}`}
    >
      <div className="mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
{/* Logo – full wordmark, no extra text */}
{/* Logo – full width, much larger */}
<button
  type="button"
  onClick={() => scrollToSection("#top")}
  className="flex items-center"
>
  <div className="relative h-[42px] sm:h-[48px] w-[240px] sm:w-[300px]">
    <Image
      src="/lead-constructors-logo-3.png"
      alt="Lead Constructors"
      fill
      className="object-contain"
      priority
    />
  </div>
</button>



        {/* Navegação desktop */}
        <nav className="hidden md:flex items-center gap-8 text-sm">
          {links.map((link) => (
            <button
              key={link.href}
              type="button"
              onClick={() => scrollToSection(link.href)}
              className="text-slate-200/80 hover:text-sky-300 transition-colors"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* CTA desktop */}
        <div className="hidden md:flex items-center gap-3">
          <Button
            size="sm"
            variant="outline"
            className="border-slate-700/70 bg-slate-950/70 text-slate-100 hover:bg-slate-900"
            onClick={() => scrollToSection("#portfolio")}
          >
            View Work
          </Button>
<Button
  size="sm"
  className="group relative overflow-hidden rounded-full bg-gradient-to-r from-sky-500 via-cyan-400 to-emerald-400 px-5 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-sky-500/40 transition-all hover:-translate-y-[1px] hover:shadow-sky-400/60"
  onClick={() => scrollToSection("#cta")}
>
  <span className="relative z-10">Get Started</span>
  <span className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-sky-400 via-cyan-300 to-emerald-300" />
</Button>

        </div>

        {/* Botão menu mobile */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full border border-slate-700/80 bg-slate-950/80 p-2 text-slate-100 hover:bg-slate-900 md:hidden"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Progress bar */}
      <div className="h-0.5 w-full bg-slate-900/80">
        <div
          className="h-full bg-gradient-to-r from-sky-500 via-cyan-400 to-emerald-400 transition-all duration-300"
          style={{ width: `${pageProgress * 100}%` }}
        />
      </div>

      {/* Menu mobile */}
      {isOpen && (
        <div className="border-t border-slate-800/70 bg-slate-950/95 backdrop-blur-xl md:hidden">
          <div className="mx-auto flex flex-col gap-2 px-4 py-3 sm:px-6 lg:px-8">
            {links.map((link) => (
              <button
                key={link.href}
                type="button"
                onClick={() => {
                  scrollToSection(link.href)
                  setIsOpen(false)
                }}
                className="w-full rounded-lg px-3 py-2 text-left text-sm text-slate-100 hover:bg-slate-900/80"
              >
                {link.label}
              </button>
            ))}
            <Button
              className="mt-3 w-full rounded-full bg-gradient-to-r from-sky-500 via-cyan-400 to-emerald-400 text-sm font-semibold"
              onClick={() => {
                scrollToSection("#cta")
                setIsOpen(false)
              }}
            >
              Get Started
            </Button>
          </div>
        </div>
      )}
    </motion.header>
  )
}
