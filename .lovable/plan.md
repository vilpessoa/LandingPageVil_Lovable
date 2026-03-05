

## Issues Identified

1. **"Contato" duplicated**: `navLinks` array includes "Contato" (line 20), and there's also a separate "Contato" CTA button (line 103-126). Remove "Contato" from the `navLinks` array so it only appears as the styled button.

2. **Mobile menu not showing all links + CTA**: The mobile dropdown only renders `navLinks` items as plain text links. It needs to also include the "Contato" CTA button so mobile users can access it.

## Plan

### 1. Remove "Contato" from `navLinks` array (line 20)
Keep only: Sobre, Stack, Projetos.

### 2. Enhance mobile dropdown (lines 146-170)
After the mapped nav links, add:
- A "Contato" button styled consistently with the desktop CTA (cyan background, dark text)
- This ensures mobile users have full navigation access

