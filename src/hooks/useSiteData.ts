import { useState, useEffect, useCallback } from "react";
import type { SiteData, PersonalData, MetricItem, AboutData, TechCategory, Project, PhilosophyData, AdminData } from "@/types/site";
import { defaultSiteData } from "@/data/defaultSiteData";

export type { MetricItem, TechCategory, Project };
export type { PersonalData, AboutData, PhilosophyData };
export interface Principle { number: string; title: string; desc: string; }

export function useSiteData() {
  const [data, setData] = useState<SiteData>(defaultSiteData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/site-data")
      .then((r) => r.json())
      .then((json: Partial<SiteData>) => {
        if (json && Object.keys(json).length > 0) {
          setData({ ...defaultSiteData, ...json });
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const persist = useCallback(async (next: SiteData) => {
    try {
      const res = await fetch("/api/site-data", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(next),
      });
      const json = await res.json();
      if (json.ok) { setData(next); return true; }
      return false;
    } catch { return false; }
  }, []);

  const updatePersonal = (personal: PersonalData) => persist({ ...data, personal });
  const updateMetrics = (metrics: MetricItem[]) => persist({ ...data, metrics });
  const updateAbout = (about: AboutData) => persist({ ...data, about });
  const updateTechStack = (techStack: TechCategory[]) => persist({ ...data, techStack });
  const updateExtraTechs = (extraTechs: string[]) => persist({ ...data, extraTechs });
  const updateProjects = (projects: Project[]) => persist({ ...data, projects });
  const updatePhilosophy = (philosophy: PhilosophyData) => persist({ ...data, philosophy });
  const updateAdmin = (admin: AdminData) => persist({ ...data, admin });
  const resetToDefaults = () => persist(defaultSiteData);

  // Legacy compat
  const siteData = data;
  const setSiteData = setData;
  const saveSiteData = persist;

  return {
    data, loading,
    siteData, setSiteData, saveSiteData,
    updatePersonal, updateMetrics, updateAbout,
    updateTechStack, updateExtraTechs,
    updateProjects, updatePhilosophy, updateAdmin,
    resetToDefaults,
  };
}
