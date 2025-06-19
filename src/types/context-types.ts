import { ProductType } from "./product-type"

export type CartContext = {
    productsCartState: ProductType[],
    setproductsCartState: React.Dispatch<ProductType[]>,
    CartLen: number, 
    setCartLen: React.Dispatch<number>
    
}