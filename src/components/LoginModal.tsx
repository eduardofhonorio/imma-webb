import { X } from 'lucide-react'
import { useState } from 'react'

type LoginModalProps = {
  isOpen: boolean
  onClose: () => void
  onOpenRegister: () => void
}

export function LoginModal({ isOpen, onClose, onOpenRegister }: LoginModalProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Login enviado:', { email, password })
    onClose()
  }

  const handleGoToRegister = () => {
    onClose()
    onOpenRegister()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 transition-opacity">
      <div className="relative w-full max-w-md rounded-2xl bg-[#FFF9F0] p-6 shadow-2xl sm:p-8 animate-in fade-in zoom-in duration-200">
        
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1 text-slate-400 hover:bg-slate-200/50 hover:text-slate-700 transition-colors"
        >
          <X size={20} />
        </button>

        <div className="mb-6">
          <h2 className="text-2xl font-black text-slate-900 leading-tight">
            Olá, seja bem-vindo!
          </h2>
          <p className="mt-1 text-xs font-semibold text-slate-700">
            Faça seu login para continuar comprando com a gente.
          </p>
          <span className="mt-4 block text-[11px] text-slate-500">
            Entrar com e-mail e senha*
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              required
              placeholder="Digite o email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:border-[#480404] focus:outline-none focus:ring-1 focus:ring-[#480404]"
            />
          </div>

          <div>
            <input
              type="password"
              required
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:border-[#480404] focus:outline-none focus:ring-1 focus:ring-[#480404]"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-[#480404] py-3 text-sm font-bold text-white transition-colors hover:bg-[#660606] active:scale-[0.99]"
          >
            Entrar
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-slate-700">
          Não tem uma conta?{' '}
          <button
            type="button"
            onClick={handleGoToRegister}
            className="font-bold text-[#480404] hover:underline"
          >
            Cadastre-se
          </button>
        </div>
      </div>
    </div>
  )
}