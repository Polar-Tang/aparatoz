"use client"

import React from "react"
import { CarouselDemo } from "./carousel"

type Herodata = {
  title: string,
  description: string
}

const herodata = {
  title: "Pet care",
  description: "Discover premium products for your pets. From cleaning solutions to grooming tools, we have everything you need to keep your pets happy and healthy-"
}

export default function Hero() {

  const [isEditing, setIsEditing] = React.useState<{ [key: string]: boolean }>({
    title: false,
    description: false,
  })


  const [herodataState, setherodataState] = React.useState<Herodata>({} as Herodata)

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("herodata")
      if (stored) {
        setherodataState(JSON.parse(stored))
      } else {
        setherodataState(herodata)
      }
    }
  }, [herodata]) // Watch benefits for changes
  function handleSave(key: string) {
    setIsEditing(s => ({ ...s, [key]: false }))
  }

  function handleBenefitChange(field: string, value: string) {
    console.log(value)
    setherodataState(s => ({ ...s, [field]: value }))
  }
  return (
    <div className="relative bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            {isEditing.title ? (
              <>
                <textarea
                  className="text-3xl font-bold text-gray-900 mb-4 w-full"
                  value={herodataState.title}
                  onChange={e => handleBenefitChange("title", e.target.value)}
                />
                <button
                  className="ml-2 px-2 py-1 bg-green-500 text-white rounded"
                  onClick={() => handleSave('title')}
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">

                  {herodataState.title}
                </h1>
                <button
                  className="ml-2 px-2 py-1 bg-blue-500 text-white rounded"
                  onClick={() => setIsEditing(s => ({ ...s, title: true }))}
                >
                  Edit
                </button>
              </>
            )}
            {isEditing.description ? (
              <>
                <textarea
                  className="text-3xl font-bold text-gray-900 mb-4 w-full"
                  value={herodataState.description}
                  onChange={e => handleBenefitChange("description", e.target.value)}
                />
                <button
                  className="ml-2 px-2 py-1 bg-green-500 text-white rounded"
                  onClick={() => handleSave('description')}
                >
                  Save
                </button>
              </>
            ) : (
              <>

                <p className="text-lg text-gray-600">
                  {herodataState.description}
                </p>
                <button
                  className="ml-2 px-2 py-1 bg-blue-500 text-white rounded"
                  onClick={() => setIsEditing(s => ({ ...s, description: true }))}
                >
                  Edit
                </button>
              </>
            )}
          </div>
          <div className="relative h-64 md:h-96 flex align-center justify-center">
            <CarouselDemo
            // className="object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </div >
  )
}

