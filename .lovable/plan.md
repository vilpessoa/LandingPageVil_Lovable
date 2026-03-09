

## Adicionar collapse/expand nos itens repetíveis do Admin

### Problema
Nas seções Métricas, Stack Tecnológica, Projetos e Filosofia (princípios), todos os cards de edição ficam totalmente expandidos simultaneamente. Com vários itens, fica difícil identificar em qual elemento se está trabalhando.

### Solução
Criar um componente `CollapsibleCard` que envolve cada item repetível. Cada card mostra apenas um **header resumo** (título/nome do item + botão expandir/recolher), e o conteúdo completo fica oculto até clicar.

### Detalhes técnicos

**Novo componente `CollapsibleCard`** (dentro de `AdminPage.tsx`):
- Props: `title` (string), `color` (opcional), `defaultOpen` (boolean, default false), `onRemove` (callback), `children`
- Header: mostra o título do item, indicador de cor, chevron animado (rotação 90° quando aberto), botão remover
- Body: renderiza `children` com `display: none` / `display: block` baseado no estado `open`
- Transição suave com `max-height` + `overflow: hidden`

**Seções afetadas:**

1. **MetricsEditor** — cada métrica vira um `CollapsibleCard` com título = `metric.label` (ex: "Dashboards Estratégicos")
2. **TechEditor** — cada categoria vira um `CollapsibleCard` com título = `cat.title` (ex: "BI & Visualização")  
3. **ProjectsEditor** — cada projeto vira um `CollapsibleCard` com título = `proj.title` (ex: "Dashboard Executivo de Vendas")
4. **PhilosophyEditor** — cada princípio vira um `CollapsibleCard` com título = `p.title` (ex: "Dados antes de Opiniões")

**Comportamento:**
- Todos iniciam **recolhidos** por padrão
- Itens recém-adicionados iniciam **expandidos**
- Clicar no header alterna entre expandido/recolhido
- O botão "Remover" fica no header (sempre visível), sem precisar expandir

### Arquivo alterado
- `src/app/pages/AdminPage.tsx` — adicionar `CollapsibleCard` e aplicar em 4 editores

