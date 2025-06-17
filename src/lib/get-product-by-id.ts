import { ProductType } from "@/types/product-type"

const getProductById = async (id: number) => {
    const res = await fetch("/productos_mock.json")
    const products: ProductType[] = await res.json()
    const product = products.find((p) => p.id === id)
    return product
}
export default getProductById