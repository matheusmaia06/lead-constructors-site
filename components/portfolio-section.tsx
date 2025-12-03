"use client"

import { useState, useEffect } from "react"
import type React from "react"
import Image from "next/image"
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react"

type CaseItem = {
  id: string
  name: string
  url: string
  category: string
  summary: string
  impact: string
  image: string
  fit?: "cover" | "contain"
  country?: string
}

const caseStudies: CaseItem[] = [
  {
    id: "case-1",
    name: "Eats with Emily",
    url: "https://www.eatswithemily.com/",
    category: "Food & Lifestyle",
    summary:
      "Editorial-style food blog with a modern, cinematic layout and frictionless reading flow.",
    impact: "↑ 37% session time · ↑ 22% returning visitors",
    image: "/portfolio/emily-portrait.png",
    fit: "cover",
    country: "United States",
  },
  {
    id: "case-2",
    name: "Le Labo Fragrances",
    url: "https://www.lelabofragrances.eu/",
    category: "Luxury E-commerce",
    summary:
      "Premium fragrance experience with immersive product storytelling and high-converting product pages.",
    impact: "↑ 18% product-page conversion rate",
    image: "/portfolio/lelabo-banner.png",
    fit: "cover",
    country: "Europe",
  },
  {
    id: "case-3",
    name: "Platinum HVAC Florida",
    url: "https://platinumhvacflorida.com/",
    category: "Home Services",
    summary:
      "HVAC service brand repositioned with trust-focused UX, ultra-clear CTAs and mobile-first booking flows.",
    impact: "↑ 41% qualified leads from mobile visitors",
    image: "/portfolio/platinum-hvac.png",
    fit: "contain",
    country: "United States",
  },
  {
    id: "case-4",
    name: "Amrit Ocean Resort & Wellness Spa",
    url: "https://www.amritocean.com/wellness-spa/spa/",
    category: "Hospitality & Wellness",
    summary:
      "Luxury oceanfront spa presented with calm, spacious layouts and photography that sells relaxation before the first booking.",
    impact: "Designed to increase high-intent spa bookings.",
    image: "/portfolio/spaaor.jpg",
    fit: "cover",
    country: "United States",
  },
  {
    id: "case-5",
    name: "Fran's Chocolates",
    url: "https://frans.com/",
    category: "Luxury Confectionery",
    summary:
      "Digital flagship for an iconic chocolatier, blending warm photography with a gifting-focused buying journey.",
    impact: "Optimised to grow premium gift orders and repeat customers.",
    image: "/portfolio/francandy.jpg",
    fit: "cover",
    country: "United States",
  },
  {
    id: "case-6",
    name: "Chrome Industries",
    url: "https://chromeindustries.com/",
    category: "Streetwear & Gear",
    summary:
      "Urban gear brand with bold, lifestyle-led storefronts and fast product discovery built around real-world photography.",
    impact: "Built to push add-to-cart from high-intent visitors on mobile and desktop.",
    image: "/portfolio/kadet.webp",
    fit: "cover",
    country: "United States",
  },
  {
    id: "case-7",
    name: "Drive DeVilbiss Healthcare",
    url: "https://www.drivemedical.com/en-us/",
    category: "Medical Equipment",
    summary:
      "Product-first experience for a global healthcare equipment manufacturer, with clear filters and structured navigation.",
    impact: "Improved product discovery across multi-category medical SKUs.",
    image: "/portfolio/drivelogo.webp",
    fit: "contain",
    country: "United States",
  },
]

const ITEMS_PER_PAGE_DESKTOP = 3

