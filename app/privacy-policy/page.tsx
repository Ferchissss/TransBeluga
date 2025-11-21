import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Política de Privacidad | Trans Beluga",
  description: "Política de privacidad de Trans Beluga.",
}

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-24 md:py-32">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-[#152342]">Política de Privacidad</h1>
        
        <div className="prose prose-lg text-gray-600">
          <p className="mb-6">
            Última actualización: {new Date().toLocaleDateString('es-BO')}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-[#152342]">1. Introducción</h2>
            <p>
              En Trans Beluga, nos comprometemos a proteger su privacidad. Esta Política de Privacidad explica cómo recopilamos, usamos y compartimos su información personal cuando utiliza nuestros servicios de transporte y logística.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-[#152342]">2. Información que recopilamos</h2>
            <p>
              Podemos recopilar información personal que usted nos proporciona directamente, como:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Información de contacto (nombre, correo electrónico, número de teléfono).</li>
              <li>Información de envío y logística.</li>
              <li>Información de facturación y pago.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-[#152342]">3. Uso de la información</h2>
            <p>
              Utilizamos la información recopilada para:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Procesar y gestionar sus envíos.</li>
              <li>Comunicarnos con usted sobre el estado de sus servicios.</li>
              <li>Mejorar nuestros servicios y atención al cliente.</li>
              <li>Cumplir con obligaciones legales.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-[#152342]">4. Contacto</h2>
            <p>
              Si tiene preguntas sobre esta Política de Privacidad, por favor contáctenos a través de nuestra página de contacto o enviando un correo electrónico a info@transbeluga.com.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
