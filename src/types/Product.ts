export type Product = {
  id: number
  name: string
  brand: string
  category: string
  imageUrl: string
  originalPrice?: number
  price: number
  unit: string
  discountPercentage?: number
}