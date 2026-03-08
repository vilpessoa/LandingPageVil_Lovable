import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface MetricItem {
  id: string;
  value: string;
  prefix: string;
  suffix: string;
  label: string;
  sublabel: string;
  color: string;
  icon: string;
}

export interface TechItem {
  name: string;
  level: number;
}

export interface TechCategory {
  id: string;
  title: string;
  color: string;
  icon: string;
  techs: TechItem[];
}

export interface ProjectMetric {
  value: string;
  label: string;
}

export interface Project {
  id: string;
  tag: string;
  tagColor: string;
  title: string;
  subtitle: string;
  problem: string;
  solution: string;
  result: string;
  metrics: ProjectMetric[];
  color: string;
  icon: string;
  imageUrl?: string;
  projectUrl?: string;
}

export interface Principle {
  number: string;
  title: string;
  desc: string;
}

export interface SiteData {
  personal: {
    firstName: string;
    lastName: string;
    title: string;
    subtitle: string;
    headline: string;
    available: boolean;
    cvUrl: string;
    linkedinUrl: string;
    email: string;
    location: string;
    photoUrl: string;
    photoScale: number;
    photoOffsetX: number;
    photoOffsetY: number;
  };
  metrics: MetricItem[];
  about: {
    text1: string;
    text2: string;
    highlights: string[];
    chartTitle: string;
  };
  techStack: TechCategory[];
  extraTechs: string[];
  projects: Project[];
  philosophy: {
    quote: string;
    author: string;
    principles: Principle[];
  };
  admin: {
    password: string;
  };
}

