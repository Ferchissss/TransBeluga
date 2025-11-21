'use client'

import { Heart, Target, Handshake, AlertCircle, CheckCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function Values() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const values = [
    {
      icon: CheckCircle,
      title: 'Puntualidad',
      description: 'Cumplimos con los tiempos establecidos para que cada viaje sea confiable y organizado.',
    },
    {
      icon: Heart,
      title: 'Respeto',
      description: 'Valoramos a cada persona y cada carga como única e importante.',
    },
    {
      icon: AlertCircle,
      title: 'Seguridad',
      description: 'Priorizamos el bienestar de pasajeros, colaboradores y bienes transportados.',
    },
    {
      icon: Handshake,
      title: 'Amabilidad',
      description: 'Nuestra atención se basa en el trato humano y cordial en todo momento.',
    },
    {
      icon: Target,
      title: 'Responsabilidad',
      description: 'Asumimos con seriedad el compromiso que implica transportar personas y objetos.',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  const iconVariants = {
    hidden: { 
      scale: 0,
      rotate: -180
    },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        duration: 0.8
      }
    }
  }

  return (
    <section id="values" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        {/* Header con animación */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Nuestros Valores
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Los principios que guían cada una de nuestras acciones y definen quiénes somos.
          </p>
        </motion.div>

        {/* Valores con animación escalonada */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-5 gap-6"
        >
          {values.map((value, index) => {
            const Icon = value.icon
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.05,
                  y: -5,
                  transition: { type: "spring", stiffness: 300 }
                }}
                className="p-6 rounded-2xl bg-card border border-border hover:border-[#4ec3b3] hover:shadow-lg transition-all group cursor-pointer"
              >
                <motion.div 
                  className="w-12 h-12 bg-[#152342] rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#4ec3b3] transition-colors dark:bg-[#4ec3b3] dark:group-hover:bg-[#152342]"
                  whileHover={{ 
                    rotate: 360,
                    transition: { duration: 0.5 }
                  }}
                >
                  <motion.div
                    variants={iconVariants}
                  >
                    <Icon className="w-6 h-6 text-[#4ec3b3] group-hover:text-[#152342] dark:text-[#152342] dark:group-hover:text-[#4ec3b3]" />
                  </motion.div>
                </motion.div>
                <h3 className="font-bold text-lg text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
