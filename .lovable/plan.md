

## Ajuste de Posicionamento do Hero

### Mudanças em `HeroSection.tsx`

**1. Subir a imagem** — A foto precisa subir para que a base do círculo alinhe com "Rodrigues Pessoa". Atualmente `top: -30px`. Mudar para `top: -50px` para elevar.

**2. Empurrar conteúdo para direita/centro** — Aumentar o `paddingLeft` do `.hero-text-content` de `140px` para `180px`, dando mais respiro à esquerda onde a foto aparece. Também considerar adicionar um leve `padding-left` ou `margin-left` no container principal para centralizar mais o bloco.

