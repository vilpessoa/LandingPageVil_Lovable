

# Plano: Gerar PDF profissional do portfólio dinamicamente

## Problema
O PDF atual é uma captura de tela do navegador — com bordas brancas, gráficos ausentes, páginas cortadas sem lógica e formatação ruim.

## Solução
Criar uma página oculta `/pdf` que renderiza o conteúdo do portfólio com layout otimizado para impressão/exportação em PDF, usando os mesmos dados do `DataContext` mas com design adaptado para formato A4, fundo escuro, sem bordas brancas, e divisão lógica de páginas.

O download continuará usando o botão existente, mas agora abrirá essa página em nova aba com `window.print()` configurado para gerar um PDF limpo — ou, como alternativa mais robusta, usaremos a biblioteca **jsPDF + html2canvas** para gerar o PDF diretamente no navegador.

## Abordagem escolhida: jsPDF + html2canvas

Gerar o PDF no client-side capturando um componente React oculto renderizado com layout de portfólio profissional.

### Estrutura de páginas do PDF (divisão lógica):

```text
Página 1: Hero — Nome, título, headline, badge de disponibilidade
Página 2: Métricas — Os 4 cards de impacto em números
Página 3: Sobre + Highlights — Texto sobre mim + competências
Página 4: Stack Tecnológica — 3 categorias com barras de skill + extras
Página 5: Projetos (1 por página ou 2 se couberem)
Página 6: Filosofia + Contato
```

### Alterações

**1. Instalar `jspdf` e `html2canvas`**

**2. Criar `src/app/components/PortfolioPDF.tsx`**
- Componente React que renderiza todo o portfólio em layout A4 (595×842pt)
- Fundo escuro (#0F172A / #111827), sem bordas brancas
- Cada seção é um bloco com `page-break-after: always` ou posicionada manualmente
- Métricas renderizadas como cards estáticos (sem animação)
- Barras de skill como divs com largura fixa (sem animação)
- Projetos com layout compacto mostrando problema/solução/resultado + métricas
- Dados vindos do `useSiteData()`

**3. Criar `src/app/utils/generatePDF.ts`**
- Renderiza o componente `PortfolioPDF` temporariamente no DOM (invisível)
- Usa `html2canvas` para capturar cada "página" como imagem
- Usa `jsPDF` para montar as imagens em páginas A4
- Remove o elemento temporário e dispara o download

**4. Atualizar `HeroSection.tsx` e `ContactSection.tsx`**
- Trocar `downloadFile()` por `generatePDF()` nos botões de download

### Benefícios
- PDF gerado dinamicamente a partir dos dados atuais
- Layout profissional sem bordas brancas
- Páginas divididas logicamente por seção
- Funciona em todos os dispositivos (gerado no browser)
- Dados sempre atualizados (reflete alterações do admin)

