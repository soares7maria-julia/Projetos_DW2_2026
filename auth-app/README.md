# Trabalho Autenticação — React + Supabase Auth

Aplicação em React (Vite) com cadastro e login por e-mail e senha usando **Supabase Auth**, uma página pública e uma página restrita a usuários autenticados. Rotas: `/` (pública), `/cadastro`, `/login` e `/restrita`.

## 1. Instalação e execução

Pré-requisito: Node.js 18 ou superior.

```bash
npm install
cp .env.local .env   # preencha com os dados do seu projeto Supabase (seção 2)
npm run dev            # abre em http://localhost:5173
```

Reinicie o `npm run dev` sempre que alterar o `.env`.

## 2. Variáveis de ambiente

O arquivo `.env.example` (sem credenciais) lista as variáveis necessárias:

| Variável | Valor |
| --- | --- |
| `VITE_SUPABASE_URL` | Project URL do projeto Supabase |
| `VITE_SUPABASE_ANON_KEY` | Chave pública (anon/publishable) do projeto |

Ambas ficam em **Project Settings > API** no painel do Supabase. Apenas a chave pública é usada no navegador; nenhuma chave secreta (`service_role`) aparece no código. O `.env` está no `.gitignore`.

## 3. Configuração do Supabase

1. Criar um projeto no [Supabase](https://supabase.com) (plano gratuito).
2. Em **Authentication > Sign In / Providers > Email**: manter **Enable email provider** ligado.
3. **Decisão sobre confirmação de e-mail: "Confirm email" DESLIGADO.** Com a confirmação ligada, cada cadastro dispara um e-mail e o serviço padrão do plano gratuito tem um limite muito baixo de envios por hora, o que gerou o erro `email rate limit exceeded` nos testes. Desligada, a conta pode entrar logo após o cadastro, sem depender de caixa de entrada.
   O código também funciona com a confirmação ligada: se o cadastro não retornar sessão, a tela avisa para verificar o e-mail antes de entrar.

Não foram criadas tabelas, APIs ou políticas próprias. Os usuários ficam no schema `auth`, gerenciado pelo Supabase (visíveis em **Authentication > Users**).

## 4. Como a sessão e a autorização funcionam

- **Sessão** (`src/contexts/AuthContext.jsx`): ao iniciar, a aplicação chama `supabase.auth.getSession()`, que recupera a sessão salva pelo `supabase-js` no `localStorage`. Por isso recarregar a página mantém o usuário logado. Enquanto essa verificação roda, o estado `loading` é `true`. O contexto também assina `onAuthStateChange`, que atualiza a interface em login, logout e renovação de token.
- **Autorização** (`src/components/ProtectedRoute.jsx`): envolve a rota `/restrita`. Com `loading` ativo, mostra um indicador de carregamento (sem liberar nem redirecionar antes da hora). Sem sessão, redireciona para `/login` com `replace`, então a página não fica no histórico e o botão "voltar" não a exibe. Só com sessão válida o conteúdo é renderizado.
- **Logout**: chama `supabase.auth.signOut()` e leva ao `/login`. Como a sessão deixa de existir, qualquer nova tentativa (URL direta, recarregar, voltar) é barrada pelo `ProtectedRoute`.

## 5. Autenticação x autorização

**Autenticação** é verificar *quem* é a pessoa. Aqui, acontece nas telas de cadastro e login, que enviam e-mail e senha ao Supabase (`signUp` e `signInWithPassword`); é o Supabase quem valida as credenciais e emite a sessão. A aplicação não guarda nem compara senhas.

**Autorização** é decidir *o que* a pessoa pode acessar. Aqui a regra é simples: a página pública é livre e a restrita exige sessão autenticada válida, aplicada pelo `ProtectedRoute`. Todos os usuários autenticados têm a mesma permissão.

Estar autenticado não implica, em geral, poder acessar tudo; neste trabalho as duas coisas coincidem porque só há um nível de acesso. O `ProtectedRoute` controla apenas a interface: não protegeria uma API ou dados privados, que exigiriam autorização também no servidor/banco. Como a página restrita só exibe o e-mail da própria sessão, isso é suficiente para o escopo.

## 6. Referências

- Supabase Auth: <https://supabase.com/docs/guides/auth>
- Autenticação por senha: <https://supabase.com/docs/guides/auth/passwords>
- API `supabase-js` (`signUp`, `signInWithPassword`, `signOut`, `getSession`, `onAuthStateChange`): <https://supabase.com/docs/reference/javascript/auth-api>
- Sessões no Supabase Auth: <https://supabase.com/docs/guides/auth/sessions>
- React Router: <https://reactrouter.com/en/main>
- Variáveis de ambiente no Vite: <https://vitejs.dev/guide/env-and-mode.html>

## Conta ja cadastrada: 

Email: mariajulia77@gmail.com
Senha: mariajulia77


