'use client'

import Link from 'next/link'
import { ArrowRight, Package, MapPin, Truck } from 'lucide-react'
import { useEffect, useState } from "react"

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)
  const [yearsCount, setYearsCount] = useState(0)
  const [shipmentsCount, setShipmentsCount] = useState(0)
  const [punctualityCount, setPunctualityCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  useEffect(() => {
    setIsVisible(true)
  }, [])
   useEffect(() => {
    if (!hasAnimated) {
      // Animar años de experiencia (0 a 15)
      const yearsTimer = setInterval(() => {
        setYearsCount(prev => {
          if (prev >= 15) {
            clearInterval(yearsTimer)
            return 15
          }
          return prev + 1
        })
      }, 100)

      // Animar envíos mensuales (0 a 1000)
      const shipmentsTimer = setInterval(() => {
        setShipmentsCount(prev => {
          if (prev >= 1000) {
            clearInterval(shipmentsTimer)
            return 1000
          }
          return prev + 25
        })
      }, 20)

      // Animar puntualidad (0 a 99)
      const punctualityTimer = setInterval(() => {
        setPunctualityCount(prev => {
          if (prev >= 99) {
            clearInterval(punctualityTimer)
            setHasAnimated(true)
            return 99
          }
          return prev + 1
        })
      }, 30)

      return () => {
        clearInterval(yearsTimer)
        clearInterval(shipmentsTimer)
        clearInterval(punctualityTimer)
      }
    }
  }, [hasAnimated])
  return (
    <section className="relative bg-gradient-to-br from-[#152342] to-[#1a2f4a] text-white pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden min-h-screen flex items-center">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#4ec3b3] rounded-full opacity-10 blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#4ec3b3] rounded-full opacity-10 blur-3xl translate-y-1/2 -translate-x-1/2"></div>

      <div className="absolute top-10 right-10 w-72 h-72 bg-[#4ec3b3] rounded-full opacity-5 blur-3xl animate-blob"></div>
      <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-[#4ec3b3] rounded-full opacity-5 blur-3xl animate-blob animation-delay-2s"></div>
      <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-[#4ec3b3] rounded-full opacity-5 blur-3xl animate-blob animation-delay-4s"></div>

      <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" viewBox="0 0 1200 600">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#4ec3b3', stopOpacity: 0.5 }} />
            <stop offset="100%" style={{ stopColor: '#4ec3b3', stopOpacity: 0 }} />
          </linearGradient>
        </defs>
        <polyline points="0,100 200,50 400,100 600,20 800,80 1000,30 1200,100" fill="none" stroke="url(#lineGradient)" strokeWidth="2" className="animate-pulse-slow"/>
        <circle cx="200" cy="50" r="4" fill="#4ec3b3" className="animate-float"/>
        <circle cx="600" cy="20" r="4" fill="#4ec3b3" className="animate-float animation-delay-2s"/>
        <circle cx="1000" cy="30" r="4" fill="#4ec3b3" className="animate-float animation-delay-4s"/>
      </svg>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left content */}
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Conectamos Bolivia con <span className="text-[#4ec3b3]">confianza</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
              Transporte interurbano de carga y encomienda con los más altos estándares de puntualidad, seguridad y respeto. Como la beluga en el mar, nos movemos con suavidad pero con firmeza.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link 
                href="/tracking"
                className="px-8 py-3 bg-[#4ec3b3] text-[#152342] rounded-lg font-bold hover:bg-opacity-90 transition-all hover:scale-105 text-center"
              >
                Rastrear Envío
              </Link>
              <Link 
                href="/quote"
                className="px-8 py-3 border-2 border-[#4ec3b3] text-[#4ec3b3] rounded-lg font-bold hover:bg-[#4ec3b3] hover:text-[#152342] transition-all text-center"
              >
                Solicitar Cotización
              </Link>
            </div>

            {/* Stats con animación de contar */}
            <div className="grid grid-cols-3 gap-6 md:gap-8">
              <div>
                <div className="text-3xl md:text-4xl font-bold text-[#4ec3b3] mb-2">
                  {yearsCount}+
                </div>
                <div className="text-sm text-gray-400">Años de experiencia</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-[#4ec3b3] mb-2">
                  {shipmentsCount}+
                </div>
                <div className="text-sm text-gray-400">Envíos mensuales</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-[#4ec3b3] mb-2">
                  {punctualityCount}%
                </div>
                <div className="text-sm text-gray-400">Puntualidad</div>
              </div>
            </div>
          </div>

         {/* Visual Content - Staggered Images & Route */}
          <div className={`relative h-[600px] w-full ${isVisible ? 'animate-fade-in-left' : 'opacity-0'} delay-200 hidden lg:block`}>
            
            {/* Background Route Animation - BEHIND IMAGES */}
            <div className="absolute inset-0 z-0 pointer-events-none">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 600 600">
                {/* Main Dashed Path - More visible */}
                <path 
                  d="M 50,400 C 150,400 150,200 300,100 S 450,100 550,50" 
                  fill="none" 
                  stroke="#4ec3b3" 
                  strokeWidth="4" 
                  strokeDasharray="12 8"
                  className="opacity-80 drop-shadow-lg"
                />
                
                {/* Glow effect behind the main path */}
                <path 
                  d="M 50,400 C 150,400 150,200 300,100 S 450,100 550,50" 
                  fill="none" 
                  stroke="#4ec3b3" 
                  strokeWidth="8" 
                  strokeDasharray="12 8"
                  className="opacity-30 blur-sm"
                />

                {/* Moving Truck Icon on Path */}
                <g>
                  <circle r="6" fill="#ffffff" stroke="#4ec3b3" strokeWidth="2">
                    <animateMotion 
                      dur="8s" 
                      repeatCount="indefinite"
                      path="M 50,400 C 150,400 150,200 300,100 S 450,100 550,50"
                    />
                  </circle>
                  {/* Animated glow around moving dot */}
                  <circle r="12" fill="#4ec3b3" opacity="0.3">
                    <animateMotion 
                      dur="8s" 
                      repeatCount="indefinite"
                      path="M 50,400 C 150,400 150,200 300,100 S 450,100 550,50"
                    />
                    <animate
                      attributeName="r"
                      values="8;12;8"
                      dur="2s"
                      repeatCount="indefinite"
                    />
                  </circle>
                </g>

                {/* Connection Points along the route */}
                <g transform="translate(50, 400)">
                  <circle r="8" fill="#4ec3b3" className="opacity-80"/>
                  <circle r="12" fill="#4ec3b3" className="opacity-30 animate-ping"/>
                </g>
                                
                <g transform="translate(550, 50)">
                  <circle r="8" fill="#4ec3b3" className="opacity-80"/>
                  <circle r="12" fill="#4ec3b3" className="opacity-30 animate-ping"/>
                </g>

                {/* Static Icons along the path */}
                <g transform="translate(50, 400)" className="drop-shadow-lg">
                   <MapPin className="w-8 h-8 text-white" strokeWidth={2} />
                   <text x="20" y="5" className="text-xs font-bold fill-white">Origen</text>
                </g>

                <g transform="translate(550, 50)" className="drop-shadow-lg">
                   <MapPin className="w-8 h-8 text-white" strokeWidth={2} />
                   <text x="20" y="5" className="text-xs font-bold fill-white">Destino</text>
                </g>
                {/* Second Moving Package - From Image 3 to Image 2 */}
                <g>
                  <circle r="6" fill="#ffffff" stroke="#4ec3b3" strokeWidth="2">
                    <animateMotion 
                      dur="8s" 
                      repeatCount="indefinite"
                      path="M 100,450 C 200,350 300,250 450,300"
                    />
                  </circle>
                  {/* Animated glow around second package */}
                  <circle r="12" fill="#4ec3b3" opacity="0.3">
                    <animateMotion 
                      dur="8s" 
                      repeatCount="indefinite"
                      path="M 100,450 C 200,350 300,250 450,300"
                    />
                    <animate
                      attributeName="r"
                      values="8;12;8"
                      dur="2s"
                      repeatCount="indefinite"
                    />
                  </circle>
                </g>

                {/* Path for second package - Same style as first */}
                <path 
                  d="M 100,450 C 200,350 300,250 450,300" 
                  fill="none" 
                  stroke="#4ec3b3" 
                  strokeWidth="4" 
                  strokeDasharray="12 8"
                  className="opacity-80 drop-shadow-lg"
                />

                {/* Glow effect for second path */}
                <path 
                  d="M 100,450 C 200,350 300,250 450,300" 
                  fill="none" 
                  stroke="#4ec3b3" 
                  strokeWidth="8" 
                  strokeDasharray="12 8"
                  className="opacity-30 blur-sm"
                />
              </svg>
            </div>

            {/* Image 1: Top Right (Volvo - Highway) */}
            <div className="absolute top-10 right-0 w-72 h-52 z-10 transform rotate-3 hover:rotate-0 transition-transform duration-500 shadow-2xl rounded-xl overflow-hidden border-4 border-white">
              <img 
                src="/camion2.avif" 
                alt="Transporte Nacional" 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Image 2: Bottom Right (Loading/Warehouse) */}
            <div className="absolute bottom-32 -right-8 w-64 h-48 z-20 transform -rotate-3 hover:rotate-0 transition-transform duration-500 shadow-2xl rounded-xl overflow-hidden border-4 border-white">
              <img 
                src="/modern-fleet.jpg" 
                alt="Logística y Carga" 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Image 3: Bottom Left (Nissan - Urban) */}
            <div className="absolute bottom-10 left-10 w-80 h-60 z-30 transform rotate-2 hover:rotate-0 transition-transform duration-500 shadow-2xl rounded-xl overflow-hidden border-4 border-white">
              <img 
                src="/nissan-condor-truck-urban-delivery.jpg" 
                alt="Distribución Urbana" 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Decorative Line Art Truck (Top Right Corner) */}
            <div className="absolute -top-5 -right-5 opacity-10 transform rotate-12">
               <Truck className="w-40 h-40 text-gray-900" strokeWidth={1} />
            </div>
            
            {/* Decorative Package Icon (Top Center) */}
            <div className="absolute top-0 left-1/3 opacity-20 transform -rotate-12">
               <Package className="w-16 h-16 text-gray-900" strokeWidth={1} />
            </div>

          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes pulse-ring {
          0%, 100% { transform: scale(1); opacity: 0.1; }
          50% { transform: scale(1.1); opacity: 0.2; }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(-40px) translateX(-10px); }
          75% { transform: translateY(-20px) translateX(15px); }
        }

        @keyframes fade-in-left {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out;
        }

        .animate-fade-in-left {
          animation: fade-in-left 1s ease-out;
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }

        .animate-pulse-ring {
          animation: pulse-ring 3s ease-in-out infinite;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animation-delay-1s {
          animation-delay: 1s;
        }

        .animation-delay-2s {
          animation-delay: 2s;
        }

        .animation-delay-4s {
          animation-delay: 4s;
        }

        .animation-delay-6s {
          animation-delay: 6s;
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}
