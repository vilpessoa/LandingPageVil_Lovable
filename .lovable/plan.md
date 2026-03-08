

## Como funciona: Lovable Cloud → Supabase Externo

Ativar o **Lovable Cloud** não impede o uso de Supabase externo — pelo contrário, é um **pré-requisito**. Veja o fluxo:

1. **Ativar Lovable Cloud** — isso habilita a infraestrutura necessária (edge functions, secrets, migrations) dentro do projeto Lovable.

2. **Criar o projeto Supabase externo** — você cria um projeto em [supabase.com](https://supabase.com) com sua própria conta.

3. **Conectar o Supabase externo ao Lovable** — nas configurações do projeto, você conecta seu projeto Supabase externo. As credenciais (`SUPABASE_URL`, `SUPABASE_ANON_KEY`) ficam disponíveis automaticamente.

4. **Implementação** — eu crio a tabela `site_data` no seu Supabase e atualizo o `DataContext.tsx` para usar o client Supabase em vez do Express.

**Resumo**: Lovable Cloud é a camada que permite ao Lovable se comunicar com qualquer Supabase (inclusive externo). Sem ele ativado, não há como rodar migrations, edge functions ou gerenciar secrets.

Quando você aceitar a ativação, o próximo passo será conectar seu projeto Supabase externo.

