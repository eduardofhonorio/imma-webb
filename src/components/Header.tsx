import { useState } from 'react'
import {
  Search,
  ShoppingCart,
  User,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  Menu,
  Wine,
  Sparkles,
  SprayCan,
  ShoppingBag,
  Cookie,
  Utensils
} from 'lucide-react'

type HeaderProps = {
  onOpenLogin?: () => void
  onNavigateHome?: () => void
  onOpenAuthNotice?: () => void
  onNavigateToProducts?: (category?: string) => void
}

export function Header({
  onOpenLogin,
  onNavigateHome,
  onOpenAuthNotice,
  onNavigateToProducts
}: HeaderProps) {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false)

  const categories = [
    { name: 'Bebidas', slug: 'bebidas', icon: Wine },
    { name: 'Higiene e Beleza', slug: 'higiene', icon: Sparkles },
    { name: 'Limpeza', slug: 'limpeza', icon: SprayCan },
    { name: 'Mercearia', slug: 'mercearia', icon: ShoppingBag },
    { name: 'Doces', slug: 'doces', icon: Cookie },
    { name: 'Utilitários', slug: 'utilitarios', icon: Utensils }
  ]

  return (
    <header className="relative w-full bg-[#480404] text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        <button
          type="button"
          onClick={onNavigateHome}
          className="flex items-center gap-1 text-left focus:outline-none"
        >
          <span className="text-2xl font-black italic tracking-tighter text-white">IMMA</span>
          <span className="text-xs font-semibold uppercase tracking-widest text-slate-200">
            atacadista
          </span>
        </button>

        <div className="relative flex-1 max-w-2xl">
          <input
            type="text"
            placeholder="Buscar produtos, marcas e etc..."
            className="w-full rounded-full bg-white py-2 pl-4 pr-10 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
            <Search size={18} />
          </button>
        </div>

        <div className="flex items-center gap-6">
          <div
            onClick={onOpenAuthNotice}
            className="flex items-center gap-2 cursor-pointer hover:opacity-90 transition-opacity"
          >
            <ShoppingCart size={24} />
            <div className="text-xs">
              <span className="block text-slate-300">Carrinho</span>
              <span className="font-bold">R$ 0,00</span>
            </div>
          </div>

          <button
            type="button"
            onClick={onOpenLogin}
            className="flex items-center gap-2 text-left hover:opacity-90 transition-opacity"
          >
            <User size={24} />
            <div className="text-xs">
              <span className="block font-bold">Acesse sua Conta</span>
              <span className="text-slate-300 text-[11px] flex items-center gap-0.5">
                ou Cadastre-se <ChevronDown size={12} />
              </span>
            </div>
          </button>
        </div>
      </div>

      <div className="bg-white text-slate-800 text-xs border-b border-slate-200">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-1.5">
          <div className="flex items-center gap-6">
            
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                className="flex w-56 items-center justify-between rounded-sm bg-[#480404] px-4 py-2 font-bold text-white hover:bg-[#5c0505] transition-colors focus:outline-none"
              >
                <div className="flex items-center gap-2">
                  <Menu size={18} />
                  <span>Todas categorias</span>
                </div>
                {isCategoriesOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>

              {isCategoriesOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40 cursor-default"
                    onClick={() => setIsCategoriesOpen(false)}
                  />

                  <div className="absolute left-0 top-full z-50 w-56 bg-white shadow-xl border-x border-b border-slate-100 py-1">
                    <ul className="flex flex-col">
                      {categories.map((cat) => {
                        const IconComponent = cat.icon
                        return (
                          <li key={cat.slug}>
                            <button
                              type="button"
                              onClick={() => {
                                setIsCategoriesOpen(false)
                                onNavigateToProducts?.(cat.name)
                              }}
                              className="flex w-full items-center justify-between px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-[#FFF9F0] hover:text-[#480404] transition-colors text-left"
                            >
                              <div className="flex items-center gap-3">
                                <IconComponent size={20} className="text-[#480404]" />
                                <span>{cat.name}</span>
                              </div>
                              <ChevronRight size={16} className="text-[#480404]" />
                            </button>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                </>
              )}
            </div>

            <nav className="flex items-center gap-6 font-bold text-[#480404] whitespace-nowrap text-sm">
              <button
                type="button"
                onClick={() => onNavigateToProducts?.()}
                className="hover:underline focus:outline-none"
              >
                Produtos
              </button>
              <button
                type="button"
                onClick={() => onNavigateToProducts?.('Limpeza')}
                className="hover:underline focus:outline-none"
              >
                Limpeza
              </button>
              <button
                type="button"
                onClick={() => onNavigateToProducts?.('Bebidas')}
                className="hover:underline focus:outline-none"
              >
                Bebidas
              </button>
              <button
                type="button"
                onClick={() => onNavigateToProducts?.('Ofertas da Semana')}
                className="hover:underline focus:outline-none"
              >
                Ofertas da Semana
              </button>
              <button
                type="button"
                onClick={() => onNavigateToProducts?.('Higiene e Beleza')}
                className="hover:underline focus:outline-none"
              >
                Higiene
              </button>
              <button
                type="button"
                onClick={() => onNavigateToProducts?.('Churrasco')}
                className="hover:underline focus:outline-none"
              >
                Churrasco
              </button>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}