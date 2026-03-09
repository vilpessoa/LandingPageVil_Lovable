

## Refatorar download do PDF — imprimir a página real como ela é

### Abordagem
Abandonar completamente a abordagem atual (PrintPage separada + html2canvas + jsPDF). Em vez disso, **capturar a LandingPage real** diretamente usando `html2canvas` no conteúdo visível da página, e paginar o resultado em A4.

### Como funciona

**`src/app/utils/generatePDF.ts`** — Reescrita total:
1. Em vez de renderizar um `PrintPage` separado num container oculto, **capturar o `.landing-content`** que já está no DOM com todo o conteúdo real renderizado
2. Usar `html2canvas` no elemento `.landing-content` existente (que é a página completa como o usuário vê)
3. O canvas resultante será muito alto — fatiar em páginas A4 (como já fazia antes), mas agora com o conteúdo real
4. Gerar o PDF com `jsPDF` e salvar

**Vantagens:**
- Sem necessidade de manter `PrintPage.tsx` sincronizado com a landing
- O PDF é exatamente o que o usuário vê na tela
- Sem problemas de rendering (fonts, SVGs, recharts) porque já está tudo renderizado
- Mais rápido (sem esperar React re-render)

**Fluxo simplificado:**
```text
1. Scroll page to top
2. html2canvas(.landing-content, { scale: 2, windowWidth: 1280 })
3. Slice canvas into A4 pages  
4. pdf.save()
5. Restore scroll position
```

### Arquivos alterados
- `src/app/utils/generatePDF.ts` — reescrita para capturar `.landing-content` direto do DOM
- Remover dependência do `PrintPage` (pode ser deletado depois se não usado em `/print`)

