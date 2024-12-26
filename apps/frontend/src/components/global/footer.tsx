import Link from "next/link"
import { Mail, Youtube, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <>
    
    <footer className=" overflow-hidden bg-secondary-foreground text-slate-200 py-12 ">

    <div className="container mx-auto">
      <div className=" mb-8">
        
        
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold text-white">Resourcera</h2>
            <Link href={"https://www.linkedin.com/in/muaaz-raza/"} target="_blank" className="bg-primary text-white text-sm px-2 py-0.5 rounded">@muaaz-raza</Link>
          </div>
          <p className="text-slate-200 max-w-md">
            Community-driven platform for sharing educational resources, learning paths, and professional development materials to help you grow in every aspect of your life.
          </p>
        </div>
        
     
      </div>

      {/* Bottom Section */}
      <div className="border-t border-slate-200 pt-8 mt-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Copyright and Links */}
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <span>© Resourcera</span>
            <span className="hidden md:inline ">•</span>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms
            </Link>
            <span className="hidden md:inline ">•</span>
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy
            </Link>
          </div>

  

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            <Link href="#" className="hover:text-white transition-colors">
              <Mail className="h-5 w-5" />
              <span className="sr-only">Email</span>
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              <Youtube className="h-5 w-5" />
              <span className="sr-only">YouTube</span>
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  </footer>
  </>
  )
}
