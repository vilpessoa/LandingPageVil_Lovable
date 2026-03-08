

## Corrigir Quebras de Página no PDF

### Problema
O `generatePDF.ts` atual captura o `PrintPage` inteiro como uma imagem longa e fatia mecanicamente a cada 297mm (A4). Isso ignora as fronteiras lógicas das seções, cortando conteúdo no meio (ex: "About" cortado entre página 1 e 2, projeto cortado no meio).

### Solução: Capturar seção por seção

Em vez de capturar tudo como uma imagem e fatiar, vamos capturar **cada `.section-block`** individualmente e agrupá-los em páginas A4, respeitando os `page-break` definidos no `PrintPage.tsx`.

### Alterações

**1. `generatePDF.ts`** — reescrever a lógica de captura:
- Iterar sobre cada `.section-block` individualmente
- Capturar cada seção com `html2canvas` separadamente
- Agrupar seções em páginas: acumular altura e quando ultrapassar 297mm (ou encontrar `.page-break`), criar nova página
- Seções com classe `page-break` forçam nova página após elas
- Desenhar cada seção na posição Y correta dentro da página

**2. `PrintPage.tsx`** — pequenos ajustes:
- Garantir que cada seção tenha altura controlada para caber em uma página A4 (794px × 1123px)
- O header "Projetos Estratégicos" e o primeiro projeto devem ficar no mesmo `section-block` para não separar título do conteúdo
- Agrupar projetos em pares dentro de blocos com `page-break` entre eles

### Layout de páginas esperado:
```text
Página 1: Hero + Métricas (já tem page-break)
Página 2: Sobre Mim / About (já tem page-break)  
Página 3: Tech Stack (já tem page-break)
Página 4: Título "Projetos" + Projeto 1
Página 5: Projeto 2 + Projeto 3
Página 6: Filosofia + Contato
```

### Detalhes técnicos
- Cada seção é capturada como canvas individual → sem corte no meio
- Seções são posicionadas sequencialmente em cada página do PDF
- Quando a próxima seção não cabe ou tem `page-break`, abre nova página
- Background preenchido com `#0F172A` para evitar espaços brancos

