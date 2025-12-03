"use client"

import { ArrowRight, Mail, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { AnimatedBackground } from "./animated-background"
import { useState } from "react"

export function CtaSection() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [company, setCompany] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)
    setSuccess(null)
    setError(null)

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, company, message }),
      })

      if (!res.ok) {
        throw new Error("Failed to submit")
      }

      setSuccess("Thanks – we’ll get back to you within 2 business hours.")
      setName("")
      setEmail("")
      setCompany("")
      setMessage("")
    } catch (err) {
      setError("Something went wrong. Please try again in a moment.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="cta" className="relative w-full py-20 md:py-28 overflow-hidden">
      {/* background */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary via-slate-950 to-primary/25" />
      <AnimatedBackground />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 animate-gradient" />
      <div className="absolute inset-0 grid-bg opacity-15" />

      <div className="container relative z-10 px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-10">
            {/* badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-secondary-foreground/10 px-5 py-2.5 text-xs sm:text-sm font-medium backdrop-blur-md border border-secondary-foreground/20">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent" />
              </span>
              <span className="text-secondary-foreground/80">
                We take on a limited number of projects each month
              </span>
            </div>

            {/* heading + text */}
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-secondary-foreground tracking-tight text-balance">
                Tell us what you’re building.  
              </h2>

              <p className="text-base sm:text-lg text-secondary-foreground/80 max-w-2xl mx-auto leading-relaxed text-balance">
                Share a bit about your business and what you need from your website. 
                We’ll review everything and come back with a clear, no-pressure suggestion 
                on how we can help.
              </p>
            </div>

            {/* form */}
            <div className="max-w-xl mx-auto space-y-5">
              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                <div className="grid gap-3 sm:grid-cols-2">
                  <Input
                    type="text"
                    required
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-11 bg-secondary-foreground/8 backdrop-blur-md border border-secondary-foreground/20 text-secondary-foreground placeholder:text-secondary-foreground/50 focus:border-accent focus:ring-0"
                  />
                  <Input
                    type="email"
                    required
                    placeholder="Work email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-11 bg-secondary-foreground/8 backdrop-blur-md border border-secondary-foreground/20 text-secondary-foreground placeholder:text-secondary-foreground/50 focus:border-accent focus:ring-0"
                  />
                </div>

                <Input
                  type="text"
                  placeholder="Company or website (optional)"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="h-11 bg-secondary-foreground/8 backdrop-blur-md border border-secondary-foreground/20 text-secondary-foreground placeholder:text-secondary-foreground/50 focus:border-accent focus:ring-0"
                />

                <Textarea
                  required
                  placeholder="What do you need your website to do for you?"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="min-h-[110px] bg-secondary-foreground/8 backdrop-blur-md border border-secondary-foreground/20 text-secondary-foreground placeholder:text-secondary-foreground/50 focus:border-accent focus:ring-0"
                />

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:justify-between">
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="h-12 px-7 rounded-full bg-primary hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/40 whitespace-nowrap text-sm font-semibold"
                  >
                    {isSubmitting ? "Sending..." : "Send message"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>

                  <p className="text-xs sm:text-[13px] text-secondary-foreground/60">
                    We usually reply in{" "}
                    <span className="text-secondary-foreground/80 font-medium">
                      under 2 business hours
                    </span>.
                  </p>
                </div>

                {success && (
                  <p className="text-sm text-emerald-400">{success}</p>
                )}
                {error && <p className="text-sm text-red-400">{error}</p>}
              </form>
            </div>

            {/* secondary contact */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-6 text-secondary-foreground/80">
              <a
                href="mailto:hello@leadconstructors.com"
                className="flex items-center gap-2 hover:text-accent transition-colors group text-sm"
              >
                <div className="p-2 rounded-lg bg-secondary-foreground/10 group-hover:bg-accent/20 transition-colors">
                  <Mail className="h-4 w-4" />
                </div>
                <span>hello@leadconstructors.com</span>
              </a>
              <span className="hidden sm:inline-block h-4 w-px bg-secondary-foreground/20" />
              <a
                href="tel:+18885551234"
                className="flex items-center gap-2 hover:text-accent transition-colors group text-sm"
              >
                <div className="p-2 rounded-lg bg-secondary-foreground/10 group-hover:bg-accent/20 transition-colors">
                  <Phone className="h-4 w-4" />
                </div>
                <span>(888) 555-1234</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
