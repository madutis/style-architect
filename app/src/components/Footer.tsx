export default function Footer() {
  return (
    <footer className="bg-forest text-cream/70">
      <div className="max-w-[1440px] mx-auto px-8 py-16">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 border border-cream/20 flex items-center justify-center">
                <span className="font-serif text-cream text-xl font-normal italic">
                  SA
                </span>
              </div>
              <div>
                <p className="font-serif text-cream text-lg tracking-[0.15em] uppercase font-normal">
                  Style Architect
                </p>
                <p className="text-[11px] tracking-[0.25em] uppercase text-cream/40">
                  European Design Intelligence
                </p>
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="flex gap-16">
            <div className="flex flex-col gap-3">
              <p className="text-[11px] tracking-[0.25em] uppercase text-cream/40 mb-1">
                Platform
              </p>
              <a href="/studio" className="text-sm text-cream/60 hover:text-cream">
                Design Studio
              </a>
              <a href="/catalogue" className="text-sm text-cream/60 hover:text-cream">
                Catalogue
              </a>
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-[11px] tracking-[0.25em] uppercase text-cream/40 mb-1">
                Company
              </p>
              <span className="text-sm text-cream/60">About</span>
              <span className="text-sm text-cream/60">For Brands</span>
              <span className="text-sm text-cream/60">Contact</span>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-cream/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[11px] text-cream/30 tracking-wider">
            your unique style. easy. real. about you.
          </p>
          <p className="text-[11px] text-cream/30">
            &copy; {new Date().getFullYear()} Style Architect
          </p>
        </div>
      </div>
    </footer>
  );
}
