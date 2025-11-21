import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Términos de Servicio | Trans Beluga",
  description: "Términos y condiciones de servicio de Trans Beluga.",
}

export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto px-4 py-24 md:py-32">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-[#152342]">Términos de Servicio</h1>
        
        <div className="prose prose-lg text-gray-600">
          <p className="mb-6">
            Última actualización: {new Date().toLocaleDateString('es-BO')}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-[#152342]">1. Aceptación de los términos</h2>
            <p>
              Al acceder y utilizar los servicios de Trans Beluga, usted acepta estar sujeto a estos Términos de Servicio. Si no está de acuerdo con alguna parte de los términos, no podrá utilizar nuestros servicios.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-[#152342]">2. Servicios de transporte</h2>
            <p>
              Trans Beluga se compromete a proporcionar servicios de transporte y logística de acuerdo con los estándares de la industria. Nos reservamos el derecho de rechazar servicios que violen leyes locales o internacionales.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-[#152342]">3. Responsabilidades del cliente</h2>
            <p>
              El cliente es responsable de:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Proporcionar información precisa sobre la carga.</li>
              <li>Asegurar que el embalaje sea adecuado para el transporte.</li>
              <li>Cumplir con todas las regulaciones aduaneras y legales aplicables.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-[#152342]">4. Limitación de responsabilidad</h2>
            <p>
              Trans Beluga no será responsable por daños indirectos, incidentales o consecuentes que surjan del uso de nuestros servicios, salvo en casos de negligencia grave o dolo comprobado.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-[#152342]">5. Modificaciones</h2>
            <p>
              Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios entrarán en vigor inmediatamente después de su publicación en este sitio web.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
