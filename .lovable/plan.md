

## Corrigir scroll horizontal no grid de ícones Lucide

### Problema
O grid de ícones tem 6 colunas com botões de 42px fixos, totalizando ~268px + gaps. Com o padding do container e a scrollbar vertical, o conteúdo ultrapassa os 300px do dropdown, causando scroll horizontal.

### Solução
- Reduzir de 6 para 5 colunas: `repeat(5, 1fr)`
- Adicionar `overflowX: "hidden"` no grid container
- Remover largura fixa dos botões (usar `width: "100%"`, `aspectRatio: "1"`) para que se adaptem à coluna

### Arquivo alterado
- `src/app/pages/AdminPage.tsx` — linha 277 (grid container) e linhas 289 (botões do grid)

