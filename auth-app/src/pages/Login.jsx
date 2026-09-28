import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Login() {
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  // Se o usuário foi redirecionado para cá a partir da página restrita
  // (ver ProtectedRoute), volta para lá automaticamente após o login.
  const from = location.state?.from?.pathname || '/restrita'

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)

    if (!email.trim() || !password) {
      setError('Informe e-mail e senha.')
      return
    }

    setSubmitting(true)
    const { error: signInError } = await signIn(email.trim(), password)
    setSubmitting(false)

    if (signInError) {
      setError(traduzErro(signInError.message))
      return
    }

    navigate(from, { replace: true })
  }

  return (
    <div className="card">
      <h1>Entrar</h1>
      <form onSubmit={handleSubmit} noValidate>
        <label>
          E-mail
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />
        </label>
        <label>
          Senha
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
        </label>
        <button type="submit" disabled={submitting}>
          {submitting ? 'Entrando...' : 'Entrar'}
        </button>
      </form>

      {error && <div className="alert alert-error">{error}</div>}

      <p className="helper-text">
        Ainda não tem conta? <Link to="/cadastro">Cadastre-se</Link>
      </p>
    </div>
  )
}

function traduzErro(message) {
  if (/invalid login credentials/i.test(message)) {
    return 'E-mail ou senha incorretos. Tente novamente.'
  }
  if (/email not confirmed/i.test(message)) {
    return 'Confirme seu e-mail antes de entrar. Verifique sua caixa de entrada.'
  }
  return `Não foi possível entrar: ${message}`
}
