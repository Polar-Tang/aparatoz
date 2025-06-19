"use client"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "./ui/button"
import { ShoppingCartIcon } from "lucide-react";
import Link from "next/link";
import { useContext, useEffect } from "react";
import { CartProctContext } from "./header-navigation";
import Image from "next/image";


export function CartSheet() {
    const {productsCartState, CartLen, setCartLen} = useContext(CartProctContext)
    console.log("The procut are: ",productsCartState)
    
    useEffect(() => {
        const cartStorageString = localStorage.getItem('cart')
        if (cartStorageString) {
            const productsCart = JSON.parse(cartStorageString)
            setCartLen(productsCart.length)
        } else {
            setCartLen(0)
        }
      
    }, [CartLen])
    

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button className="relative" variant="ghost">
                    <ShoppingCartIcon />
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
                        {CartLen}
                    </span>
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Productos carrito</SheetTitle>
                    <SheetDescription>
                        Make changes to your profile here. Click save when you&apos;re done.
                    </SheetDescription>
                </SheetHeader>
                {(!productsCartState || productsCartState.length === 0) ? (
                    <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                        <ShoppingCartIcon className="w-12 h-12 mb-4 text-gray-400" />
                        <span className="text-lg font-semibold">Tu carrito está vacío!</span>
                    </div>
                ) : (
                    productsCartState.map((item, index) => (
                        <div
                            key={index}
                            className="flex mx-auto my-8 md:my-4 border-b border-gray-200"
                        >
                            <Image
                                src={item.image}
                                alt={item.title}
                                width={18}
                                height={12}
                                className="w-18 h-12 rounded-full"
                            />
                            <div className="flex flex-col">
                                <h3 className="text-xl">{item.title}</h3>
                                <span className="text-xl text-gray-500">${item.price}</span>
                            </div>
                            <div className="flex align-middle items-center justify-center">
                                <Button className="md:ml-4 hover:bg-red-400" />
                            </div>
                        </div>
                    ))
                )}
                <SheetFooter>
                    <Link
                        href="/#"
                        className="bg-indigo-500 block text-center text-white">Contactar</Link>
                    <SheetClose asChild>
                        <Button variant="outline">Cerrar</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
