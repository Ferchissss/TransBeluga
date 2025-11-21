export const translations = {
  es: {
    // Header
    services: 'Servicios',
    tracking: 'Rastreo',
    quote: 'Cotizador',
    fleet: 'Flota',
    contact: 'Contacto',
    requestQuote: 'Solicitar Cotización',

    // Hero
    heroTitle: 'Transporte de Confianza en Bolivia',
    heroSubtitle: 'Conectamos El Alto, Tarija y Bermejo con seguridad, puntualidad y profesionalismo',
    heroButton: 'Comenzar Ahora',
    heroStats1: '500+',
    heroStats1Label: 'Entregas Mensuales',
    heroStats2: '15 años',
    heroStats2Label: 'De Experiencia',
    heroStats3: '100%',
    heroStats3Label: 'Satisfacción',

    // Services
    servicesTitle: 'Nuestros Servicios',
    service1Title: 'Carga General',
    service1Desc: 'Transportamos cualquier tipo de carga con seguridad y profesionalismo',
    service2Title: 'Encomiendas',
    service2Desc: 'Envíos rápidos y confiables entre ciudades',
    service3Title: 'Rutas Especiales',
    service3Desc: 'Conexiones directas El Alto - Tarija - Bermejo',
    service4Title: 'Rastreo en Tiempo Real',
    service4Desc: 'Monitorea tu envío en cada momento del viaje',

    // Tracking
    trackingTitle: 'Rastreo de Envíos',
    trackingPlaceholder: 'Ingresa tu código de envío',
    trackingButton: 'Rastrear',
    trackingExample: 'Ejemplo: TB001',

    // Quote
    quoteTitle: 'Cotizador de Cargas',
    quoteWeight: 'Peso (kg)',
    quoteDistance: 'Distancia (km)',
    quoteCalculate: 'Calcular',
    quotePrice: 'Precio estimado',
    quotePriceValue: 'Bs. {price}',

    // Values
    valuesTitle: 'Nuestros Valores',
    valuePunctuality: 'Puntualidad',
    valueRespect: 'Respeto',
    valueSafety: 'Seguridad',
    valueKindness: 'Amabilidad',
    valueResponsibility: 'Responsabilidad',

    // Fleet
    fleetTitle: 'Nuestra Flota',
    fleetAvailable: 'Disponible',
    fleetInRoute: 'En Ruta',
    fleetMaintenance: 'Mantenimiento',

    // Contact
    contactTitle: 'Ponte en Contacto',
    contactName: 'Nombre',
    contactEmail: 'Correo Electrónico',
    contactPhone: 'Teléfono',
    contactMessage: 'Mensaje',
    contactSend: 'Enviar Mensaje',

    // Footer
    footerAbout: 'Acerca de',
    footerServices: 'Servicios',
    footerCompany: 'Empresa',
    footerFollowUs: 'Síguenos',
    footerAllRights: 'Todos los derechos reservados',
  },
  en: {
    // Header
    services: 'Services',
    tracking: 'Tracking',
    quote: 'Quote',
    fleet: 'Fleet',
    contact: 'Contact',
    requestQuote: 'Request Quote',

    // Hero
    heroTitle: 'Trusted Transport in Bolivia',
    heroSubtitle: 'We connect La Paz, Tarija and Bermejo with safety, punctuality and professionalism',
    heroButton: 'Get Started',
    heroStats1: '500+',
    heroStats1Label: 'Monthly Deliveries',
    heroStats2: '15 years',
    heroStats2Label: 'Of Experience',
    heroStats3: '100%',
    heroStats3Label: 'Satisfaction',

    // Services
    servicesTitle: 'Our Services',
    service1Title: 'General Cargo',
    service1Desc: 'We transport all types of cargo safely and professionally',
    service2Title: 'Parcels',
    service2Desc: 'Fast and reliable shipments between cities',
    service3Title: 'Special Routes',
    service3Desc: 'Direct connections La Paz - Tarija - Bermejo',
    service4Title: 'Real-time Tracking',
    service4Desc: 'Monitor your shipment at every moment of the journey',

    // Tracking
    trackingTitle: 'Track Your Shipment',
    trackingPlaceholder: 'Enter your shipment code',
    trackingButton: 'Track',
    trackingExample: 'Example: TB001',

    // Quote
    quoteTitle: 'Cargo Quote Calculator',
    quoteWeight: 'Weight (kg)',
    quoteDistance: 'Distance (km)',
    quoteCalculate: 'Calculate',
    quotePrice: 'Estimated Price',
    quotePriceValue: 'Bs. {price}',

    // Values
    valuesTitle: 'Our Values',
    valuePunctuality: 'Punctuality',
    valueRespect: 'Respect',
    valueSafety: 'Safety',
    valueKindness: 'Kindness',
    valueResponsibility: 'Responsibility',

    // Fleet
    fleetTitle: 'Our Fleet',
    fleetAvailable: 'Available',
    fleetInRoute: 'In Route',
    fleetMaintenance: 'Maintenance',

    // Contact
    contactTitle: 'Get In Touch',
    contactName: 'Name',
    contactEmail: 'Email',
    contactPhone: 'Phone',
    contactMessage: 'Message',
    contactSend: 'Send Message',

    // Footer
    footerAbout: 'About',
    footerServices: 'Services',
    footerCompany: 'Company',
    footerFollowUs: 'Follow Us',
    footerAllRights: 'All rights reserved',
  },
}

export function t(key: keyof typeof translations.es, language: 'es' | 'en'): string {
  return translations[language][key as keyof typeof translations[language]] || key
}
