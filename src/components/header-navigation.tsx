"use client"

import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import Link from "next/link"
import { Search, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProductContext } from "./products"
import { CartSheet } from "./cart-sheet"
import { ProductType } from "@/types/product-type"
import { CartContext } from "@/types/context-types"
import { CartItem } from "@/types/cart-type"

export const CartProctContext = createContext({} as CartContext);

export function ProductsCartProvider({ children }: { children: ReactNode }) {
  const [productsCartState, setproductsCartState] = useState([] as ProductType[])
  const { featuredProducts } = useContext(ProductContext)
  const [CartLen, setCartLen] = useState(0)
  useEffect(() => {
    const fetchCart = async () => {
      try {

        const data = fetch("/api/cart", {
          credentials: "include"
        })
        const res = await (await data).json()
        if (!res.success) {
          return null
        }
        console.log("The response frfom trhe backend ", res)
        console.log("fEATURED PRODUCT ARE: ", featuredProducts)
        const items = res.item as CartItem[]
        const productsCart: ProductType[] = []
        if (items) {
          items.forEach((productCart, i) => {
            const product = featuredProducts.find((p) => p.id === productCart.product_id)
            console.log("Rpoduct found: ", product)
            if (product) {
              for (let q = 0; q < productCart.quantity; q++) {
                productsCart.push(product)
                console.log("Add " + i)
              }
            }
          })

        }
        console.log("Prodcart", productsCart)
        setproductsCartState(productsCart)
        setCartLen(productsCart.length)
        localStorage.setItem("cart", JSON.stringify(productsCart))
      } catch (err) {
        console.log(err)
      }
    }
    fetchCart()
  }, [featuredProducts])
  return (
    <CartProctContext.Provider value={{
      productsCartState,
      setproductsCartState,
      CartLen,
      setCartLen
    }}>
      {children}
    </CartProctContext.Provider>
  );
}

export default function Header({ isHome }: { isHome: boolean }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { setChangeProducts, featuredProducts } = useContext(ProductContext)



  const search = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target
    const newProducts = featuredProducts.filter((p) => String(p.title).toLocaleLowerCase().includes(String(target.value).toLocaleLowerCase()))
    setChangeProducts(newProducts)
  }



  return (
    <header className={`fixed w-full translate-y-0 bg-white shadow-sm top-0 z-10`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <span className="text-xl font-bold text-navy-blue">PetCare</span>
          </div>

          <nav className="hidden md:flex space-x-8">
            <Link href="/#" className={isHome ? "text-navy-blue border-b-2 border-navy-blue font-medium" : "text-gray-700 hover:text-navy-blue font-medium"}>
              Home
            </Link>
            <Link href="/#productos" className={isHome ? "text-gray-700 hover:text-navy-blue font-medium" : "text-navy-blue border-b-2 border-navy-blue font-medium"}>
              Products
            </Link>

            <Link href="/#about" className="text-gray-700 hover:text-navy-blue font-medium">
              About
            </Link>
          </nav>

          {/* Search and Cart */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="pl-10 pr-4 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-navy-blue/20 w-64"
                onChange={(e) => search(e)}
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>

            <CartSheet />
          </div>

          <div className="md:hidden flex items-center">
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex items-center mb-4">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="pl-10 pr-4 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-navy-blue/20 w-full"
                />
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              </div>

            </div>
            <nav className="flex flex-col space-y-4">
              <Link href="/" className={isHome ? "text-navy-blue border-b-2 border-navy-blue font-medium" : "text-gray-700 hover:text-navy-blue font-medium"}>
                Home
              </Link>
              <Link href="/#productos" className={isHome ? "text-gray-700 hover:text-navy-blue font-medium" : "text-navy-blue border-b-2 border-navy-blue font-medium"}>
                Products
              </Link>

              <Link href="/#about" className="text-gray-700 hover:text-navy-blue font-medium">
                About
              </Link>
              <div className="text-gray-700 hover:text-navy-blue font-medium text-start">

                <CartSheet />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

