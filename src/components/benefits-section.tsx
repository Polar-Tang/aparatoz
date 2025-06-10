import { Settings, FileCheck, ThumbsUp, User, Handshake, Star } from "lucide-react"

const benefits = [
  {
    icon: <Settings className="h-10 w-10 text-white" />,
    title: "Última tecnología estética",
    description: "para diversos tratamientos corporales.",
  },
  {
    icon: <FileCheck className="h-10 w-10 text-white" />,
    title: "Resultados reales y visibles",
    description: "en un corto periodo de tiempo.",
  },
  {
    icon: <ThumbsUp className="h-10 w-10 text-white" />,
    title: "Aumentar la rentabilidad",
    description:
      "de tus servicios gracias a la versatilidad de nuestra aparatología, ya que un mismo aparato puede ser utilizado en distintas zonas del cuerpo.",
  },
  {
    icon: <User className="h-10 w-10 text-white" />,
    title: "Capacitación a cargo de profesionales",
    description: "para aprender cómo manipular la máquina.",
  },
  {
    icon: <Handshake className="h-10 w-10 text-white" />,
    title: "Servicio técnico incluido",
    description: "en el alquiler.",
  },
  {
    icon: <Star className="h-10 w-10 text-white" />,
    title: "Traslado resuelto",
    description:
      "te llevamos y luego buscamos el equipo. Además, nuestro equipo de logística hace la puesta a punto de la máquina para que puedas trabajar sin problemas ni demoras.",
  },
]

export default function BenefitsSection() {
  return (
    <div className="bg-gray-900 py-16" id="about">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-2">
            Por qué <span className="text-gray-300">alquilar</span> con nosotros
          </h2>
          <p className="text-gray-300">Al alquilar nuestros aparatos, obtendrás:</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="bg-pink-600 rounded-full p-6 mb-4 w-24 h-24 flex items-center justify-center">
                {benefit.icon}
              </div>
              <div className="max-w-xs">
                <p className="text-gray-300 text-sm">
                  {benefit.title} {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

