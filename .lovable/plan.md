

## Redesign da Foto de Perfil no Hero + Editor de Ajuste no Admin

### Mudanças visuais no Hero (HeroSection.tsx)

**1. Remover degradê ao redor do círculo**
- Eliminar o wrapper com `background: linear-gradient(135deg, #00C2FF, #7C3AED, #00C2FF)` e `boxShadow` com glow
- A foto fica diretamente no container circular, sem borda gradient

**2. Gradiente escurecido de baixo para cima (fade)**
- Overlay com `background: linear-gradient(to top, #0F172A 0%, rgba(15,23,42,0.6) 35%, transparent 55%)` sobre a foto
- Não cobre o centro — o fade começa na base e vai até ~40% da imagem
- Isso dá o aspecto sofisticado de integração com o fundo

**3. Reposicionar: atrás/junto do nome "Vilcimar"**
- Mudar de layout flex side-by-side para `position: absolute` na foto
- A foto fica posicionada atrás/à esquerda do nome, parcialmente sobreposta pelo texto
- O texto usa `z-index: 2`, a foto `z-index: 1`
- A foto fica ligeiramente visível atrás do nome — efeito editorial
- Reduzir tamanho do círculo de 280px → 220px

**4. Manter mask-image radial para suavizar bordas**
- Combinar `mask-image: radial-gradient(...)` com o overlay gradient de baixo pra cima

### Editor de ajuste de imagem no Admin (AdminPage.tsx)

**Novos campos no `personal`** (DataContext.tsx):
- `photoScale: number` (default: 1) — zoom da imagem dentro do círculo
- `photoOffsetX: number` (default: 0) — posição horizontal
- `photoOffsetY: number` (default: 0) — posição vertical

**UI no PersonalEditor:**
- Slider "Zoom" (0.5 → 3.0) para controlar `transform: scale()`
- Sliders "Posição X" e "Posição Y" (-50 → 50) para `object-position`
- Preview circular ao vivo mostrando o resultado dos ajustes
- A imagem usa `objectFit: cover` + `transform: scale(photoScale)` + `objectPosition` para ajuste
- Botão "Centralizar" para resetar offset para 0,0
- Ao salvar, os valores são persistidos junto com o `personal`

### Alterações por arquivo

| Arquivo | O que muda |
|---|---|
| `DataContext.tsx` | Adiciona `photoScale`, `photoOffsetX`, `photoOffsetY` ao `personal` com defaults |
| `HeroSection.tsx` | Redesign do `ProfilePhoto`: remove gradient border, adiciona overlay fade de baixo, reposiciona como absolute atrás do nome, reduz tamanho, aplica scale/offset do data |
| `AdminPage.tsx` | Adiciona sliders de Zoom, Posição X, Posição Y com preview circular ao vivo no `PersonalEditor` |

