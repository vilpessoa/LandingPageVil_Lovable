

## Corrigir dropdowns com fundo branco e implementar seletor de ícones Lucide

### Problema
Os `<select>` nativos do HTML no admin têm fundo branco no dropdown (comportamento do browser), impossibilitando a leitura no tema escuro. Existem 2 selects de ícones: um em **MetricsEditor** (linha 478) e outro em **ProjectsEditor** (linha 697).

### Solução
Substituir os `<select>` nativos por um **componente customizado de seleção de ícones Lucide** com visual dark consistente com o admin. Em vez de um dropdown nativo, será um picker inline com busca e grid de ícones.

### Detalhes técnicos

**Novo componente `LucideIconSelect`** (dentro de `AdminPage.tsx`):
- Props: `value` (string), `onChange` (callback), `color` (string opcional)
- Botão trigger: mostra o ícone selecionado + nome, estilo consistente com `S.input`
- Ao clicar, abre um painel dropdown customizado (posição absolute, z-index alto):
  - Background escuro (`#1E293B`) com borda sutil
  - Campo de busca para filtrar ícones por nome
  - Grid de ícones Lucide (6 colunas) com preview visual do ícone real
  - Lista expandida: ~50 ícones populares para BI/dados + busca no catálogo completo `icons` do lucide-react
  - Hover e seleção com destaque na cor do item
- Ao selecionar, fecha o painel e chama `onChange`

**Alterações em `AdminPage.tsx`:**
1. Criar `LucideIconSelect` usando `icons` de `lucide-react` (já importado no `IconPicker.tsx`)
2. **MetricsEditor** (linha 478): substituir `<select>` por `<LucideIconSelect value={metric.icon} onChange={(v) => update(metric.id, "icon", v)} color={metric.color} />`
3. **ProjectsEditor** (linha 697): substituir `<select>` por `<LucideIconSelect value={proj.icon} onChange={(v) => updateProject(proj.id, "icon", v)} color={proj.color} />`
4. Remover as constantes `ICONS` locais (linhas 453 e 631) já que o picker terá seu próprio catálogo

O componente seguirá o mesmo padrão visual do `IconPicker` existente (fundo escuro, busca, grid), mas focado apenas em ícones Lucide com preview visual real de cada ícone.

