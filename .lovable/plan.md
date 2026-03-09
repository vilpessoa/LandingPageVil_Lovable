

## Otimizar layout do PDF para preencher páginas e reduzir espaço vazio

### Problema
O PDF atual usa `page-break` em cada section-block, forçando cada seção a ocupar uma página inteira mesmo quando o conteúdo não preenche todo o espaço A4 (297mm). Isso causa páginas com grandes espaços em branco.

### Solução
Reorganizar as seções no PrintPage para agrupar conteúdo relacionado na mesma página, removendo `page-break` desnecessários e combinando seções que cabem juntas.

### Layout proposto (mais denso)

```text
Página 1: Hero + Métricas (já está OK — manter)
Página 2: About + Tech Stack (juntar na mesma página, reduzindo padding/fontes)
Página 3+: Projetos agrupados — colocar 2 projetos por página quando possível
Última:    Filosofia + Contato (já está OK — manter)
```

### Alterações em `src/app/pages/PrintPage.tsx`

1. **Remover `page-break` do About** — juntar About + Tech Stack na mesma página
   - Reduzir padding do About de `48px` para `32px`
   - Reduzir chart height de `200` para `160`
   - Remover a classe `page-break` do About section-block

2. **Agrupar projetos** — em vez de 1 projeto por página, agrupar 2 projetos por section-block
   - Iterar projetos em pares
   - Cada par compartilha um `section-block` com `page-break`
   - Reduzir padding interno dos cards de projeto (de `28px` para `20px`)
   - Reduzir fontes dos projetos levemente (title de `17px` para `15px`, etc.)

3. **Ajustar Tech Stack** — remover `page-break` e reduzir padding para caber junto com About
   - Padding top/bottom de `48px` para `28px`
   - Fontes das barras de progresso um pouco menores

4. **Filosofia + Contato** — já estão juntos, manter mas verificar se há espaço sobrando; se sim, aumentar padding/quote size para preencher melhor

### Arquivo alterado
- `src/app/pages/PrintPage.tsx` — reestruturar layout de seções

