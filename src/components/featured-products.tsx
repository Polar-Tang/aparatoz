"use client"

import ProductCard from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { useContext, useEffect, useState } from "react";
import { ProductContext } from "./products";
import { CartProctContext } from "./header-navigation";

export default function FeaturedProducts() {
  const {changeProducts} = useContext(ProductContext);
  const [showAll, setShowAll] = useState<boolean>(false)
  const [productsToShow, setproductsToShow] = useState(0)
  const productsFitScreenQuatity = () => {
    const md = 768
    const sm = 640
    const mqlsm = window.matchMedia(`(max-width: ${sm - 1}px)`)
    if (mqlsm.matches) {
      return 3
    }
    const mqlmd = window.matchMedia(`(max-width: ${md - 1}px)`)
    if (mqlmd.matches) {
      return 6
    }
    const lg = 1024
    const mqllg = window.matchMedia(`(max-width: ${lg}px)`)
    if (mqllg.matches) {
      return 8

    }
  }
  useEffect(() => {
   const quantity = productsFitScreenQuatity()
   setproductsToShow(quantity || 8)
  }, [])
  
   const {productsCartState} = useContext(CartProctContext)
  
  console.log("The procut are: ",productsCartState)
  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Equipos Disponibles</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Adquiri el próximo equipo para tu centro de estética al mejor precio.
          </p>
        </div>

        <div className="flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-54 lg:grid-cols-4 lg:gap-2" id="productos">
            {changeProducts.slice(0, showAll ? changeProducts.length : productsToShow).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
        {changeProducts.length > 8 && (
          <div className="text-center mt-6">
            <Button
              className="bg-gray-200 text-gray-800"
              onClick={() => setShowAll((prev) => !prev)}
            >
              {showAll ? "Ver menos" : "Ver más"}
            </Button>
          </div>
        )}

        <div className="text-center mt-12">
          <Button className="bg-navy-blue hover:bg-navy-blue/90 text-white">View All Products</Button>
        </div>
      </div>
    </div>
  )
}

