import { CartItem } from "@/types/cart-type"
import { ProductType } from "@/types/product-type"

export const fetchCart = async (featuredProducts: ProductType[]) => {
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
                        console.log("Add "+ i)
                    }
                }
            })

        }
    console.log("Prodcart",productsCart)
        return productsCart
    }