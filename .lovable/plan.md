

## Expandir catálogo de ícones populares no LucideIconSelect

### Problema
A lista `POPULAR_ICONS` tem apenas 48 ícones, muitos genéricos (Music, Mic, Headphones, Camera) e faltam ícones úteis para portfolio/BI/tech.

### Solução
Expandir `POPULAR_ICONS` para ~120 ícones, organizados por categorias relevantes: dados/analytics, tecnologia, negócios, UI/interface, comunicação, finanças, design, etc. Remover os menos úteis (Music, Mic, Headphones, Camera, Video) e adicionar ícones como:

- **Dados/Analytics:** BarChart, BarChart2, BarChart4, AreaChart, ScatterChart, Gauge, Sigma, Hash, Percent, Calculator, TableProperties
- **Tech/Dev:** Code2, CodeXml, Binary, Braces, CircuitBoard, Cpu, HardDrive, Wifi, Bluetooth, Router, Github, Container, Blocks
- **Business:** Building, Building2, HandCoins, Wallet, CreditCard, Receipt, BadgeDollarSign, Store, ShoppingCart, Package, Truck
- **UI/Navigation:** LayoutDashboard, LayoutGrid, PanelLeft, Columns3, SlidersHorizontal, ToggleLeft, Filter, SortAsc, ArrowUpDown, ListChecks, ClipboardList
- **People/Social:** UserCheck, UserPlus, UsersRound, MessageCircle, MessagesSquare, AtSign, Bell, ThumbsUp
- **Misc útil:** Lightbulb, Flame, Sparkles, Crown, Trophy, Medal, GraduationCap, MapPin, Navigation, Compass, Palette, Pen, Wrench, Cog, Key, Fingerprint, ScanLine

### Arquivo alterado
- `src/app/pages/AdminPage.tsx` — substituir array `POPULAR_ICONS` (linhas 211-220)

