"use client"

import React, { useCallback, useContext } from 'react'
import { Button } from './ui/button'
import { toast } from "sonner"
import { CartProctContext } from './header-navigation'
import { Trash2 } from 'lucide-react'

const DeleteCartProduct = ({ id, position, className }: { id: number, position: number, className: string }) => {
    const { setproductsCartState, setCartLen } = useContext(CartProctContext)
    const deleteProduct = useCallback(async (id: number, position: number) => {

        try {
            const resposHTTP = await fetch(`/api/cart`, {
                method: 'DELETE',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ productId: id })
            })

            await resposHTTP.json()
            const cartStorageString = localStorage.getItem('cart')
            console.log("Cart storage: ",cartStorageString)
            console.log("Is ok frokm backend: ", resposHTTP.ok)
            if (cartStorageString && resposHTTP.ok) {
                const cartStorage = JSON.parse(cartStorageString)
                cartStorage.splice(position, 1)
                localStorage.setItem("cart", JSON.stringify(cartStorage))

                setproductsCartState(cartStorage)
                setCartLen(cartStorage.length)
                toast("Item removed", {
                    description: "The item has been removed from your cart",
                    action: {
                        label: "Cerrar",
                        onClick: () => console.log("Cerrar"),
                    },
                })
                return
            } else {
                toast("Ocurrió un error", {
                    description: "Por favor intenta denuevo",
                    action: {
                        label: "Cerrar",
                        onClick: () => console.log("Cerrar"),
                    },
                })
                return
            }
        } catch (err) {
            console.log(err)
            toast("Ocurrió un error", {
                description: "Por favor intenta denuevo",
                action: {
                    label: "Cerrar",
                    onClick: () => console.log("Cerrar"),
                },
            })
            return
        }

    }, [])
    return (
        <Button onClick={() => deleteProduct(id, position)} className={className}>
            <Trash2 />
        </Button>
    )
}

export default DeleteCartProduct