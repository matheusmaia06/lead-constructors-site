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

      setSuccess("Thanks! We’ll get back to you within 2 business hours.")
      setName("")
      setEmail("")
      setCompany("")
      setMessage("")
    } catch (err) {
      setError("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="relative w-full py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-secondary via-secondary/95 to-primary/20" />
      <AnimatedBackground />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 animate-gradient" />
      <div className="absolute inset-0 grid-bg opacity-20" />
      
      <div className="container relative z-10 px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-secondary-foreground/10 px-6 py-3 text-sm font-medium backdrop-blur-md border border-secondary-foreground/20">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
              </span>
              <span className="text-secondary-foreground">
                Limited spots this month
              </span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-secondary-foreground tracking-tight text-balance">
              Ready To Transform Your Business?
            </h2>
            
            <p className="text-lg sm:text-xl text-secondary-foreground/80 max-w-2xl mx-auto text-balance leading-relaxed">
              Schedule a free consultation and discover how we can create the perfect website for your business
            </p>
            
            <div className="max-w-xl mx-auto space-y-4">
              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                <div className="grid gap-3 sm:grid-cols-2">
                  <Input
                    type="text"
                    required
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-12 bg-secondary-foreground/10 backdrop-blur-md border-secondary-foreground/20 text-secondary-foreground placeholder:text-secondary-foreground/50 focus:border-accent"
                  />
                  <Input
                    type="email"
                    required
                    placeholder="Your best email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 bg-secondary-foreground/10 backdrop-blur-md border-secondary-foreground/20 text-secondary-foreground placeholder:text-secondary-foreground/50 focus:border-accent"
                  />
                </div>

                <Input
                  type="text"
                  placeholder="Company or website (optional)"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="h-12 bg-secondary-foreground/10 backdrop-blur-md border-secondary-foreground/20 text-secondary-foreground placeholder:text-secondary-foreground/50 focus:border-accent"
                />

                <Textarea
                  required
                  placeholder="Tell us a bit about your project and how we can help"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="min-h-[120px] bg-secondary-foreground/10 backdrop-blur-md border-secondary-foreground/20 text-secondary-foreground placeholder:text-secondary-foreground/50 focus:border-accent"
                />

                <div className="flex flex-col sm:flex-row items-center gap-3 sm:justify-between">
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="h-14 px-8 bg-primary hover:bg-primary/90 transition-all hover:scale-105 hover:shadow-xl hover:shadow-primary/50 whitespace-nowrap"
                  >
                    {isSubmitting ? "Sending..." : "Get Started"}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <p className="text-xs text-secondary-foreground/60">
                    Response within 2 business hours
                  </p>
                </div>

                {success && (
                  <p className="text-sm text-emerald-400">{success}</p>
                )}
                {error && (
                  <p className="text-sm text-red-400">{error}</p>
                )}
              </form>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8 text-secondary-foreground/80">
              <a
                href="mailto:hello@leadconstructors.com"
                className="flex items-center gap-2 hover:text-accent transition-colors group"
              >
                <div className="p-2 rounded-lg bg-secondary-foreground/10 group-hover:bg-accent/20 transition-colors">
                  <Mail className="h-5 w-5" />
                </div>
                <span>hello@leadconstructors.com</span>
              </a>
              <a
                href="tel:+18885551234"
                className="flex items-center gap-2 hover:text-accent transition-colors group"
              >
                <div className="p-2 rounded-lg bg-secondary-foreground/10 group-hover:bg-accent/20 transition-colors">
                  <Phone className="h-5 w-5" />
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
