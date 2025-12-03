import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react'
import Image from 'next/image'

export function Footer() {
  return (
    <footer className="relative w-full bg-secondary text-secondary-foreground overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-10" />
      
      <div className="container relative z-10 px-4 sm:px-6 lg:px-8 py-16 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-4">
            <Image 
              src="/lead-constructors-logo-3.png" 
              alt="Lead Constructors Logo" 
              width={200}
              height={50}
              className="h-12 w-auto"
            />
            <p className="text-sm text-secondary-foreground/70 leading-relaxed">
              We build professional websites for freelancers who want to grow in the digital world.
            </p>
            <div className="flex gap-3">
              <a href="#" className="p-2 rounded-lg bg-secondary-foreground/10 hover:bg-primary/20 transition-colors" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-secondary-foreground/10 hover:bg-primary/20 transition-colors" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-secondary-foreground/10 hover:bg-primary/20 transition-colors" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="#services" className="text-sm text-secondary-foreground/70 hover:text-accent transition-colors">Services</a></li>
              <li><a href="#benefits" className="text-sm text-secondary-foreground/70 hover:text-accent transition-colors">Benefits</a></li>
              <li><a href="#process" className="text-sm text-secondary-foreground/70 hover:text-accent transition-colors">How It Works</a></li>
              <li><a href="#pricing" className="text-sm text-secondary-foreground/70 hover:text-accent transition-colors">Pricing</a></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Services</h3>
            <ul className="space-y-3">
              <li><span className="text-sm text-secondary-foreground/70">Web Development</span></li>
              <li><span className="text-sm text-secondary-foreground/70">Responsive Design</span></li>
              <li><span className="text-sm text-secondary-foreground/70">SEO</span></li>
              <li><span className="text-sm text-secondary-foreground/70">Maintenance</span></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-secondary-foreground/70">
                <MapPin className="h-5 w-5 shrink-0 mt-0.5" />
                <span>Los Angeles, CA<br />United States</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-secondary-foreground/70">
                <Phone className="h-5 w-5 shrink-0" />
                <span>(888) 555-1234</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-secondary-foreground/70">
                <Mail className="h-5 w-5 shrink-0" />
                <span>hello@leadconstructors.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-secondary-foreground/10 text-center text-sm text-secondary-foreground/60">
          <p>© 2025 Lead Constructors. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
