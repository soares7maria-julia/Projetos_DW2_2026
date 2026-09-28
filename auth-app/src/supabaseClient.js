import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  // Falha rápida e visível: sem essas variáveis a aplicação não tem como
  // se comunicar com o Supabase. Isso evita erros confusos mais adiante.
  console.error(
    'Variáveis VITE_SUPABASE_URL e/ou VITE_SUPABASE_ANON_KEY não configuradas. ' +
      'Copie .env.example para .env e preencha com os dados do seu projeto Supabase.'
  )
}

// A "anon key" é uma chave PÚBLICA, feita para ser usada no navegador.
// Ela só permite as operações liberadas pelas políticas do projeto
// (neste trabalho, apenas autenticação). A chave "service_role" é secreta
// e NUNCA deve ser usada aqui.
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
