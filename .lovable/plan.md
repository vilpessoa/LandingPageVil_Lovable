

## Correção de alinhamento responsivo do Hero

### Problema
O container principal usa `paddingLeft: "calc(50vw - 480px)"` que empurra o conteúdo para a direita em viewports menores. Em telas estreitas (preview, tablet), esse cálculo resulta em padding insuficiente ou negativo, quebrando o layout. Também falta um breakpoint para tablet (768-1024px).

### Mudanças em `HeroSection.tsx`

**1. Container principal (linha 171)**
- Remover o `paddingLeft: "calc(50vw - 480px)"` fixo
- Usar padding simétrico: `padding: "120px 24px 80px"`
- O `maxWidth: 1200px` + `margin: 0 auto` já centraliza corretamente

**2. Adicionar breakpoint tablet (768-1024px) no bloco `<style>`**
- Foto: tamanho 180px, posição relativa centralizada (como mobile mas maior)
- Texto: `paddingLeft: 0`
- Layout empilhado verticalmente como no mobile

**3. Ajustar breakpoint mobile existente (< 768px)**
- Manter o comportamento atual (foto centralizada, texto sem padding)
- Adicionar `text-align: center` para centralizar conteúdo no mobile
- Botões centralizados com `justify-content: center`

**4. Desktop (> 1024px)**
- Manter layout atual: foto absoluta atrás do nome, texto com `paddingLeft: 180px`
- Usar media query `min-width: 1025px` para aplicar o paddingLeft apenas em desktop

