import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Signup() {
  const { signUp } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  function validate() {
    if (!email.trim() || !password) {
      return 'Preencha e-mail e senha.'
    }
    if (password.length < 6) {
      return 'A senha deve ter pelo menos 6 caracteres.'
    }
    if (password !== confirmPassword) {
      return 'As senhas não coincidem.'
    }
    return null
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    setSuccessMessage(null)

    const validationError = validate()
    if (validationError) {
      setError(validationError)
      return
    }

    setSubmitting(true)
    const { data, error: signUpError } = await signUp(email.trim(), password)
    setSubmitting(false)

    if (signUpError) {
      setError(traduzErro(signUpError.message))
      return
    }

    // Se o projeto Supabase exigir confirmação de e-mail, "session" vem
    // nula e é preciso avisar a pessoa para checar a caixa de entrada antes
    // de conseguir entrar. Se a confirmação estiver desativada, o Supabase
    // já retorna uma sessão válida e podemos seguir direto para o login.
    if (data?.user && !data?.session) {
      setSuccessMessage(
        'Conta criada! Verifique seu e-mail para confirmar o cadastro antes de entrar.'
      )
    } else {
      setSuccessMessage('Conta criada com sucesso! Você já pode entrar.')
      setTimeout(() => navigate('/login'), 1200)
    }
  }

  return (
    <div className="card">
      <h1>Criar conta</h1>
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
            autoComplete="new-password"
            required
          />
        </label>
        <label>
          Confirmar senha
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            autoComplete="new-password"
            required
          />
        </label>
        <button type="submit" disabled={submitting}>
          {submitting ? 'Criando conta...' : 'Criar conta'}
        </button>
      </form>

      {error && <div className="alert alert-error">{error}</div>}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}

      <p className="helper-text">
        Já tem uma conta? <Link to="/login">Entrar</Link>
      </p>
    </div>
  )
}

function traduzErro(message) {
  if (/already registered|already exists/i.test(message)) {
    return 'Este e-mail já está cadastrado. Tente entrar em vez de criar uma nova conta.'
  }
  if (/password/i.test(message) && /least|short/i.test(message)) {
    return 'A senha não atende aos requisitos mínimos do Supabase.'
  }
  return `Não foi possível criar a conta: ${message}`
}
