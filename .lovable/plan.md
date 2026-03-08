

## Plano: Infraestrutura de Tabelas no Lovable Cloud

### Contexto
O Admin gerencia 6 seções de dados (personal, metrics, about, techStack, projects, philosophy) + config admin. Atualmente tudo vive em localStorage + Express (JSON file). Vamos criar tabelas no banco e migrar o `DataContext.tsx` para CRUD via Supabase.

### Estrutura de Tabelas

Usaremos uma abordagem **simples e pragmática**: uma única tabela `site_data` com o JSON completo do site, com versionamento por seção. Isso mantém compatibilidade total com o schema existente sem precisar normalizar dezenas de sub-tabelas.

```text
site_data
├── id          UUID (PK, default gen_random_uuid())
├── section     TEXT NOT NULL (unique) — "personal", "metrics", "about", "techStack", "projects", "philosophy", "admin"
├── content     JSONB NOT NULL — dados da seção
├── updated_at  TIMESTAMPTZ DEFAULT now()
```

**Por que uma tabela com seções JSONB em vez de 7 tabelas normalizadas?**
- O schema já é JSON-first (DataContext armazena tudo como objetos aninhados)
- Cada seção tem estrutura diferente (arrays, objetos, arrays de objetos com sub-arrays)
- Normalizar criaria ~10 tabelas com JOINs complexos sem ganho real para um portfólio single-user
- CRUD no Admin já funciona por seção — cada "Salvar" atualiza apenas sua seção

### RLS (Row Level Security)

Como este é um portfólio **público** (leitura por todos) com admin **single-user**:
- **SELECT**: permitido para todos (anon + authenticated) — o site precisa ler os dados
- **INSERT/UPDATE/DELETE**: sem restrição por enquanto (o admin já tem login por senha no frontend)

> Nota: A autenticação admin atual usa senha hardcoded no client. Numa fase futura podemos migrar para autenticação real via Lovable Cloud.

### Migração no Código

**DataContext.tsx** será atualizado para:
1. No `loadRemote`: buscar cada seção da tabela `site_data` via Supabase client
2. No `persistRemote`: fazer UPSERT (insert on conflict update) na seção correspondente
3. Manter localStorage como cache/fallback
4. Remover dependência do Express `/api/site-data`

### Seed dos dados

Após criar a tabela, inserir os dados default (que já existem no `DEFAULT_DATA`) como seed inicial para cada seção.

### Etapas de Implementação

1. **Criar tabela** `site_data` via migration SQL
2. **Seed** dos dados default nas 7 seções
3. **Atualizar** `DataContext.tsx` para CRUD via Supabase (load + upsert por seção)
4. **Remover** dependência do Express endpoint

