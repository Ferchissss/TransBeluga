'use client'

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Zap, Weight, Maximize2 as Maximize3, CheckCircle2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function FleetSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const imageVariants = {
    hidden: { 
      opacity: 0, 
      x: -50,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }

  const contentVariants = {
    hidden: { 
      opacity: 0, 
      x: 50 
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 20 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  const badgeVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0,
      rotate: -180
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.8,
        delay: 0.5,
        type: "spring",
        stiffness: 200
      }
    }
  }

  const glowVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 0.2,
      transition: {
        duration: 1.5,
        ease: "easeInOut"
      }
    }
  }

  return (
    <section className="py-24 bg-[#152342] text-white overflow-hidden">
      <div className="container px-4 md:px-6 mx-auto">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        >
          {/* Imagen con animaciones */}
          <motion.div 
            variants={imageVariants}
            className="order-2 lg:order-1 relative"
          >
            <motion.div 
              variants={glowVariants}
              className="absolute -inset-4 bg-[#4ec3b3] rounded-full opacity-20 blur-3xl"
            />
            <motion.img 
              src="/home.jpg" 
              alt="Nuestra Flota" 
              className="relative rounded-2xl shadow-2xl border border-white/10 z-10"
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
            />
            <motion.div 
              variants={badgeVariants}
              className="absolute -bottom-6 -right-6 bg-white text-[#152342] p-6 rounded-xl shadow-xl z-20 hidden md:block"
              whileHover={{ 
                scale: 1.1,
                rotate: 5,
                transition: { type: "spring", stiffness: 300 }
              }}
            >
              <p className="text-3xl font-bold">100%</p>
              <p className="text-sm font-medium text-gray-600">Mantenimiento al día</p>
            </motion.div>
          </motion.div>
          
          {/* Contenido con animaciones */}
          <motion.div 
            variants={contentVariants}
            className="order-1 lg:order-2 space-y-8"
          >
            <motion.h2 
              variants={itemVariants}
              className="text-3xl md:text-5xl font-bold leading-tight"
            >
              Tecnología y Confianza en Cada Viaje <br />
              <motion.span 
                className="text-[#4ec3b3]"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                En Movimiento
              </motion.span>
            </motion.h2>
            
            <motion.p 
              variants={itemVariants}
              className="text-lg text-gray-300 leading-relaxed"
            >
              En Trans Beluga aseguramos que tu carga avance de forma segura y ordenada mediante un sistema de control claro y transparente.
            </motion.p>
            
            <motion.ul 
              variants={containerVariants}
              className="space-y-4"
            >
              {[
                "Actualizaciones de estado por tramo",
                "Comunicación constante con los conductores durante la ruta",
                "Control de carga al momento de recepción y entrega",
                "Mantenimiento periódico de los camiones para viajes seguros"
              ].map((item, i) => (
                <motion.li 
                  key={i} 
                  variants={itemVariants}
                  className="flex items-center gap-3"
                  whileHover={{ x: 10 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <CheckCircle2 className="h-6 w-6 text-[#4ec3b3] flex-shrink-0" />
                  </motion.div>
                  <span className="text-lg">{item}</span>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button asChild size="lg" className="bg-[#4ec3b3] hover:bg-[#3da89a] text-[#152342] font-bold rounded-full px-8 h-12 mt-4">
                <Link href="/fleet">
                  Conocer Nuestra Flota
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}