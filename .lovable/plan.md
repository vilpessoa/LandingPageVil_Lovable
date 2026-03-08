

## Carrossel com fade transition + peek dos slides adjacentes

### O que muda

**1. Fade transition entre slides**
- Adicionar estado `animating` + CSS transition no container do card
- Ao trocar slide: fade-out (opacity 0, 300ms) → trocar index → fade-in (opacity 1, 300ms)
- Usar `onTransitionEnd` para sincronizar a troca do index com o fim do fade-out

**2. Peek/sombra dos slides adjacentes**
- Mudar o layout do carrossel: em vez de mostrar só 1 card, renderizar 3 (prev, current, next) lado a lado com `display: flex` e `overflow: visible` no container externo
- O card central fica em `opacity: 1, scale(1)`, os laterais ficam com `opacity: 0.3, scale(0.9)`, parcialmente visíveis atrás das setas
- Aplicar gradient mask nas bordas esquerda/direita do container (`overflow: hidden` no wrapper externo) para criar efeito de "escondido"
- Os cards laterais servem como hint visual — o usuário vê que há mais conteúdo

**3. Estrutura técnica**
- Container externo: `overflow: hidden` com padding lateral (~60px) para revelar parte dos cards adjacentes
- Dentro: flex com 3 cards posicionados via `transform: translateX()` baseado no index atual
- Transição CSS: `transition: transform 0.5s ease, opacity 0.4s ease`
- Cards prev/next: `pointer-events: none`, `opacity: 0.25`, `scale: 0.92`, `filter: blur(1px)`

### Arquivo alterado
- `src/app/components/ProjectsSection.tsx` — reescrever a lógica de exibição do carrossel mantendo o `ProjectCard` intacto

