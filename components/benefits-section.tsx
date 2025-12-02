"use client"

import { CheckCircle2, Clock, Globe2, ShieldCheck } from "lucide-react"

const benefits = [
  {
    icon: CheckCircle2,
    title: "Websites that actually sell",
    description:
      "Every layout, copy block and interaction is designed to turn visitors into leads and paying clients.",
  },
  {
    icon: Clock,
    title: "Fast, predictable delivery",
    description:
      "Most projects are delivered in days, not months — with a clear timeline and zero agency drama.",
  },
  {
    icon: ShieldCheck,
    title: "End-to-end done for you",
    description:
      "Domain, hosting, integrations and technical setup handled from start to finish. You just approve and go live.",
  },
  {
    icon: Globe2,
    title: "Modern, premium look",
    description:
      "Clean, professional design that makes your brand look trustworthy and expensive without absurd prices.",
  },
]

export function BenefitsSection() {
  return (
    <section
      id="benefits"
      className="relative w-full bg-background py-20 md:py-28 lg:py-32 overflow-hidden"
    >
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* TÍTULO */}
        <div className="mb-14 md:mb-16 max-w-3xl">
          <p className="mb-3 text-xs font-semibold tracking-[0.28em] text-sky-500/80 uppercase">
            Websites that actually sell.
          </p>

          <div className="relative inline-block">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight">
              <span
                className="block text-slate-900 font-semibold tracking-tight"
                style={{
                  WebkitTextStroke: "0.45px rgba(15,23,42,0.25)",
                  textShadow:
                    "0 0.5px 0 rgba(15,23,42,0.35), 0 16px 40px rgba(15,23,42,0.12)",
                }}
              >
                We are
              </span>

              {/* LEAD CONSTRUCTORS COM UNDERLINE NEON */}
              <span
                className="relative mt-1 inline-block font-semibold tracking-tight text-slate-900"
                style={{
                  WebkitTextStroke: "0.55px rgba(37,99,235,0.35)",
                  textShadow:
                    "0 0.5px 0 rgba(15,23,42,0.25), 0 18px 45px rgba(56,189,248,0.20)",
                }}
              >
                <span className="bg-gradient-to-r from-sky-500 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                  Lead Constructors
                </span>
                <span className="text-slate-900">?</span>

                {/* underline brilhante só nessa palavra */}
                <span
                  className="pointer-events-none absolute left-0 right-0"
                  style={{
                    bottom: "-0.14em",
                    height: "3px",
                    borderRadius: "999px",
                    background:
                      "linear-gradient(90deg, #1FA2FF, #12D8FA, #A6FFCB)",
                    boxShadow:
                      "0 0 10px rgba(56,189,248,0.9), 0 0 20px rgba(56,189,248,0.65)",
                  }}
                />
              </span>
            </h2>
          </div>

          <p className="mt-8 text-lg md:text-xl text-muted-foreground leading-relaxed">
            We specialize in creating professional websites for freelancers and small
            businesses that want real results — not just a pretty page no one visits.
          </p>
        </div>

        {/* GRID DE BENEFÍCIOS */}
        <div className="grid gap-8 md:gap-10 md:grid-cols-2">
          {benefits.map((item, index) => (
            <div
              key={item.title}
              className="group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-card/90 p-6 sm:p-7 lg:p-8 shadow-[0_18px_60px_rgba(15,23,42,0.08)] transition-transform duration-400 hover:-translate-y-1.5"
              style={{ transitionDelay: `${index * 60}ms` }}
            >
              {/* Glow de fundo bem sutil */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-sky-100/40 via-cyan-100/30 to-sky-100/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 via-cyan-400 to-emerald-400 text-slate-950 shadow-lg shadow-sky-500/35">
                  <item.icon className="h-6 w-6" />
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-semibold mb-1.5 text-slate-900">
                    {item.title}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="relative mt-6 h-[1px] w-full rounded-full bg-gradient-to-r from-slate-200 via-sky-200/80 to-slate-200 group-hover:from-sky-400/80 group-hover:via-cyan-400 group-hover:to-emerald-400/80 transition-all duration-400" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
