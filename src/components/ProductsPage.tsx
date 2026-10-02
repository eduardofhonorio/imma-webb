import { useState, useMemo } from 'react'
import { Filter, ChevronDown } from 'lucide-react'
import { ProductCard } from './ProductCard'
import { topSellingProducts } from '../data/products'
import type { Product } from '../types/Product'

type ExtendedProduct = Product & {
  category?: string
  brand?: string
}

type ProductsPageProps = {
  onAddToCart: () => void
  initialCategory?: string
}

export function ProductsPage({ onAddToCart, initialCategory }: ProductsPageProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialCategory ? [initialCategory] : []
  )
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedPrices, setSelectedPrices] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<'relevance' | 'price-asc' | 'price-desc'>('relevance')
  const [isSortOpen, setIsSortOpen] = useState(false)

  const allProducts = topSellingProducts as ExtendedProduct[]

  const handleCategoryChange = (cat: string) => {
    setSelectedCategories(prev =>
      prev.includes(cat) ? prev.filter(item => item !== cat) : [...prev, cat]
    )
  }

  const handleBrandChange = (brand: string) => {
    setSelectedBrands(prev =>
      prev.includes(brand) ? prev.filter(item => item !== brand) : [...prev, brand]
    )
  }

  const handlePriceChange = (priceRange: string) => {
    setSelectedPrices(prev =>
      prev.includes(priceRange) ? prev.filter(item => item !== priceRange) : [...prev, priceRange]
    )
  }

  const clearFilters = () => {
    setSelectedCategories([])
    setSelectedBrands([])
    setSelectedPrices([])
  }

  const filteredProducts = useMemo(() => {
    return allProducts
      .filter(product => {
        if (selectedCategories.length > 0) {
          const matchesCategory = selectedCategories.some(cat => {
            const catLower = cat.toLowerCase()
            const prodCatLower = (product.category || '').toLowerCase()
            const prodNameLower = product.name.toLowerCase()

            if (catLower === 'alimentos' && (prodCatLower.includes('alimento') || prodNameLower.includes('achocolatado') || prodNameLower.includes('macarrão') || prodNameLower.includes('doce'))) {
              return true
            }
            if (catLower === 'bebidas' && (prodCatLower.includes('bebida') || prodNameLower.includes('leite') || prodNameLower.includes('suco') || prodNameLower.includes('refrigerante'))) {
              return true
            }
            if (catLower === 'limpeza' && (prodCatLower.includes('limpeza') || prodNameLower.includes('detergente') || prodNameLower.includes('sabão') || prodNameLower.includes('desinfetante'))) {
              return true
            }
            if ((catLower === 'higiene e beleza' || catLower === 'higiene') && (prodCatLower.includes('higiene') || prodNameLower.includes('sabonete') || prodNameLower.includes('shampoo') || prodNameLower.includes('creme'))) {
              return true
            }

            return prodCatLower.includes(catLower) || prodNameLower.includes(catLower)
          })
          if (!matchesCategory) return false
        }

        if (selectedBrands.length > 0) {
          const matchesBrand = selectedBrands.some(brand =>
            (product.brand || '').toLowerCase().includes(brand.toLowerCase()) ||
            product.name.toLowerCase().includes(brand.toLowerCase())
          )
          if (!matchesBrand) return false
        }

        if (selectedPrices.length > 0) {
          const matchesPrice = selectedPrices.some(range => {
            if (range === 'Até R$ 10,00') return product.price <= 10
            if (range === 'R$ 10,00 - R$ 20,00') return product.price > 10 && product.price <= 20
            if (range === 'R$ 20,00 - R$ 50,00') return product.price > 20 && product.price <= 50
            if (range === 'Acima de R$ 50,00') return product.price > 50
            return true
          })
          if (!matchesPrice) return false
        }

        return true
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price
        if (sortBy === 'price-desc') return b.price - a.price
        return 0
      })
  }, [allProducts, selectedCategories, selectedBrands, selectedPrices, sortBy])

  return (
    <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
      <h2 className="mb-8 text-center text-2xl font-black text-slate-900 sm:text-3xl">
        Confira nossos melhores preços e variedades!
      </h2>

      <div className="flex flex-col gap-8 lg:flex-row">
        <aside className="w-full lg:w-64 shrink-0">
          <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-4 flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <Filter size={18} className="text-[#480404]" />
                <h3 className="text-base font-bold text-slate-900">Filtros</h3>
              </div>
              {(selectedCategories.length > 0 || selectedBrands.length > 0 || selectedPrices.length > 0) && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-xs font-semibold text-[#480404] hover:underline"
                >
                  Limpar
                </button>
              )}
            </div>

            <div className="mb-6 border-b border-slate-200 pb-4">
              <h4 className="mb-3 text-sm font-bold text-slate-800">Categoria</h4>
              <div className="space-y-2 text-xs font-semibold text-slate-600">
                {['Alimentos', 'Bebidas', 'Higiene e Beleza', 'Limpeza'].map(cat => (
                  <label key={cat} className="flex items-center gap-2.5 cursor-pointer hover:text-[#480404]">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(cat)}
                      onChange={() => handleCategoryChange(cat)}
                      className="h-4 w-4 rounded border-slate-300 text-[#480404] focus:ring-[#480404]"
                    />
                    <span>{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-6 border-b border-slate-200 pb-4">
              <h4 className="mb-3 text-sm font-bold text-slate-800">Marca</h4>
              <div className="space-y-2 text-xs font-semibold text-slate-600">
                {['Nestlé', 'Nissin', 'Ypê', 'Italac'].map(brand => (
                  <label key={brand} className="flex items-center gap-2.5 cursor-pointer hover:text-[#480404]">
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand)}
                      onChange={() => handleBrandChange(brand)}
                      className="h-4 w-4 rounded border-slate-300 text-[#480404] focus:ring-[#480404]"
                    />
                    <span>{brand}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h4 className="mb-3 text-sm font-bold text-slate-800">Preço</h4>
              <div className="space-y-2 text-xs font-semibold text-slate-600">
                {[
                  'Até R$ 10,00',
                  'R$ 10,00 - R$ 20,00',
                  'R$ 20,00 - R$ 50,00',
                  'Acima de R$ 50,00'
                ].map(priceRange => (
                  <label key={priceRange} className="flex items-center gap-2.5 cursor-pointer hover:text-[#480404]">
                    <input
                      type="checkbox"
                      checked={selectedPrices.includes(priceRange)}
                      onChange={() => handlePriceChange(priceRange)}
                      className="h-4 w-4 rounded border-slate-300 text-[#480404] focus:ring-[#480404]"
                    />
                    <span>{priceRange}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        <div className="flex-1">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm font-bold text-[#480404]">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'produto encontrado' : 'produtos encontrados'}
            </span>

            <div className="relative">
              <button
                type="button"
                onClick={() => setIsSortOpen(!isSortOpen)}
                className="flex items-center gap-1.5 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm cursor-pointer hover:bg-slate-50"
              >
                <span>
                  {sortBy === 'relevance' && 'Relevância'}
                  {sortBy === 'price-asc' && 'Menor Preço'}
                  {sortBy === 'price-desc' && 'Maior Preço'}
                </span>
                <ChevronDown size={14} className="text-slate-500" />
              </button>

              {isSortOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setIsSortOpen(false)}
                  />
                  <div className="absolute right-0 top-full z-20 mt-1 w-40 rounded-md border border-slate-100 bg-white py-1 shadow-lg text-xs font-semibold text-slate-700">
                    <button
                      type="button"
                      onClick={() => { setSortBy('relevance'); setIsSortOpen(false) }}
                      className="w-full px-3 py-2 text-left hover:bg-slate-50 hover:text-[#480404]"
                    >
                      Relevância
                    </button>
                    <button
                      type="button"
                      onClick={() => { setSortBy('price-asc'); setIsSortOpen(false) }}
                      className="w-full px-3 py-2 text-left hover:bg-slate-50 hover:text-[#480404]"
                    >
                      Menor Preço
                    </button>
                    <button
                      type="button"
                      onClick={() => { setSortBy('price-desc'); setIsSortOpen(false) }}
                      className="w-full px-3 py-2 text-left hover:bg-slate-50 hover:text-[#480404]"
                    >
                      Maior Preço
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={onAddToCart}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 p-12 text-center bg-slate-50">
              <p className="text-base font-bold text-slate-700">Nenhum produto encontrado</p>
              <p className="text-xs text-slate-500 mt-1">Tente selecionar outros filtros ou limpar a seleção atual.</p>
              <button
                type="button"
                onClick={clearFilters}
                className="mt-4 rounded-md bg-[#480404] px-4 py-2 text-xs font-bold text-white hover:bg-[#5c0505] transition-colors"
              >
                Limpar Filtros
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}