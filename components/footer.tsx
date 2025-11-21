import Link from 'next/link'
import { Facebook, Instagram, Youtube, Heart } from 'lucide-react'
import { FaWhatsapp, FaTiktok } from 'react-icons/fa'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-[#152342] text-white py-12 md:py-16">
      <div className="container mx-auto px-4 mb-12">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              {/* Logo para fondo oscuro */}
              <img 
                src="/logo2.png" 
                alt="Beluga Transporte"
                className="h-8 w-auto"
              />
            </div>
            <p className="text-gray-400 text-sm">
              Conectando Bolivia con confianza y seguridad desde hace años.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">Rápido</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#services" className="text-gray-400 hover:text-[#4ec3b3] transition-colors">
                  Servicios
                </Link>
              </li>
              <li>
                <Link href="#tracking" className="text-gray-400 hover:text-[#4ec3b3] transition-colors">
                  Rastreo
                </Link>
              </li>
              <li>
                <Link href="#fleet" className="text-gray-400 hover:text-[#4ec3b3] transition-colors">
                  Flota
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy-policy" className="text-gray-400 hover:text-[#4ec3b3] transition-colors">
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="text-gray-400 hover:text-[#4ec3b3] transition-colors">
                  Términos de Servicio
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-[#4ec3b3] transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-bold mb-4">Síguenos</h4>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/share/17pWT1BBL2/?mibextid=wwXIfr" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[#4ec3b3] hover:text-[#152342] transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[#4ec3b3] hover:text-[#152342] transition-colors">
                <FaWhatsapp className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/transbeluga?igsh=cGs1cmphenFjMGx5&utm_source=qr" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[#4ec3b3] hover:text-[#152342] transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://www.youtube.com/@TransBeluga" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[#4ec3b3] hover:text-[#152342] transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="www.tiktok.com/@trans.beluga" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[#4ec3b3] hover:text-[#152342] transition-colors">
                <FaTiktok className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>&copy; {year} Trans Beluga. Todos los derechos reservados.</p>
            <p className="flex items-center gap-1">
              Hecho con <Heart className="w-4 h-4 text-red-500 fill-red-500" /> en Bolivia
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}