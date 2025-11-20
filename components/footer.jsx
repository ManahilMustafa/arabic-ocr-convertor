export function Footer() {
  return (
    <footer className="relative w-full bg-background bg-[url('/bg-grd.png')] bg-cover bg-center overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 -top-16 h-20 bg-linear-to-b from-white via-white/95 to-transparent" />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Footer Top */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* Logo & Description */}
          <div>
            <img 
              src="/logo.png" 
              alt="Alif OCR Logo" 
              className="h-8 w-auto mb-4"
            />
            <p className="text-sm text-muted-foreground">
              Transform your handwritten notes into digital text and documents with AI power.
            </p>
          </div>

          {/* Features */}
          <div>
            <h5 className="font-semibold text-foreground mb-4">Features</h5>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-primary transition">
                  OCR Technology
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition">
                  Batch Upload
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition">
                  Multiple Formats
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h5 className="font-semibold text-foreground mb-4">Support</h5>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-primary transition">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h5 className="font-semibold text-foreground mb-4">Legal</h5>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-primary transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-muted-foreground gap-2">
            <p>© 2025 Alif OCR. All rights reserved.</p>
            <p>Powered by Cplus Soft</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
