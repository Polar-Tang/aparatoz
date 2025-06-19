"use client"

import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import Image from "next/image"
import { ProductContext } from "./products"


export function CarouselDemo() {

  const {featuredProducts} = React.useContext(ProductContext)
  const images = featuredProducts.map((p) => p.image) 
  return (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <div className="">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-0">
                  <Image src={image ? image : "/placeholder_im.png" } alt="Imagen de carousel" width={100} height={100} 
                  className="text-4xl font-semibold w-full h-full object-cover"
                  unoptimized
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
     
    </Carousel>
  )
}
