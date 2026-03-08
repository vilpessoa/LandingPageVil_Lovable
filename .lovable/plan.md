

## Corrigir link de projeto sem protocolo

### Problema
Quando o usuário cadastra `www.google.com` sem `https://`, o `<a href="www.google.com">` é tratado como caminho relativo pelo navegador, resultando em `https://seusite.com/www.google.com`.

### Correção em `ProjectsSection.tsx` (linha 84)
Substituir `href={project.projectUrl}` por uma lógica que adiciona `https://` caso a URL não comece com `http://` ou `https://`:

```tsx
href={project.projectUrl.match(/^https?:\/\//) ? project.projectUrl : `https://${project.projectUrl}`}
```

Apenas 1 linha alterada.

