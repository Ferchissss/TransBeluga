"use client"

import { Truck, MapPin, DollarSign } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

export default function ServicesSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const services = [
    {
      icon: Truck,
      title: "Carga General",
      description: "Transportamos todo tipo de carga legal con máxima seguridad y profesionalismo.",
      image: "/packeges1.jpg",
    },
    {
      icon: Truck,
      title: "Encomiendas",
      description: "Paquetes y envíos personales con seguimiento completo hasta su destino.",
      image: "/carga.jfif",
    },
    {
      icon: Truck,
      title: "Mercancías Especiales",
      description: "Cargas que requieren manejo especial y expertise profesional garantizado.",
      image: "/packeges.jpg",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  const cardVariants = {
    hidden: {
      opacity: 0,
      x: -30,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  return (
    <section id="services" className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header con animación */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Servicios Ofrecidos</h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Contamos con una amplia variedad de opciones de transporte adaptadas a tus necesidades.
          </p>
        </motion.div>

        {/* Servicios con animación escalonada */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid md:grid-cols-3 gap-8 mb-16"
        >
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="overflow-hidden rounded-2xl bg-card border border-border hover:border-[#4ec3b3] hover:shadow-lg transition-all group"
              >
                <div className="relative w-full h-48 bg-muted overflow-hidden">
                  <Image
                    src={service.image || "/placeholder.svg"}
                    alt={service.title}
                    fill
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                <div className="p-8">
                  <div className="w-16 h-16 bg-[#152342] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#4ec3b3] transition-colors dark:bg-[#4ec3b3] dark:group-hover:bg-[#152342]">
                    <Icon className="w-8 h-8 text-[#4ec3b3] group-hover:text-[#152342] dark:text-[#152342] dark:group-hover:text-[#4ec3b3]" />
                  </div>
                  <h3 className="font-bold text-xl text-foreground mb-3">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Tarjetas inferiores con animación */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8"
        >
          {/* Coverage and Routes */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="p-8 rounded-2xl bg-card border border-border"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-[#152342] rounded-lg flex items-center justify-center dark:bg-[#4ec3b3]">
                <MapPin className="w-6 h-6 text-[#4ec3b3] dark:text-[#152342]" />
              </div>
              <h3 className="font-bold text-xl text-foreground">Cobertura</h3>
            </div>
            <div className="space-y-4">
              <div>
                <p className="font-semibold text-foreground mb-1">Punto de Salida</p>
                <p className="text-muted-foreground">El Alto</p>
              </div>
              <div>
                <p className="font-semibold text-foreground mb-1">Destinos Principales</p>
                <p className="text-muted-foreground">Tarija y Bermejo</p>
              </div>
              <div className="pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">Tiempos de Entrega:</span> 2 días después de que el
                  camión salga desde La Paz
                </p>
              </div>
            </div>
          </motion.div>

          {/* Rates */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="p-8 rounded-2xl bg-card border border-border"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-[#152342] rounded-lg flex items-center justify-center dark:bg-[#4ec3b3]">
                <DollarSign className="w-6 h-6 text-[#4ec3b3] dark:text-[#152342]" />
              </div>
              <h3 className="font-bold text-xl text-foreground">Tarifas</h3>
            </div>
            <div className="space-y-4">
              <p className="text-muted-foreground">Nuestras tarifas son variables y se calculan según:</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-[#4ec3b3] font-bold mt-1">•</span>
                  <span className="text-foreground">Peso de la carga</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#4ec3b3] font-bold mt-1">•</span>
                  <span className="text-foreground">Volumen</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#4ec3b3] font-bold mt-1">•</span>
                  <span className="text-foreground">Tipo de mercancía</span>
                </li>
              </ul>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/quote"
                  className="mt-4 px-6 py-2 bg-[#4ec3b3] text-[#152342] rounded-lg font-semibold hover:bg-opacity-90 transition-all text-sm inline-block"
                >
                  Solicitar Cotización
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