const DEFAULT_DATA: SiteData = {
  personal: {
    firstName: "Vilcimar",
    lastName: "Rodrigues Pessoa",
    title: "Business Intelligence Specialist",
    subtitle: "Transformando dados em decisões estratégicas",
    headline:
      "Especialista em BI, automação de processos e arquitetura analítica orientada a impacto mensurável.",
    available: true,
    cvUrl: "#",
    linkedinUrl: "https://www.linkedin.com/in/",
    email: "vilcimar@email.com",
    location: "Brasil",
    photoUrl: "",
    photoScale: 1,
    photoOffsetX: 0,
    photoOffsetY: 0,
  },
  metrics: [
    {
      id: "m1",
      value: "30",
      prefix: "+",
      suffix: "",
      label: "Dashboards Estratégicos",
      sublabel: "Desenvolvidos e entregues em produção",
      color: "#00C2FF",
      icon: "BarChart3",
    },
    {
      id: "m2",
      value: "6",
      prefix: "+",
      suffix: "",
      label: "Anos com Dados",
      sublabel: "Experiência em análise e inteligência de negócios",
      color: "#7C3AED",
      icon: "Clock",
    },
    {
      id: "m3",
      value: "15",
      prefix: "+",
      suffix: "",
      label: "Processos Automatizados",
      sublabel: "Redução de operações manuais críticas",
      color: "#10B981",
      icon: "Zap",
    },
    {
      id: "m4",
      value: "2019",
      prefix: "",
      suffix: "",
      label: "Estrutura de Dados",
      sublabel: "Governança e modelagem desde o início",
      color: "#F59E0B",
      icon: "Database",
    },
  ],
  about: {
    text1:
      "Atuo como especialista na interseção entre negócio e tecnologia, construindo soluções de inteligência analítica que transformam dados brutos em ativos estratégicos. Minha abordagem é sistêmica: da governança à entrega final de insights, com foco em escalabilidade e impacto real.",
    text2:
      "Especializado em modelar ambientes de dados complexos, integrar sistemas legados com camadas modernas de BI, e automatizar pipelines que antes consumiam horas de trabalho manual.",
    highlights: [
      "Governança de dados com foco em confiabilidade",
      "Modelagem dimensional e semântica avançada",
      "Integração de sistemas ERP com camadas analíticas",
      "Escalabilidade e manutenabilidade de soluções",
    ],
    chartTitle: "Evolução da Maturidade Analítica",
  },
  techStack: [
    {
      id: "ts1",
      title: "BI & Visualização",
      color: "#00C2FF",
      icon: "📊",
      techs: [
        { name: "Power BI", level: 95 },
        { name: "DAX", level: 90 },
        { name: "Modelagem Dimensional", level: 88 },
        { name: "M / Power Query", level: 85 },
        { name: "Figma (Protótipos)", level: 70 },
      ],
    },
    {
      id: "ts2",
      title: "Data Engineering",
      color: "#7C3AED",
      icon: "⚙️",
      techs: [
        { name: "Python", level: 85 },
        { name: "SQL", level: 92 },
        { name: "APIs REST", level: 80 },
        { name: "ETL Pipelines", level: 82 },
        { name: "Banco de Dados", level: 85 },
      ],
    },
    {
      id: "ts3",
      title: "Automação",
      color: "#10B981",
      icon: "🤖",
      techs: [
        { name: "Selenium", level: 88 },
        { name: "Integrações ERP", level: 85 },
        { name: "Web Scraping", level: 82 },
        { name: "Pandas / Numpy", level: 80 },
        { name: "Agendamento / Cron", level: 75 },
      ],
    },
  ],
  extraTechs: [
    "Excel Avançado",
    "SharePoint",
    "Power Automate",
    "Git",
    "Notion",
    "TOTVS / ERP",
    "SAP",
    "MySQL",
    "PostgreSQL",
    "Azure",
  ],
  projects: [
    {
      id: "p1",
      tag: "Power BI + DAX",
      tagColor: "#00C2FF",
      title: "Dashboard Executivo de Vendas",
      subtitle: "Inteligência Comercial em Tempo Real",
      problem:
        "A diretoria não tinha visibilidade consolidada do funil de vendas, KPIs regionais e projeções, levando a decisões baseadas em planilhas desatualizadas.",
      solution:
        "Desenvolvei um ecosistema de BI com modelagem dimensional estrela, DAX avançado e atualização automática via Power Query integrado ao ERP.",
      result:
        "Reuniões de resultado passaram de 4h para 20min. 100% das decisões comerciais passaram a ser baseadas em dados em tempo real.",
      metrics: [
        { value: "95%", label: "Redução no preparo de relatórios" },
        { value: "Real-time", label: "Atualização dos dados" },
        { value: "+30", label: "KPIs monitorados" },
      ],
      color: "#00C2FF",
      icon: "TrendingUp",
    },
    {
      id: "p2",
      tag: "Python + Selenium",
      tagColor: "#7C3AED",
      title: "Automação de Coleta de Dados",
      subtitle: "Eliminação de Processos Manuais Críticos",
      problem:
        "Equipe gastava 3h/dia coletando dados de portais externos, inserindo manualmente no ERP. Alto risco de erro humano e retrabalho constante.",
      solution:
        "Implementei robôs de automação com Selenium e Python para coleta, tratamento e inserção automática de dados, com logs de execução e alertas de falha.",
      result:
        "Processo de 3h/dia transformado em execução automática de 12min. Zero erros de digitação após implementação.",
      metrics: [
        { value: "93%", label: "Redução de tempo operacional" },
        { value: "0", label: "Erros de digitação" },
        { value: "12min", label: "Execução automatizada" },
      ],
      color: "#7C3AED",
      icon: "Cpu",
    },
    {
      id: "p3",
      tag: "SQL + Python + BI",
      tagColor: "#10B981",
      title: "Governança de Dados Corporativos",
      subtitle: "Estrutura Analítica Escalável",
      problem:
        "Dados fragmentados em silos distintos (ERP, CRM, planilhas) causavam inconsistências nos relatórios e impossibilitavam análises cross-funcionais.",
      solution:
        "Projetei e implementei uma camada de dados unificada com Data Warehouse, dicionário de dados, processos de qualidade e catálogo semântico.",
      result:
        "Uma única fonte de verdade para toda a organização. Novos relatórios passaram a ser entregues 5x mais rápido.",
      metrics: [
        { value: "5x", label: "Velocidade de entrega de relatórios" },
        { value: "100%", label: "Consistência entre áreas" },
        { value: "1", label: "Fonte única de verdade" },
      ],
      color: "#10B981",
      icon: "Target",
    },
  ],
  philosophy: {
    quote:
      "Decisões estratégicas não são baseadas em opinião. São baseadas em dados estruturados.",
    author: "Vilcimar Rodrigues Pessoa",
    principles: [
      {
        number: "01",
        title: "Dados antes de Opiniões",
        desc: "Toda decisão deve ser precedida de evidência. Intuição sem dados é aposta.",
      },
      {
        number: "02",
        title: "Contexto é tudo",
        desc: "Um número sem contexto é ruído. A interpretação é onde o valor real mora.",
      },
      {
        number: "03",
        title: "Escala com Governança",
        desc: "Velocidade sem estrutura gera caos. Consistência é a base de qualquer solução durável.",
      },
    ],
  },
  admin: {
    password: "admin123",
  },
};