export function PortfolioSection() {
  const [page, setPage] = useState(0)
  const [touchStartX, setTouchStartX] = useState<number | null>(null)

  const [direction, setDirection] = useState<"next" | "prev">("next")
  const [animState, setAnimState] = useState<"idle" | "enter">("idle")

  const [leftArrowPulse, setLeftArrowPulse] = useState(false)
  const [rightArrowPulse, setRightArrowPulse] = useState(false)

  const totalItems = caseStudies.length
  const totalPages = Math.max(
    1,
    Math.ceil(totalItems / ITEMS_PER_PAGE_DESKTOP),
  )

  const clampPage = (p: number) => Math.max(0, Math.min(totalPages - 1, p))

  const goPrev = () => {
    if (page === 0) return
    setDirection("prev")
    setPage(prev => clampPage(prev - 1))
    setLeftArrowPulse(true)
    setTimeout(() => setLeftArrowPulse(false), 550)
  }

  const goNext = () => {
    if (page === totalPages - 1) return
    setDirection("next")
    setPage(prev => clampPage(prev + 1))
    setRightArrowPulse(true)
    setTimeout(() => setRightArrowPulse(false), 550)
  }

  const goTo = (p: number) => {
    if (p === page) return
    setDirection(p > page ? "next" : "prev")
    setPage(clampPage(p))
  }

  // animação leve na troca de página
  useEffect(() => {
    setAnimState("enter")
    const id = requestAnimationFrame(() => {
      setAnimState("idle")
    })
    return () => cancelAnimationFrame(id)
  }, [page])

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchStartX(e.touches[0]?.clientX ?? null)
  }

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX === null) return
    const endX = e.changedTouches[0]?.clientX ?? touchStartX
    const deltaX = endX - touchStartX
    const threshold = 50

    if (deltaX > threshold) {
      goPrev()
    } else if (deltaX < -threshold) {
      goNext()
    }

    setTouchStartX(null)
  }

  const isLastPage = page === totalPages - 1

  const gridAnimClass =
    animState === "enter"
      ? direction === "next"
        ? "opacity-0 translate-x-4"
        : "opacity-0 -translate-x-4"
      : "opacity-100 translate-x-0"

  return (
    <section
      id="case-studies"
      className="relative w-full overflow-hidden py-20 sm:py-24"
    >
      {/* background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-background" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.12),transparent_55%),radial-gradient(circle_at_bottom,_rgba(34,197,94,0.10),transparent_55%)]" />
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-4 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/90 px-5 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Case studies</span>
            </div>

            <div>
              <h2 className="text-balance text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                Real projects.{" "}
                <span className="bg-gradient-to-r from-cyan-400 via-sky-500 to-emerald-400 bg-clip-text text-transparent">
                  Real business impact.
                </span>
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
                A rotating set of {totalItems} live projects. Browse through
                different industries without ever leaving this section.
              </p>
            </div>
          </div>

          <div className="flex items-end justify-between gap-4 md:flex-col md:items-end">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="font-semibold uppercase tracking-[0.22em]">
                SET {page + 1}
              </span>
              <span className="text-muted-foreground/70">
                of {totalPages} · {totalItems} cases total
              </span>
            </div>
            <div className="hidden gap-1 md:flex">
              {Array.from({ length: totalPages }).map((_, i) => {
                const isActive = i === page
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => goTo(i)}
                    className={`h-2.5 rounded-full transition-all ${
                      isActive
                        ? "w-6 bg-gradient-to-r from-primary via-cyan-400 to-emerald-400 shadow-[0_0_10px_rgba(45,212,191,0.8)]"
                        : "w-2.5 bg-border/70 hover:bg-border"
                    }`}
                    aria-label={`Go to set ${i + 1}`}
                  />
                )
              })}
            </div>
          </div>
        </div>

        {/* CARROSSEL + SETAS */}
        <div
          className="flex items-stretch gap-4"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* seta esquerda desktop */}
          <div className="hidden items-center md:flex">
            <button
              type="button"
              onClick={goPrev}
              disabled={page === 0}
              className={`arrow-ripple inline-flex h-12 w-12 items-center justify-center rounded-full border border-border/70 bg-background/95 text-muted-foreground shadow-[0_12px_30px_rgba(15,23,42,0.8)] backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-primary/70 hover:text-primary/90 disabled:cursor-not-allowed disabled:opacity-30 ${
                leftArrowPulse ? "arrow-ripple--active" : ""
              }`}
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
          </div>

          {/* TRACK */}
          <div className="relative flex-1 overflow-hidden">
            <div
              className={`flex w-full transform transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${gridAnimClass}`}
              style={{ transform: `translateX(-${page * 100}%)` }}
            >
              {Array.from({ length: totalPages }).map((_, pageIndex) => {
                const sliceStart = pageIndex * ITEMS_PER_PAGE_DESKTOP
                const slice = caseStudies.slice(
                  sliceStart,
                  sliceStart + ITEMS_PER_PAGE_DESKTOP,
                )
                const remainingSlots =
                  ITEMS_PER_PAGE_DESKTOP - slice.length

                return (
                  <div
                    key={pageIndex}
                    className="grid w-full flex-shrink-0 gap-5 md:grid-cols-3"
                  >
                    {slice.map((item, index) => (
                      <article
                        key={item.id}
                        className="group flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-background/90 shadow-[0_14px_45px_rgba(15,23,42,0.55)] transition-all hover:-translate-y-1.5 hover:border-primary/60 hover:bg-background hover:shadow-[0_20px_70px_rgba(15,23,42,0.85)]"
                      >
                        <div className="relative w-full overflow-hidden">
                          <div className="relative aspect-[4/3] w-full">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={`${item.name} website`}
                              fill
                              className={`transition-transform duration-700 group-hover:scale-[1.04] ${
                                item.fit === "contain"
                                  ? "object-contain bg-black"
                                  : "object-cover"
                              }`}
                              sizes="(min-width: 1024px) 20rem, 100vw"
                            />
                          </div>
                          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />

                          <div className="absolute inset-x-4 bottom-3 flex items-center justify-between gap-3">
                            <div className="space-y-1">
                              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-300">
                                Case{" "}
                                {String(sliceStart + index + 1).padStart(
                                  2,
                                  "0",
                                )}
                              </p>
                              <p className="text-xs font-medium text-slate-50 line-clamp-1">
                                {item.name}
                              </p>
                            </div>
                            <span className="rounded-full bg-white/95 px-3 py-1 text-[10px] font-semibold text-slate-900 shadow-sm">
                              View live
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-1 flex-col gap-2 px-4 pb-4 pt-3 sm:px-5 sm:pb-5">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                            {item.category}
                          </p>
                          <p className="text-sm text-foreground line-clamp-3">
                            {item.summary}
                          </p>
                          <p className="text-xs font-medium text-emerald-500/90">
                            {item.impact}
                          </p>

                          <div className="mt-auto pt-2">
                            <a
                              href={item.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-xs font-semibold text-primary transition-colors hover:text-primary/80"
                            >
                              <span>Open case</span>
                              <ExternalLink className="h-3.5 w-3.5" />
                            </a>
                          </div>
                        </div>
                      </article>
                    ))}

                    {/* BLOCO 150+ NO LUGAR DOS CASES 8/9 NA ÚLTIMA PÁGINA (DESKTOP) */}
                    {pageIndex === page &&
                      pageIndex === totalPages - 1 &&
                      remainingSlots > 0 && (
                        <div className="hidden md:flex md:col-span-2">
                          <div className="highlight-150-card relative flex w-full flex-col justify-center overflow-hidden rounded-2xl border border-border/70 bg-background/80 px-8 py-10 shadow-[0_14px_45px_rgba(15,23,42,0.45)]">
                            {/* glows de fundo */}
                            <div className="pointer-events-none absolute inset-0 opacity-70">
                              <div className="absolute -left-10 top-0 h-40 w-40 rounded-full bg-cyan-500/8 blur-3xl" />
                              <div className="absolute bottom-0 right-[-40px] h-44 w-44 rounded-full bg-emerald-400/8 blur-3xl" />
                            </div>

                            <div className="relative space-y-4">
                              <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-muted-foreground/80">
                                Global footprint
                              </p>

                              <p className="highlight-150-main text-base sm:text-lg md:text-xl font-semibold leading-relaxed">
                                <span className="bg-gradient-to-r from-cyan-400 via-sky-500 to-emerald-400 bg-clip-text text-transparent">
                                  150+ projects delivered across 5 countries —
                                  Canada, Spain, Brazil, the United States and
                                  the United Kingdom.
                                </span>
                              </p>

                              <div className="highlight-150-bar mt-1 h-[3px] w-32 rounded-full bg-gradient-to-r from-cyan-400 via-sky-500 to-emerald-400 shadow-[0_0_14px_rgba(56,189,248,0.85)]" />

                              <p className="max-w-xl text-xs sm:text-sm text-muted-foreground leading-relaxed">
                                From boutique brands to global teams, we design
                                experiences that travel well.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* seta direita desktop */}
          <div className="hidden items-center md:flex">
            <button
              type="button"
              onClick={goNext}
              disabled={page === totalPages - 1}
              className={`arrow-ripple inline-flex h-12 w-12 items-center justify-center rounded-full border border-border/70 bg-background/95 text-muted-foreground shadow-[0_12px_30px_rgba(15,23,42,0.8)] backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-primary/70 hover:text-primary/90 disabled:cursor-not-allowed disabled:opacity-30 ${
                rightArrowPulse ? "arrow-ripple--active" : ""
              }`}
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* HIGHLIGHT 150+ – MOBILE / TABLET */}
        <div
          className={`mx-auto mt-6 max-w-3xl text-center transition-all duration-600 ease-out md:hidden ${
            isLastPage
              ? "opacity-100 translate-y-0"
              : "pointer-events-none opacity-0 translate-y-2"
          }`}
        >
          <p className="highlight-150-main text-base sm:text-lg font-semibold leading-relaxed">
            <span className="bg-gradient-to-r from-cyan-400 via-sky-500 to-emerald-400 bg-clip-text text-transparent">
              150+ projects delivered across 5 countries — Canada, Spain,
              Brazil, the United States and the United Kingdom.
            </span>
          </p>

          <div className="highlight-150-bar mx-auto mt-2 h-[3px] w-28 rounded-full bg-gradient-to-r from-cyan-400 via-sky-500 to-emerald-400 shadow-[0_0_12px_rgba(56,189,248,0.85)]" />

          <p className="mt-3 text-xs sm:text-sm text-muted-foreground leading-relaxed">
            From boutique brands to global teams, we design experiences that
            travel well.
          </p>
        </div>

        {/* navegação mobile */}
        <div className="mt-4 flex items-center justify-center gap-4 md:hidden">
          <button
            type="button"
            onClick={goPrev}
            disabled={page === 0}
            className={`arrow-ripple inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/70 bg-background/95 text-muted-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/70 hover:text-primary/90 disabled:cursor-not-allowed disabled:opacity-30 ${
              leftArrowPulse ? "arrow-ripple--active" : ""
            }`}
          >
            <ArrowLeft className="h-4 w-4" />
          </button>

          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }).map((_, i) => {
              const isActive = i === page
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => goTo(i)}
                  className={`h-2.5 rounded-full transition-all ${
                    isActive
                      ? "w-6 bg-gradient-to-r from-primary via-cyan-400 to-emerald-400 shadow-[0_0_10px_rgba(45,212,191,0.8)]"
                      : "w-2.5 bg-border/70 hover:bg-border"
                  }`}
                  aria-label={`Go to set ${i + 1}`}
                />
              )
            })}
          </div>

          <button
            type="button"
            onClick={goNext}
            disabled={page === totalPages - 1}
            className={`arrow-ripple inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/70 bg-background/95 text-muted-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/70 hover:text-primary/90 disabled:cursor-not-allowed disabled:opacity-30 ${
              rightArrowPulse ? "arrow-ripple--active" : ""
            }`}
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* estilos locais */}
      <style jsx>{`
        .arrow-ripple {
          position: relative;
          overflow: visible;
        }
        .arrow-ripple::after {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 9999px;
          border: 1px solid rgba(10, 170, 238, 0.55);
          opacity: 0;
          transform: scale(1);
          pointer-events: none;
        }
        .arrow-ripple--active::after {
          animation: arrowRipple 0.55s ease-out;
        }
        @keyframes arrowRipple {
          0% {
            transform: scale(1);
            opacity: 0.6;
          }
          100% {
            transform: scale(1.8);
            opacity: 0;
          }
        }

        .highlight-150-card {
          position: relative;
        }

        .highlight-150-main {
          opacity: 0;
          transform: translateY(6px);
          animation: highlightTextFade 0.7s ease-out forwards;
        }

        .highlight-150-bar {
          transform-origin: left center;
          transform: scaleX(0);
          animation: highlightBarGrow 0.85s 0.15s ease-out forwards;
        }

        @keyframes highlightTextFade {
          0% {
            opacity: 0;
            transform: translateY(6px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes highlightBarGrow {
          0% {
            transform: scaleX(0);
          }
          100% {
            transform: scaleX(1);
          }
        }
      `}</style>
    </section>
  )
}
