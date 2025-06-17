export type ProductType = {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  images: string[]
  rating?: {
    rate: number
    count: number
  }
}
