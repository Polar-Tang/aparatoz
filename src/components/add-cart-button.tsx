"use client"

import React, { useContext } from 'react'
import { Button } from './ui/button'
import { toast } from "sonner"
import { CartProctContext } from './header-navigation'
import { ProductContext } from './products'
import { ProductType } from '@/types/product-type'

const AddCartButton = ({ id, classname }: { id: number, classname: string }) => {
    const { setproductsCartState, setCartLen } = useContext(CartProctContext)
    const { featuredProducts } = useContext(ProductContext)
    const addProduct = React.useCallback(async (id: number) => {

        const product = featuredProducts.find((p) => p.id === id)

        try {
            if (!product) {
                toast(`Ocurrió un error`, {
                    description: `Producto no encontrado`,
                    action: {
                        label: "Cerrar",
                        onClick: () => console.log("Cerrar"),
                    },
                })
                throw new Error("Producto no encontrado")
            }
            await fetch(`/api/cart`, {
                method: 'POST',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ productId: id, quantity: 1 })
            })

            // GET BODY
            const cartStorageString = localStorage.getItem('cart')
            if (cartStorageString) {
                const cartStorage = JSON.parse(cartStorageString)
                cartStorage.push(product)
                localStorage.setItem("cart", cartStorage)

                setproductsCartState(cartStorage)
                toast(`${product?.title} añadido`, {
                    description: `${product?.description}`,
                    action: {
                        label: "Añadido",
                        onClick: () => console.log("Añadido"),
                    },
                })
                setCartLen(1)
                return
            } else if (!cartStorageString) {
                
                const cartStorage: ProductType[] = []
                cartStorage.push(product)
                localStorage.setItem("cart", JSON.stringify(cartStorage))
                console.log(cartStorage, "Iasdrtfaz")
                setproductsCartState(cartStorage)
                toast(`${product?.title} añadido`, {
                    description: `${product?.description}`,
                    action: {
                        label: "Añadido",
                        onClick: () => console.log("Añadido"),
                    },
                })
                setCartLen(1)
                return
            }
        } catch (err) {
            console.log(err)
            toast("Ocurrió un error", {
                description: `No podemos añadir ${product?.title} en este momento`,
                action: {
                    label: "Cerrar",
                    onClick: () => console.log("Cerrar"),
                },
            })

        }

    }, [])
    return (
        <Button onClick={() => addProduct(id)} variant="none" className={classname} >
            Añadir al carrito
        </Button>
    )
}

export default AddCartButton