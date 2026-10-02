import { useState } from 'react'
import { Flame, Sparkles } from 'lucide-react'
import { Header } from './components/Header'
import { HeroBanner } from './components/HeroBanner'
import { ProductCard } from './components/ProductCard'
import { LoginModal } from './components/LoginModal'
import { RegisterPage } from './components/RegisterPage'
import { RegisterNoticeModal } from './components/RegisterNoticeModal'
import { ProductsPage } from './components/ProductsPage'
import { topSellingProducts } from './data/products'

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'register' | 'products'>('home')
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string | undefined>(undefined)
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isAuthNoticeOpen, setIsAuthNoticeOpen] = useState(false)

  const handleRequireAuth = () => {
    setIsAuthNoticeOpen(true)
  }

  const handleGoToAuthFromNotice = () => {
    setIsAuthNoticeOpen(false)
    setIsLoginOpen(true)
  }

  const handleNavigateToProducts = (category?: string) => {
    setSelectedCategoryFilter(category)
    setCurrentView('products')
  }

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      <Header
        onOpenLogin={() => setIsLoginOpen(true)}
        onNavigateHome={() => setCurrentView('home')}
        onOpenAuthNotice={handleRequireAuth}
        onNavigateToProducts={handleNavigateToProducts}
      />

      {currentView === 'home' && (
        <main className="mx-auto max-w-7xl p-4 sm:p-6 space-y-8">
          <HeroBanner />

          <section>
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Flame size={18} className="text-rose-600" />
                <h3 className="text-base font-bold text-slate-900">Produtos mais vendidos</h3>
              </div>
              <button
                type="button"
                onClick={() => handleNavigateToProducts()}
                className="text-xs font-bold text-[#480404] hover:underline focus:outline-none"
              >
                Ver mais
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {topSellingProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleRequireAuth}
                />
              ))}
            </div>
          </section>

          <section>
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles size={18} className="text-amber-500" />
                <h3 className="text-base font-bold text-slate-900">Ofertas da Semana</h3>
              </div>
              <button
                type="button"
                onClick={() => handleNavigateToProducts()}
                className="text-xs font-bold text-[#480404] hover:underline focus:outline-none"
              >
                Ver mais
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {topSellingProducts.map((product) => (
                <ProductCard
                  key={`oferta-${product.id}`}
                  product={product}
                  onAddToCart={handleRequireAuth}
                />
              ))}
            </div>
          </section>
        </main>
      )}

      {currentView === 'products' && (
        <ProductsPage
          key={selectedCategoryFilter || 'all'}
          initialCategory={selectedCategoryFilter}
          onAddToCart={handleRequireAuth}
        />
      )}

      {currentView === 'register' && (
        <RegisterPage
          onBackToHome={() => setCurrentView('home')}
          onSuccessRegister={() => setCurrentView('home')}
        />
      )}

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onOpenRegister={() => {
          setIsLoginOpen(false)
          setCurrentView('register')
        }}
      />

      <RegisterNoticeModal
        isOpen={isAuthNoticeOpen}
        onClose={() => setIsAuthNoticeOpen(false)}
        onGoToAuth={handleGoToAuthFromNotice}
      />
    </div>
  )
}