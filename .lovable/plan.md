

## Problema

O arquivo `public/Vilcimar_Portfolio.pdf` é uma captura de tela do site via `window.print()` — contém navbar, texto "SCROLL", bordas brancas e elementos de UI que não pertencem a um PDF profissional. Trocar o arquivo não resolve porque o PDF em si é ruim.

## Solução: Gerar PDF limpo dinamicamente via PrintPage

O componente `PrintPage.tsx` já existe com um layout otimizado para impressão (sem navbar, sem "SCROLL", layout A4). A estratégia é:

### Alterações

**1. Atualizar `downloadFile.ts`** — nova função `generateAndDownloadPDF()`
- Abrir `/print` em uma janela oculta (iframe invisível)
- Aguardar o carregamento completo
- Chamar `window.print()` no iframe com `@media print` CSS que já existe no `PrintPage`
- Alternativa mais robusta: usar a API nativa do browser para gerar o PDF via iframe + `print()`

**Na verdade, abordagem mais simples e confiável:**

**1. Substituir `downloadFile()` nos botões por navegação direta para `/print`**
- `window.open("/print", "_blank")` — abre a página de impressão dedicada em nova aba
- O usuário usa Ctrl+P / Cmd+P para salvar como PDF
- O `PrintPage.tsx` já tem `@page { margin: 0 }` e layout limpo

**Porém isso ainda leva à "página de impressão" que o usuário não quer.**

### Melhor abordagem: Upload de PDF profissional

O caminho mais limpo é o usuário fornecer um PDF pronto (feito no Canva, Figma, etc.) e nós apenas servirmos esse arquivo. Mas o usuário quer que funcione automaticamente.

### Abordagem final: Gerar PDF client-side com html2canvas + jsPDF

**1. Instalar dependências**: `jspdf` + `html2canvas-pro`

**2. Criar `src/app/utils/generatePDF.ts`**
- Renderizar o `PrintPage` em um container off-screen (display: none, position: absolute)
- Usar `html2canvas` para capturar cada seção como imagem
- Montar as imagens em páginas A4 via `jsPDF`
- Disparar download do PDF gerado
- Limpar o container off-screen

**3. Atualizar `HeroSection.tsx` e `ContactSection.tsx`**
- Trocar `downloadFile("/Vilcimar_Portfolio.pdf", ...)` por `generatePDF()`
- Mostrar um estado de loading enquanto gera (o botão pode mostrar "Gerando..." por 2-3s)

**4. Remover `public/Vilcimar_Portfolio.pdf`** — não será mais necessário

### Resultado
- Clique no botão → PDF gerado dinamicamente a partir do layout limpo do `PrintPage`
- Sem navbar, sem "SCROLL", sem bordas brancas
- Dados sempre atualizados (puxa do DataContext em tempo real)
- Download imediato sem abrir página de impressão