interface DataContextType {
  data: SiteData;
  updatePersonal: (val: SiteData["personal"]) => void;
  updateMetrics: (val: SiteData["metrics"]) => void;
  updateAbout: (val: SiteData["about"]) => void;
  updateTechStack: (val: SiteData["techStack"]) => void;
  updateExtraTechs: (val: string[]) => void;
  updateProjects: (val: SiteData["projects"]) => void;
  updatePhilosophy: (val: SiteData["philosophy"]) => void;
  updateAdmin: (val: SiteData["admin"]) => void;
  resetToDefaults: () => void;
}

const DataContext = createContext<DataContextType | null>(null);

const STORAGE_KEY = "vil_portfolio_data";

function mergeWithDefaults(input: Partial<SiteData> | null | undefined): SiteData {
  const parsed = input ?? {};
  return {
    ...DEFAULT_DATA,
    ...parsed,
    personal: { ...DEFAULT_DATA.personal, ...parsed.personal },
    about: { ...DEFAULT_DATA.about, ...parsed.about },
    philosophy: { ...DEFAULT_DATA.philosophy, ...parsed.philosophy },
    admin: { ...DEFAULT_DATA.admin, ...parsed.admin },
  };
}

function loadData(): SiteData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return mergeWithDefaults(JSON.parse(raw));
    }
  } catch {}
  return DEFAULT_DATA;
}

function saveData(data: SiteData) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {}
}

export function DataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<SiteData>(loadData);

  useEffect(() => {
    let active = true;

    const loadRemote = async () => {
      try {
        const { data: rows, error } = await supabase
          .from("site_data")
          .select("section, content");

        if (error || !rows || rows.length === 0) return;
        if (!active) return;

        const remote: Partial<SiteData> = {};
        for (const row of rows) {
          (remote as any)[row.section] = row.content;
        }

        const merged = mergeWithDefaults(remote);
        setData(merged);
        saveData(merged);
      } catch {
        // Keep local cache when DB is unavailable.
      }
    };

    void loadRemote();
    return () => {
      active = false;
    };
  }, []);

  const persistSection = async (section: string, content: unknown) => {
    try {
      await supabase
        .from("site_data")
        .upsert(
          { section, content: content as any, updated_at: new Date().toISOString() },
          { onConflict: "section" }
        );
    } catch {
      // Local cache still preserves admin updates in this browser.
    }
  };

  const update = (sectionKey: keyof SiteData, value: any) => {
    setData((prev) => {
      const next = { ...prev, [sectionKey]: value };
      saveData(next);
      void persistSection(sectionKey, value);
      return next;
    });
  };

  return (
    <DataContext.Provider
      value={{
        data,
        updatePersonal: (val) => update("personal", val),
        updateMetrics: (val) => update("metrics", val),
        updateAbout: (val) => update("about", val),
        updateTechStack: (val) => update("techStack", val),
        updateExtraTechs: (val) => update("extraTechs", val),
        updateProjects: (val) => update("projects", val),
        updatePhilosophy: (val) => update("philosophy", val),
        updateAdmin: (val) => update("admin", val),
        resetToDefaults: () => {
          setData(DEFAULT_DATA);
          saveData(DEFAULT_DATA);
          // Persist all sections on reset
          for (const key of Object.keys(DEFAULT_DATA) as (keyof SiteData)[]) {
            void persistSection(key, DEFAULT_DATA[key]);
          }
        },
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useSiteData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useSiteData must be used inside DataProvider");
  return ctx;
}
