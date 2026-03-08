

## Corrigir Download do PDF

O problema: ambos os botões de download (HeroSection e ContactSection) usam `window.print()`, que abre a página de impressão. O utilitário `downloadFile.ts` já existe e faz exatamente o que você quer (fetch + blob + download forçado), mas não está sendo usado.

### Alterações

**1. HeroSection.tsx** (linha 67)
- Trocar `window.print()` por `downloadFile("/Vilcimar_Portfolio.pdf", "Vilcimar_Portfolio.pdf")`
- Importar `downloadFile` do utilitário

**2. ContactSection.tsx** (linha 8)
- Trocar `window.print()` por `downloadFile("/Vilcimar_Portfolio.pdf", "Vilcimar_Portfolio.pdf")`
- Importar `downloadFile` do utilitário

**3. LandingPage.tsx**
- Remover o `<PrintPage embedded />` e o bloco `.print-content` que não serão mais necessários

Resultado: clique no botão → download direto do PDF, sem redirecionamento nem página de impressão.

