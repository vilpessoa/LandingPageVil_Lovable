

## Projetos: Carrossel + Imagem + Link

### Resumo
Transformar a seção de projetos de grid para carrossel (1 projeto por vez, autoplay + setas), adicionar campos de imagem (upload PNG) e link externo ao modelo de dados, exibir imagem abaixo do card e botão "Acesse" quando houver link.

### 1. Atualizar interface `Project` em `DataContext.tsx`
Adicionar dois campos opcionais:
- `imageUrl?: string` — URL da imagem do projeto (upload no bucket `profile/projects/`)
- `projectUrl?: string` — link externo (BI, web app, etc.)

Atualizar `DEFAULT_DATA` com valores vazios para os projetos existentes.

### 2. Reescrever `ProjectsSection.tsx` com carrossel
- Substituir o grid por um carrossel usando **Embla Carousel** (já instalado via `embla-carousel-react`)
- Usar os componentes `Carousel`, `CarouselContent`, `CarouselItem`, `CarouselPrevious`, `CarouselNext` já existentes em `ui/carousel.tsx`
- Adicionar **autoplay** com `setInterval` (ex: 5s), pausando no hover
- Exibir **1 projeto por vez** centralizado com `maxWidth ~700px`
- Manter toda a estrutura do card atual (tag, título, ícone, problema/solução/resultado, métricas)
- Abaixo das métricas, se `project.imageUrl` existir: exibir imagem com `border-radius`, altura limitada (~200px), `object-fit: cover`
- Abaixo da imagem (ou métricas), se `project.projectUrl` existir: botão "Acesse" com ícone `ExternalLink`, abre em nova aba
- Indicadores de dots para navegação

### 3. Atualizar `ProjectsEditor` no `AdminPage.tsx`
- Adicionar campo **"Link do projeto"** (input texto) para `projectUrl`
- Adicionar upload de **imagem do projeto** com botões Upload/Remover, usando storage bucket `profile` pasta `projects/`
- Preview da imagem quando existir
- Lógica de upload similar ao `handlePhotoUpload` do `PersonalEditor`

### Arquivos alterados
- `src/app/context/DataContext.tsx` — interface + defaults
- `src/app/components/ProjectsSection.tsx` — carrossel completo
- `src/app/pages/AdminPage.tsx` — campos de imagem e link no editor

