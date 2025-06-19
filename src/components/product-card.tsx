"use client"

import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { ProductType } from "@/types/product-type"
import Link from "next/link"
import AddCartButton from "./add-cart-button"


export default function ProductCard({product}: {product: ProductType}) {


  return (
    <Card className="w-full max-w-[240px] overflow-hidden border-none shadow-none flex align-center justify-center" >
      <CardContent className="p-4 flex flex-col items-center">
        <div className="mb-2 h-48 w-full relative flex items-center justify-center">
          <Image
            src={product.image}
            alt={product.title}
            width={240}
            height={180}
            className="object-fit w-[200px] h-[180px]"
            unoptimized
          />
        </div>

        <div className="text-center space-y-1">
          <h3 className="text-2xl text-indigo-900 font-medium h-20">
            {product.title}
          </h3>
            <br />

          <div className="flex items-center justify-center -mt-10 md:gap-2 md:mt-2">
            <span className="text-lg font-bold">{product.price}</span>
            <span className="text-sm text-gray-500 line-through">${Math.round(product.price*2-(product.price*0.2))}</span>
          </div>

          <div className="flex items-center justify-center text-sm text-gray-700 mt-1">
            <span className="font-semibold text-green-700">${product.price}</span>
            
          </div>
        </div>
      </CardContent>

      <CardFooter className="grid grid-col grid-rows-2  ">
        <AddCartButton 
        classname="w-full rounded-full bg-indigo-900 text-white rounded-full flex items-center align-center justify-center text-lg" 
        id={product.id} />
        <Link href={`/productos/${product.id}`} className="w-full rounded-full bg-pink-600 text-white rounded-full flex items-center align-center justify-center text-lg">Ver detalle</Link>
      </CardFooter>
    </Card>
  )
}

