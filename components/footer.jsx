export function Footer() {
  return (
    <footer className="w-full border-t border-border bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
          <img 
  src="/black-logo.png" 
  alt="Alif OCR Logo" 
  className="h-8 w-auto mb-4"
/>

            <p className="text-sm text-muted-foreground">
              Transform your handwritten notes into digital text and documents with AI power.
            </p>
          </div>
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

       <div className="pt-8 border-t border-border">
  <div className="flex flex-wrap justify-between items-center text-sm text-muted-foreground gap-2">
    <p>© 2025 Alif OCR. All rights reserved.</p>
    <p>Powered by Cplus Soft</p>
  </div>
</div>

      </div>
    </footer>
  )
}
