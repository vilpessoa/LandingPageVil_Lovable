

## Hero Profile Photo — Foto à Esquerda

### Alterações

**1. Migration SQL — Criar bucket `profile` no Storage**
- Bucket público para armazenar a foto de perfil
- RLS: leitura pública, upload/delete para authenticated

**2. DataContext.tsx — Adicionar `photoUrl` ao `personal`**
- Novo campo `photoUrl: string` (default `""`)

**3. HeroSection.tsx — Foto à esquerda com fade**
- Layout muda para `display: flex` com dois colunas: foto (esquerda) + conteúdo (direita)
- Foto circular/arredondada (~280px) com borda glow cyan/purple gradient
- `mask-image: radial-gradient(...)` para fade suave nas bordas
- Animação flutuante lenta (translateY, 4s)
- Se `photoUrl` vazio: placeholder com iniciais + borda tracejada
- Mobile: foto acima do conteúdo, centralizada, menor (~180px)

```text
┌──────────────────────────────────────────────┐
│  ┌──────────┐   [Available badge]            │
│  │          │                                │
│  │  PHOTO   │   Vilcimar                     │
│  │ (faded)  │   Rodrigues Pessoa             │
│  │          │   ── BI Specialist             │
│  └──────────┘   Subtitle text...             │
│                 [Download] [LinkedIn]         │
│                                              │
│  ▼ SCROLL                                    │
└──────────────────────────────────────────────┘
```

**4. AdminPage.tsx — Upload de foto no PersonalEditor**
- Campo "Foto de Perfil" com preview da imagem atual
- Input file que faz upload para bucket `profile` via Supabase Storage
- Obtém public URL e salva em `form.photoUrl`
- Botão de remover foto

