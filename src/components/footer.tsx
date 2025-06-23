"use client"

import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import React from "react"

export default function Footer() {
  const [isEditing, setIsEditing] = React.useState<boolean>(false)
  // const [storedText, setstoredText] = React.useState(second)
  const [justifyText, setjustifyText] = React.useState("Providing the best products for your pets since 2010. Quality products for happy pets and happy owners.")
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem("footerText")
    if (stored) {
      setjustifyText(stored)
    }
  }
  function handleSave() {
    localStorage.setItem("footerText", String(justifyText))

    setIsEditing(false)
  }
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white text-lg font-bold mb-4">PetCare</h3>
            {isEditing ? (
              <>
                <textarea
                  className=" mb-4"
                  value={justifyText}
                  onChange={e => setjustifyText(e.target.value)}
                />
                <button
                  className="ml-2 px-2 py-1 bg-green-500 text-white rounded"
                  onClick={() => handleSave()}
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <p className="mb-4">
                  {justifyText}
                </p>
                <button
                  className="ml-2 px-2 py-1 bg-blue-500 text-white rounded"
                  onClick={() => setIsEditing(true)}
                >
                  Edit
                </button>
              </>
            )}
            <div className="flex space-x-4">
              <Link href="#" className="hover:text-white">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="hover:text-white">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="hover:text-white">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="hover:text-white">
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-white text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-white">
                  Products
                </Link>
              </li>
              <li>
                <Link href="#about" className="hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                <span>Buenos Aires, Argentina</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2" />
                {/* num rodri */}
                <span>(123) 456-7890</span>
              </li>
              {/* mail */}
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                <span>info@petcare.com</span>
              </li>
            </ul>
          </div>

          {/* Crear un db collection */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Newsletter</h3>
            <p className="mb-4">Subscribe to our newsletter for the latest updates and offers.</p>
            <div className="flex flex-col sm:flex-row gap-2">
              <Input type="email" placeholder="Your email" className="bg-gray-800 border-gray-700 text-white" />
              <Button className="bg-pink-600 hover:bg-pink-700 text-white">Subscribe</Button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} PetCare. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

