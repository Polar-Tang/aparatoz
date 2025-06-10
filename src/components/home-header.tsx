"use client"

import { useContext,  useState } from "react"
import Link from "next/link"
import { Search, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProductContext } from "./products"

export default function HomeHeader({ isHome }: { isHome: boolean }) {
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
              <Link href="/"  className={isHome ? "text-navy-blue border-b-2 border-navy-blue font-medium" : "text-gray-700 hover:text-navy-blue font-medium"}>
                Home
              </Link>
              <Link href="/#productos" className={isHome ? "text-gray-700 hover:text-navy-blue font-medium" : "text-navy-blue border-b-2 border-navy-blue font-medium"}>
                Products
              </Link>

              <Link href="/#about" className="text-gray-700 hover:text-navy-blue font-medium">
                About
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

