import { CarouselDemo } from "./carousel"

export default function Hero() {
  return (
    <div className="relative bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              The Best Care For Your Furry Friends
            </h1>
            <p className="text-lg text-gray-600">
              Discover premium products for your pets. From cleaning solutions to grooming tools, we have everything you
              need to keep your pets happy and healthy.
            </p>
            
          </div>
          <div className="relative h-64 md:h-96 flex align-center justify-center">
            <CarouselDemo
              // className="object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

