"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Quote } from "lucide-react"
import React from "react"

type Testimonial = {
  quote: string
  author: string
  role: string
  avatar: string
}

const testimonials: Testimonial[] = [
  {
    quote: "The products I purchased for my dog have made such a difference. His coat is shinier and he seems happier!",
    author: "Sarah Johnson",
    role: "Dog Owner",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    quote:
      "I've been using the Nature's Miracle products for years. They're the only ones that actually work on tough pet stains.",
    author: "Michael Chen",
    role: "Cat & Dog Owner",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    quote: "The customer service is outstanding. They helped me find exactly what I needed for my new puppy.",
    author: "Emma Rodriguez",
    role: "Puppy Parent",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export default function Testimonials() {
  const [isEditing, setIsEditing] = React.useState<{ [key: string]: boolean }>({
    title: false,
    subtitle: false,
    ...Object.fromEntries(
      testimonials.flatMap((_, i) => [
        [`quote${i}`, false],
        [`author${i}`, false],
        [`role${i}`, false],
      ])
    ),
  })

  // Separate state for title and subtitle
  const [title, setTitle] = React.useState<string>("What Our Customers Say")
  const [subtitle, setSubtitle] = React.useState<string>(
    "Real stories from real pet lovers. See how our products have made a difference in the lives of pets and their owners."
  )

  const [testimonialState, setTestimonialState] = React.useState<Testimonial[]>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("testimonialsState")
      if (stored) return JSON.parse(stored)
    }
    return testimonials
  })

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("testimonialsState", JSON.stringify(testimonialState))
    }
  }, [testimonialState])

  function handleSave(key: string) {
    setIsEditing(s => ({ ...s, [key]: false }))
  }

  function handleTestimonialChange(index: number, field: string, value: string) {
    setTestimonialState(s =>
      s.map((t, i) =>
        i === index ? { ...t, [field]: value } : t
      )
    )
  }

  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          {/* Editable h2 */}
          <div className="flex justify-center items-center gap-2">
            {isEditing.title ? (
              <>
                <textarea
                  className="text-3xl font-bold text-gray-900 mb-4 w-full"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
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
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  {title}
                </h2>
                <button
                  className="ml-2 px-2 py-1 bg-blue-500 text-white rounded"
                  onClick={() => setIsEditing(s => ({ ...s, title: true }))}
                >
                  Edit
                </button>
              </>
            )}
          </div>
          <div className="flex justify-center items-center gap-2">
            {isEditing.subtitle ? (
              <>
                <textarea
                  className="text-gray-600 max-w-2xl mx-auto w-full"
                  value={subtitle}
                  onChange={e => setSubtitle(e.target.value)}
                />
                <button
                  className="ml-2 px-2 py-1 bg-green-500 text-white rounded"
                  onClick={() => handleSave('subtitle')}
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  {subtitle}
                </p>
                <button
                  className="ml-2 px-2 py-1 bg-blue-500 text-white rounded"
                  onClick={() => setIsEditing(s => ({ ...s, subtitle: true }))}
                >
                  Edit
                </button>
              </>
            )}
          </div>
        </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonialState.map((testimonial, index) => (
        <Card key={index} className="border-none shadow-md">
          <CardContent className="p-6">
          <Quote className="h-8 w-8 text-gray-300 mb-4" />
          {/* Editable quote */}
          <div className="flex items-start gap-2">
            {isEditing[`quote${index}`] ? (
            <>
              <textarea
              className="text-gray-700 mb-6 w-full"
              value={testimonial.quote}
              onChange={e => handleTestimonialChange(index, 'quote', e.target.value)}
              />
              <button
              className="ml-2 px-2 py-1 bg-green-500 text-white rounded"
              onClick={() => handleSave(`quote${index}`)}
              >
              Save
              </button>
            </>
            ) : (
            <>
              <p className="text-gray-700 mb-6">{testimonial.quote}</p>
              <button
              className="ml-2 px-2 py-1 bg-blue-500 text-white rounded"
              onClick={() => setIsEditing(s => ({ ...s, [`quote${index}`]: true }))}
              >
              Edit
              </button>
            </>
            )}
          </div>
          <div className="flex items-center">
            <Avatar className="h-10 w-10 mr-4">
            <AvatarImage src={testimonial.avatar} alt={testimonial.author} />
            <AvatarFallback>{testimonial.author.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
            {/* Editable author */}
            <div className="flex items-center gap-2">
              {isEditing[`author${index}`] ? (
              <>
                <textarea
                className="font-medium text-gray-900 w-full"
                value={testimonial.author}
                onChange={e => handleTestimonialChange(index, 'author', e.target.value)}
                />
                <button
                className="ml-2 px-2 py-1 bg-green-500 text-white rounded"
                onClick={() => handleSave(`author${index}`)}
                >
                Save
                </button>
              </>
              ) : (
              <>
                <p className="font-medium text-gray-900">{testimonial.author}</p>
                <button
                className="ml-2 px-2 py-1 bg-blue-500 text-white rounded"
                onClick={() => setIsEditing(s => ({ ...s, [`author${index}`]: true }))}
                >
                Edit
                </button>
              </>
              )}
            </div>
            {/* Editable role */}
            <div className="flex items-center gap-2">
              {isEditing[`role${index}`] ? (
              <>
                <textarea
                className="text-sm text-gray-500 w-full"
                value={testimonial.role}
                onChange={e => handleTestimonialChange(index, 'role', e.target.value)}
                />
                <button
                className="ml-2 px-2 py-1 bg-green-500 text-white rounded"
                onClick={() => handleSave(`role${index}`)}
                >
                Save
                </button>
              </>
              ) : (
              <>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
                <button
                className="ml-2 px-2 py-1 bg-blue-500 text-white rounded"
                onClick={() => setIsEditing(s => ({ ...s, [`role${index}`]: true }))}
                >
                Edit
                </button>
              </>
              )}
            </div>
            </div>
          </div>
          </CardContent>
        </Card>
        ))}
      </div>
      </div>
    </div>
  )
}

