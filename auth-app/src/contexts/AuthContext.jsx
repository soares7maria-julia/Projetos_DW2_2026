import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'

const AuthContext = createContext(undefined)

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  // "loading" cobre o tempo em que ainda não sabemos se existe uma sessão
  // válida (por exemplo, logo após recarregar a página). Enquanto isso,
  // as rotas não devem liberar nem bloquear conteúdo restrito.
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 1) Ao montar a aplicação, pergunta ao Supabase se já existe uma
    // sessão salva (o supabase-js guarda o token no localStorage por padrão
    // e cuida de renová-lo automaticamente).
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })

    // 2) A partir daí, escuta mudanças de estado (login, logout, refresh de
    // token) para manter a UI sempre sincronizada com o Supabase.
    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession)
      setLoading(false)
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  async function signUp(email, password) {
    const { data, error } = await supabase.auth.signUp({ email, password })
    return { data, error }
  }

  async function signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    return { data, error }
  }

  async function signOut() {
    await supabase.auth.signOut()
  }

  const value = {
    session,
    user: session?.user ?? null,
    isAuthenticated: !!session,
    loading,
    signUp,
    signIn,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth precisa ser usado dentro de um AuthProvider')
  }
  return context
}
