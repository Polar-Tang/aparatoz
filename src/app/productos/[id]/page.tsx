"use client"

import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Package, CreditCard, Truck } from 'lucide-react';
import Layout from '@/components/Layout';
import Link from 'next/link';
import { useParams } from 'next/navigation'
import { ProductType } from '@/types/product-type';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import getProductById from '@/lib/get-product-by-id';
import { CarouselComponent } from './Carousel';

const ProductPage = () => {
  const params = useParams();
  const slug = params.id;
  const [product, setProduct] = useState<ProductType | null>(null)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // const res = await fetch(`https://fakestoreapi.com/products/${slug}`)
        // const data = await res.json()
        if (!slug) {
          throw new Error("No product slug provided");
        }
        const data = await getProductById(Number(slug))
        if (typeof data === "object") {
          setProduct(data)
        }
        console.log("DATA : ", data)
        console.log("Products set: ", product)
      } catch (error) {
        setProduct(null)
        console.error("Error fetching product:", error);
      }
    }
    fetchProducts()
  }, [slug])

  return (
    <Layout isHome={false}>

      <div className="min-h-screen bg-gray-50">
        {/* Breadcrumb Navigation */}
        <nav className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-2 py-4 text-sm text-gray-500">
              <span>
                <Link href="/#">
                  Inicio
                </Link>
              </span>
              <span>/</span>
              <span>
                <Link href="/#productos">
                  Aparatología
                </Link>
              </span>
              <span>/</span>
              <span>Equipos De Cosmética Personal</span>
              <span>/</span>
              <span>Equipos Hogareños</span>
              <span>/</span>
              <span className="text-gray-900">Cepillo De Limpieza - Sonic Cleansing Brush</span>
            </div>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="">
              <div className="relative bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                <div className="aspect-square flex items-center justify-center">
                  {(product?.images && product.images.length > 0 ) ? (
                    <CarouselComponent images={product.images} />
                  ) :
                    (
                      <Image
                        width={400}
                        height={400}
                        src={product?.image || "/placeholder_im.png"}
                        alt={product?.title || "Product Image"}
                        className="max-w-full max-h-full object-contain"
                      />
                    )
                  }
                </div>
                
              </div>
            </div>

            {/* Product Details Section */}
            <div className="space-y-6">
              {/* Header with Logo */}
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    CEPILLO DE LIMPIEZA - SONIC CLEANSING BRUSH
                  </h1>
                </div>

              </div>

              {/* Product Description */}
              <div className="prose text-gray-700">
                <p>
                  Set de cepillos para acompañar tratamientos cosméticos con cuatro
                  opciones de cepillos y cuatro funciones específicas: Dermoabrasión -
                  Piel sensible - Esponja/ Limpieza profunda reductor de arrugas.
                </p>
              </div>

              {/* Shipping Information */}
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-4 bg-white rounded-lg border border-gray-200">
                  <Package className="h-8 w-8 text-gray-600" />
                  <div>
                    <h3 className="font-semibold text-gray-900">ENVÍOS A TODO EL PAÍS</h3>
                    <p className="text-sm text-gray-600">CONSULTÁ MÉTODOS DE ENVÍO</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-white rounded-lg border border-gray-200">
                  <CreditCard className="h-8 w-8 text-gray-600" />
                  <div>
                    <h3 className="font-semibold text-gray-900">MEDIOS DE PAGO</h3>
                    <p className="text-sm text-gray-600">CONSULTÁ MEDIOS DISPONIBLES</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                {/* wpp */}
                <Link href="https://l.facebook.com/l.php?u=https%3A%2F%2Fapi.whatsapp.com%2Fsend%3Fphone%3D5491163099651%26text%3DEnlace%253A%250Ahttps%253A%252F%252Ffb.me%252F5GsaN2UFX%250A%250AVi%2520esto%2520en%2520Facebook...%26context%3DAfcRhfDvR1WMda8jXhT4GsISQI0C-3Pf-Zb9QzliTzFitGA7-NUGUx24Ecp7JaEXkTC2lqyX2AlhAlXk5C2bNKddxZ0UcW93iD0UZPhBdQTtW3FTtH5dUN9UVMQFMsjir58J67Fuu96yubaZalBHiVR5tg%26source%26app%3Dfacebook%26fbclid%3DIwZXh0bgNhZW0CMTAAYnJpZBEwOGgyOVI4NmJyOE8wNmVlbAEeQxyap87BzAJfvmhpQGiVVL8COiRATGkozc-b7kD-wyzK4EjuLkNhgTbEuUo_aem_wCgvwFBBncQJmpPrfEebYg&h=AT2DTbwbUEroaaNOxV7kXCCTWVmsdre36l4RQlqvbUHBkRr6CKDhZgp_B6EokK0X-UQvapV1QrybW6OeUtQZKv_x9sWclhH_8Y_kqysqsT_psrTRBdsmMOyO4d4HBK2Wkul0NKgW4odeTw&__tn__=-UK-R&c[0]=AT3mInAYzDxs3hzH3sKAqJoTFqJ5ZASGdkfBGcDz5gujHdgGQ74oavfFKMrHgNNDvnLVzte39whLed0GuFbSRactMfbJHzHiafWycmK-D0OcKvGDeZFlJNY5aeimFNyMH6ZiPepYSQ2JFO9h0YHU6VvtUYp3tVguuDyH9mvbB4CIQRAKba7-fpsDWaLFz8mYWTJNhAg7rMfVlR3ScpOhnM_LJRDm" className="block text-center w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                  Enviar mensaje
                </Link>
                {/* llamada */}
                <button className="w-full bg-gray-100 text-gray-900 py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
                  Llamada telefónica
                </button>
              </div>

              {/* Additional Information */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2 text-blue-800">
                  <Truck className="h-5 w-5" />
                  <span className="text-sm font-medium">Envío gratis en compras superiores a $50.000</span>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Product Information */}
          <div className="mt-12 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Detalles del Producto</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Características:</h3>
                <ul className="space-y-1 text-gray-700">
                  <li>• 4 opciones de cepillos intercambiables</li>
                  <li>• Función de dermoabrasión</li>
                  <li>• Modo para piel sensible</li>
                  <li>• Limpieza profunda</li>
                  <li>• Reductor de arrugas</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Incluye:</h3>
                <ul className="space-y-1 text-gray-700">
                  <li>• Dispositivo principal</li>
                  <li>• 4 cabezales de cepillo</li>
                  <li>• Esponja para limpieza</li>
                  <li>• Manual de instrucciones</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductPage;