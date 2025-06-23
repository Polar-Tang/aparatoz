"use client"
import { Settings, FileCheck, ThumbsUp, User, Handshake, Star } from "lucide-react"
import React from "react"

type Benefit = {
  icon: React.ReactNode
  title: string
  description: string
}

const benefits: Benefit[] = [
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
  const [isEditing, setIsEditing] = React.useState<{ [key: string]: boolean }>({
    title: false,
    description: false,
    ...Object.fromEntries(
      benefits.flatMap((_, i) => [
        [`title${i}`, false],
        [`description${i}`, false],
      ])
    ),
  })


  const [benefitState, setbenefitState] = React.useState<Benefit[]>([])

  React.useEffect(() => {
     if (typeof window !== "undefined") {
      localStorage.setItem("testimonialsState", JSON.stringify(benefitState))
    }
  }, [benefitState]) // Watch benefits for changes
  function handleSave(key: string) {
    setIsEditing(s => ({ ...s, [key]: false }))
  }

  function handleBenefitChange(index: number, field: string, value: string) {
    setbenefitState(s =>
      s.map((t, i) => (i === index ? { ...t, [field]: value } : t))
    )
  }
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
          {benefitState.map((benefit, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="bg-pink-600 rounded-full p-6 mb-4 w-24 h-24 flex items-center justify-center">
                {benefit.icon}
              </div>
              <div className="max-w-xs">
                {isEditing[`title${index}`] ? (
                  <>
                    <textarea
                      className="text-gray-100 text-xl font-bold"
                      value={benefit.title}
                      onChange={e => handleBenefitChange(index, 'title', e.target.value)}
                    />
                    <button
                      className="ml-2 px-2 py-1 bg-green-500 text-white rounded"
                      onClick={() => handleSave(`title${index}`)}
                    >
                      Save
                    </button>
                  </>
                ) : (
                  <>
                    <h3 className="text-gray-100 text-xl font-bold">
                      {benefit.title}
                    </h3>
                    <button
                      className="ml-2 px-2 py-1 bg-blue-500 text-white rounded"
                      onClick={() => setIsEditing(s => ({ ...s, [`title${index}`]: true }))}
                    >
                      Edit
                    </button>
                  </>
                )}
                {isEditing[`description${index}`] ? (
                  <>

                    <textarea
                      className="text-gray-300 text-sm"
                      value={benefit.description}
                      onChange={e => handleBenefitChange(index, 'description', e.target.value)}
                    />
                    <button
                      className="ml-2 px-2 py-1 bg-green-500 text-white rounded"
                      onClick={() => handleSave(`description${index}`)}
                    >
                      Save
                    </button>
                  </>
                ) : (
                  <>
                    <p className="text-gray-300 text-sm">
                      {benefit.description}
                    </p>
                    <button
                      className="ml-2 px-2 py-1 bg-blue-500 text-white rounded"
                      onClick={() => setIsEditing(s => ({ ...s, [`description${index}`]: true }))}
                    >
                      Edit
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

