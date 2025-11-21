'use client'

import { FileText, Package, Truck, CheckCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function ProcedureSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const steps = [
    {
      icon: FileText,
      step: '1',
      title: 'Documentación',
      description: 'Presenta tu encomienda en nuestra oficina central en El Alto con facturas o pólizas según el origen.',
    },
    {
      icon: Package,
      step: '2',
      title: 'Embalaje y Registro',
      description: 'Registramos y verificamos el peso, volumen y estado de tu carga. Asegúrate de cumplir con los pesos máximos permitidos.',
    },
    {
      icon: Truck,
      step: '3',
      title: 'Transporte',
      description: 'Tu carga se transporta hacia Tarija y Bermejo. El tiempo de entrega es de 2 días después de la salida.',
    },
    {
      icon: CheckCircle,
      step: '4',
      title: 'Entrega y Confirmación',
      description: 'Recibimos confirmación de entrega en destino y te notificamos del cumplimiento exitoso.',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  }

  const stepVariants = {
    hidden: { 
      opacity: 0, 
      x: -50 
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.7,
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

  const lineVariants = {
    hidden: { 
      scaleY: 0,
      opacity: 0 
    },
    visible: {
      scaleY: 1,
      opacity: 0.3,
      transition: {
        duration: 0.8,
        delay: 0.5
      }
    }
  }

  const notesVariants = {
    hidden: { 
      opacity: 0, 
      y: 40 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      x: -20 
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5
      }
    }
  }

  return (
    <section id="procedure" className="py-20 md:py-32 bg-muted/30">
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
            Procedimiento para Envíos
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Sigue estos pasos sencillos para enviar tu carga de manera segura y confiable.
          </p>
        </motion.div>

        {/* Pasos con animación escalonada */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="space-y-6"
        >
          {steps.map((stepInfo, index) => {
            const Icon = stepInfo.icon
            return (
              <motion.div
                key={index}
                variants={stepVariants}
                className="flex gap-6"
              >
                {/* Step Circle */}
                <div className="flex-shrink-0">
                  <div className="relative">
                    <motion.div 
                      className="w-16 h-16 rounded-full bg-[#152342] border-2 border-[#4ec3b3] flex items-center justify-center dark:bg-[#4ec3b3] dark:border-[#152342]"
                      whileHover={{ 
                        scale: 1.1,
                        backgroundColor: "#4ec3b3",
                        transition: { duration: 0.3 }
                      }}
                    >
                      <motion.div
                        variants={iconVariants}
                      >
                        <Icon className="w-8 h-8 text-[#4ec3b3] dark:text-[#152342]" />
                      </motion.div>
                    </motion.div>
                    {index < steps.length - 1 && (
                      <motion.div 
                        variants={lineVariants}
                        className="absolute top-16 left-1/2 transform -translate-x-1/2 w-1 h-12 bg-gradient-to-b from-[#4ec3b3] to-transparent opacity-30"
                      />
                    )}
                  </div>
                </div>

                {/* Step Content */}
                <motion.div 
                  className="pb-8"
                  whileHover={{ x: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {stepInfo.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {stepInfo.description}
                  </p>
                </motion.div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Important Notes con animación */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-[#152342] to-[#1a2f4a] border border-[#4ec3b3] border-opacity-30"
        >
          <motion.h3 
            className="text-xl font-bold text-white mb-6"
            whileHover={{ scale: 1.02 }}
          >
            Requisitos Importantes
          </motion.h3>
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h4 className="text-[#4ec3b3] font-semibold mb-4">Documentación Requerida</h4>
              <ul className="space-y-2">
                {[
                  "Factura o póliza de origen",
                  "Identificación del remitente", 
                  "Descripción detallada de la carga"
                ].map((item, index) => (
                  <motion.li 
                    key={index}
                    variants={itemVariants}
                    className="flex items-start gap-3"
                    whileHover={{ x: 5 }}
                  >
                    <motion.span 
                      className="text-[#4ec3b3] font-bold mt-1"
                      whileHover={{ scale: 1.3 }}
                    >
                      ✓
                    </motion.span>
                    <span className="text-gray-300">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h4 className="text-[#4ec3b3] font-semibold mb-4">Restricciones</h4>
              <ul className="space-y-2">
                {[
                  "Solo se aceptan cargas dentro del marco legal",
                  "Altura máxima: 4.20 metros (por ley)",
                  "Servicio de ida: El Alto → Tarija/Bermejo"
                ].map((item, index) => (
                  <motion.li 
                    key={index}
                    variants={itemVariants}
                    className="flex items-start gap-3"
                    whileHover={{ x: 5 }}
                  >
                    <motion.span 
                      className="text-[#4ec3b3] font-bold mt-1"
                      whileHover={{ scale: 1.3 }}
                    >
                      •
                    </motion.span>
                    <span className="text-gray-300">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}