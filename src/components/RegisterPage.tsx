import { User, Truck, ArrowLeft, Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'

type RegisterPageProps = {
  onBackToHome: () => void
  onSuccessRegister: () => void
}

export function RegisterPage({ onBackToHome, onSuccessRegister }: RegisterPageProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errorPassword, setErrorPassword] = useState('')

  // Estado do Formulario
  const [formData, setFormData] = useState({
    email: '',
    nomeCompleto: '',
    cpf: '',
    telefone: '',
    senha: '',
    confirmarSenha: '',
    cep: '',
    endereco: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: 'MG',
    nomeDestinatario: '',
    referenciaEntrega: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    if (name === 'senha' || name === 'confirmarSenha') {
      setErrorPassword('')
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validaçao de Senha
    if (formData.senha.length < 6) {
      setErrorPassword('A senha deve ter no mínimo 6 caracteres.')
      return
    }

    if (formData.senha !== formData.confirmarSenha) {
      setErrorPassword('As senhas digitadas não coincidem.')
      return
    }

    console.log('Dados do Cadastro enviados:', formData)
    alert('Cadastro realizado com sucesso!')
    onSuccessRegister()
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <button
        type="button"
        onClick={onBackToHome}
        className="mb-6 flex items-center gap-2 text-xs font-bold text-[#480404] hover:underline"
      >
        <ArrowLeft size={16} />
        Voltar 
      </button>

      <div className="mb-8 text-center">
        <h2 className="text-3xl font-black text-slate-900">Cadastre-se</h2>
        <p className="mt-1 text-sm text-slate-600">Informe seus dados cadastrais</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid gap-8 lg:grid-cols-2">
          
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
              <User size={22} className="text-[#480404]" />
              <div>
                <h3 className="text-base font-bold text-[#480404]">Dados Pessoais</h3>
                <p className="text-[11px] text-slate-500">
                  Solicitamos apenas as informações essenciais para a realização da compra
                </p>
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-xs font-bold text-slate-800 mb-1">
                E-mail*
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus:border-[#480404] focus:outline-none focus:ring-1 focus:ring-[#480404]"
              />
            </div>

            <div>
              <label htmlFor="nomeCompleto" className="block text-xs font-bold text-slate-800 mb-1">
                Nome Completo*
              </label>
              <input
                type="text"
                id="nomeCompleto"
                name="nomeCompleto"
                required
                value={formData.nomeCompleto}
                onChange={handleChange}
                className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus:border-[#480404] focus:outline-none focus:ring-1 focus:ring-[#480404]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="cpf" className="block text-xs font-bold text-slate-800 mb-1">
                  CPF*
                </label>
                <input
                  type="text"
                  id="cpf"
                  name="cpf"
                  required
                  placeholder="000.000.000-00"
                  value={formData.cpf}
                  onChange={handleChange}
                  className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus:border-[#480404] focus:outline-none focus:ring-1 focus:ring-[#480404]"
                />
              </div>

              <div>
                <label htmlFor="telefone" className="block text-xs font-bold text-slate-800 mb-1">
                  Telefone*
                </label>
                <input
                  type="text"
                  id="telefone"
                  name="telefone"
                  required
                  placeholder="(00) 00000-0000"
                  value={formData.telefone}
                  onChange={handleChange}
                  className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus:border-[#480404] focus:outline-none focus:ring-1 focus:ring-[#480404]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <div>
                <label htmlFor="senha" className="block text-xs font-bold text-slate-800 mb-1">
                  Senha*
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="senha"
                    name="senha"
                    required
                    placeholder="Mínimo 6 caracteres"
                    value={formData.senha}
                    onChange={handleChange}
                    className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 pr-9 text-sm text-slate-800 focus:border-[#480404] focus:outline-none focus:ring-1 focus:ring-[#480404]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="confirmarSenha" className="block text-xs font-bold text-slate-800 mb-1">
                  Confirmar Senha*
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmarSenha"
                    name="confirmarSenha"
                    required
                    placeholder="Repita a senha"
                    value={formData.confirmarSenha}
                    onChange={handleChange}
                    className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 pr-9 text-sm text-slate-800 focus:border-[#480404] focus:outline-none focus:ring-1 focus:ring-[#480404]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
            </div>


            {errorPassword && (
              <p className="text-xs font-semibold text-red-600 mt-1">{errorPassword}</p>
            )}
          </div>

   
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
              <Truck size={22} className="text-[#480404]" />
              <div>
                <h3 className="text-base font-bold text-[#480404]">Entrega</h3>
                <p className="text-[11px] text-slate-500">
                  Preencha seus dados para envio e cobrança
                </p>
              </div>
            </div>


            <div className="grid grid-cols-12 gap-2">
              <div className="col-span-4">
                <label htmlFor="cep" className="block text-xs font-bold text-slate-800 mb-1">
                  CEP*
                </label>
                <input
                  type="text"
                  id="cep"
                  name="cep"
                  required
                  placeholder="00000-000"
                  value={formData.cep}
                  onChange={handleChange}
                  className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus:border-[#480404] focus:outline-none focus:ring-1 focus:ring-[#480404]"
                />
              </div>

              <div className="col-span-5">
                <label htmlFor="endereco" className="block text-xs font-bold text-slate-800 mb-1">
                  Endereço*
                </label>
                <input
                  type="text"
                  id="endereco"
                  name="endereco"
                  required
                  value={formData.endereco}
                  onChange={handleChange}
                  className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus:border-[#480404] focus:outline-none focus:ring-1 focus:ring-[#480404]"
                />
              </div>

              <div className="col-span-3">
                <label htmlFor="numero" className="block text-xs font-bold text-slate-800 mb-1">
                  Número*
                </label>
                <input
                  type="text"
                  id="numero"
                  name="numero"
                  required
                  value={formData.numero}
                  onChange={handleChange}
                  className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus:border-[#480404] focus:outline-none focus:ring-1 focus:ring-[#480404]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="complemento" className="block text-xs font-bold text-slate-800 mb-1">
                  Complemento
                </label>
                <input
                  type="text"
                  id="complemento"
                  name="complemento"
                  value={formData.complemento}
                  onChange={handleChange}
                  className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus:border-[#480404] focus:outline-none focus:ring-1 focus:ring-[#480404]"
                />
              </div>

              <div>
                <label htmlFor="bairro" className="block text-xs font-bold text-slate-800 mb-1">
                  Bairro*
                </label>
                <input
                  type="text"
                  id="bairro"
                  name="bairro"
                  required
                  value={formData.bairro}
                  onChange={handleChange}
                  className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus:border-[#480404] focus:outline-none focus:ring-1 focus:ring-[#480404]"
                />
              </div>
            </div>


            <div className="grid grid-cols-12 gap-3">
              <div className="col-span-8">
                <label htmlFor="cidade" className="block text-xs font-bold text-slate-800 mb-1">
                  Cidade*
                </label>
                <input
                  type="text"
                  id="cidade"
                  name="cidade"
                  required
                  value={formData.cidade}
                  onChange={handleChange}
                  className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus:border-[#480404] focus:outline-none focus:ring-1 focus:ring-[#480404]"
                />
              </div>

              <div className="col-span-4">
                <label htmlFor="estado" className="block text-xs font-bold text-slate-800 mb-1">
                  Estado*
                </label>
                <select
                  id="estado"
                  name="estado"
                  value={formData.estado}
                  onChange={handleChange}
                  className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus:border-[#480404] focus:outline-none focus:ring-1 focus:ring-[#480404]"
                >
                  <option value="MG">MG</option>
                  <option value="SP">SP</option>
                  <option value="RJ">RJ</option>
                  <option value="ES">ES</option>
                </select>
              </div>
            </div>


            <div>
              <label htmlFor="nomeDestinatario" className="block text-xs font-bold text-slate-800 mb-1">
                Nome destinatário
              </label>
              <input
                type="text"
                id="nomeDestinatario"
                name="nomeDestinatario"
                value={formData.nomeDestinatario}
                onChange={handleChange}
                className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus:border-[#480404] focus:outline-none focus:ring-1 focus:ring-[#480404]"
              />
            </div>


            <div>
              <label htmlFor="referenciaEntrega" className="block text-xs font-bold text-slate-800 mb-1">
                Referência para entrega
              </label>
              <input
                type="text"
                id="referenciaEntrega"
                name="referenciaEntrega"
                value={formData.referenciaEntrega}
                onChange={handleChange}
                className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus:border-[#480404] focus:outline-none focus:ring-1 focus:ring-[#480404]"
              />
            </div>
          </div>
        </div>


        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="w-full sm:w-64 rounded-md bg-[#480404] py-3 text-sm font-bold text-white transition-colors hover:bg-[#660606] active:scale-[0.99]"
          >
            Cadastrar
          </button>
        </div>
      </form>
    </div>
  )
}