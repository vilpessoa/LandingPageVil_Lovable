

## Reescrever o sistema de geração de PDF para ser robusto e funcional

### Problema
O `generatePDF` atual usa uma abordagem frágil: abre um iframe com `/print`, espera 2.5s por fonts, depois usa `html2canvas` para capturar cada `.section-block`. Isso falha frequentemente porque:
- O iframe pode não renderizar corretamente dentro de outro iframe (preview do Lovable)
- `html2canvas` tem limitações com gradients, SVGs, e fonts custom
- O timeout de 2.5s pode não ser suficiente
- O processo é lento e instável

### Solução
Substituir a abordagem `html2canvas` por captura direta via **window.print()** em background, usando um iframe oculto com CSS `@media print` otimizado. Alternativamente, simplificar drasticamente o `generatePDF` para ser mais resiliente:

**Abordagem escolhida**: Manter `html2canvas` + `jsPDF` mas tornar o processo muito mais robusto:

1. **`src/app/utils/generatePDF.ts`** — Reescrever completamente:
   - Ao invés de carregar `/print` num iframe (que falha em iframes aninhados), **renderizar o PrintPage diretamente no DOM atual** usando um container oculto
   - Usar `ReactDOM.createRoot` para montar o `PrintPage` com `embedded={true}` num div oculto
   - Aguardar com `requestAnimationFrame` + checagem de conteúdo ao invés de timeout fixo
   - Capturar a página inteira de uma vez (não section por section) e paginar por altura
   - Limpar o container após geração

2. **`src/app/pages/PrintPage.tsx`** — Ajustar para funcionar embedded:
   - Já aceita prop `embedded` mas não é usado de forma embedded
   - Garantir que funciona quando montado diretamente no DOM principal

3. **`src/app/components/HeroSection.tsx`** — Melhorar feedback:
   - Adicionar toast de sucesso/erro usando sonner
   - Manter o estado de loading atual

### Detalhes técnicos

**generatePDF.ts reescrito:**
- Cria um `div` oculto (position fixed, left -9999px, width 794px)
- Usa `ReactDOM.createRoot()` para renderizar `<DataProvider><PrintPage embedded /></DataProvider>` dentro dele
- Espera fonts carregarem com `document.fonts.ready`
- Espera rendering com `requestAnimationFrame` + delay de 1s
- Captura o `.print-page` inteiro com `html2canvas`
- Divide o canvas resultante em fatias de altura A4 (297mm equivalente em pixels)
- Gera cada página do PDF a partir das fatias
- Remove o container e unmount do React root

Essa abordagem elimina o problema do iframe e é muito mais confiável em ambientes embeddados.

### Arquivos alterados
- `src/app/utils/generatePDF.ts` — reescrita completa
- `src/app/components/HeroSection.tsx` — adicionar toast feedback

