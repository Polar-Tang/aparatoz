"use client"
 
import { ProductType } from "@/types/product-type";
import React, { useEffect, createContext, useState, ReactNode } from "react"

interface ProductsContextProps {
    featuredProducts: ProductType[],
    setFeaturedProducts: React.Dispatch<React.SetStateAction<ProductType[]>>,
    changeProducts: ProductType[],
    setChangeProducts: React.Dispatch<React.SetStateAction<ProductType[]>>,
}

export const ProductContext = createContext({} as ProductsContextProps);

export function ProductsProvider({children}: {children: ReactNode}) {

  const [featuredProducts, setFeaturedProducts] = useState<ProductType[]>([])
  const [changeProducts, setChangeProducts] = useState<ProductType[]>([])


  useEffect(() => {
    async function fetchProducts() {
      try {
        // const res = await fetch("https://fakestoreapi.com/products")
        const res = await fetch("/productos_mock.json")
        const data = await res.json()
        setFeaturedProducts(data)
        setChangeProducts(data)
      } catch (error) {
        setFeaturedProducts([])
        console.error("Error fetching products:", error);
      }
    }
    fetchProducts()
  }, [])

  return (
    <ProductContext.Provider value={ {featuredProducts, setFeaturedProducts, changeProducts, setChangeProducts} }>
      {children}
    </ProductContext.Provider>
  );
}