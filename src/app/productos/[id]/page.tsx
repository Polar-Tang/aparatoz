"use client"

import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Package, CreditCard, Truck } from 'lucide-react';
import Layout from '@/components/Layout';
import Link from 'next/link';
import { useParams } from 'next/navigation'
import { ProductType } from '@/types/product-type';
import Image from 'next/image';

const ProductPage = () => {
  const params = useParams();
  const slug = params.id;
  console.log("slug", slug)
  const [product, setProduct] = useState<ProductType | null>(null)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`https://fakestoreapi.com/products/${slug}`)
        const data = await res.json()
        setProduct(data)
      } catch (error) {
        setProduct(null)
        console.error("Error fetching product:", error);
      }
    }
    fetchProducts()
  }, [slug])
  
  console.log("WIth id ", slug, product)
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
            <div className="space-y-4">
              <div className="relative bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                <div className="aspect-square flex items-center justify-center">
                  <Image
                    width={400}
                    height={400}
                    src={ product?.image ||"/api/placeholder/400/400"}
                    alt={product?.title || "Product Image"}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                <button className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-white rounded-full shadow-md hover:bg-gray-50">
                  <ChevronLeft className="h-5 w-5 text-gray-600" />
                </button>
                <button className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-white rounded-full shadow-md hover:bg-gray-50">
                  <ChevronRight className="h-5 w-5 text-gray-600" />
                </button>
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
                  <p className="text-gray-600">Referencia 188G04</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">elaps</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wide">
                    Global Aesthetic Solutions & Services
                  </div>
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
                <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                  Agregar al Carrito
                </button>
                <button className="w-full bg-gray-100 text-gray-900 py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
                  Consultar Precio
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