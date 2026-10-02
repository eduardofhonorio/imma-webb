import { Heart, ShoppingCart } from 'lucide-react'
import type { Product } from '../types/Product'

type ProductCardProps = {
  product: Product
  onAddToCart?: () => void 
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <div className="flex flex-col justify-between rounded-lg border border-slate-200 bg-white p-3 shadow-sm hover:shadow-md transition-shadow">
      <div>
        <div className="flex items-center justify-between">
          {product.discountPercentage ? (
            <span className="rounded bg-[#480404] px-1.5 py-0.5 text-[10px] font-bold text-white">
              -{product.discountPercentage}%
            </span>
          ) : <span />}
          <button type="button" className="text-slate-400 hover:text-rose-600">
            <Heart size={16} />
          </button>
        </div>

        <div className="my-2 flex h-28 items-center justify-center overflow-hidden">
          <img src={product.imageUrl} alt={product.name} className="h-full object-contain" />
        </div>

        <h4 className="line-clamp-2 text-xs font-bold text-slate-800 leading-snug">
          {product.name}
        </h4>
        <p className="text-[10px] text-slate-400">{product.brand}</p>
      </div>

      <div className="mt-3">
        {product.originalPrice && (
          <span className="block text-[10px] text-slate-400 line-through">
            R$ {product.originalPrice.toFixed(2).replace('.', ',')}
          </span>
        )}
        <div className="flex items-baseline gap-1">
          <span className="text-sm font-extrabold text-[#480404]">
            R$ {product.price.toFixed(2).replace('.', ',')}
          </span>
          <span className="text-[9px] text-slate-500">/{product.unit}</span>
        </div>

        <button
          type="button"
          onClick={onAddToCart} // mostra o aviso de cadastro obrigatorio
          className="mt-2 flex w-full items-center justify-center gap-1 rounded bg-[#480404] py-1.5 text-xs font-semibold text-white transition-colors hover:bg-[#5e0505] active:scale-[0.98]"
        >
          <ShoppingCart size={14} />
          Adicionar
        </button>
      </div>
    </div>
  )
}