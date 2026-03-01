import { useState, useEffect, useCallback } from "react";
import type { SiteData } from "@/types/site";
import { defaultSiteData } from "@/data/defaultSiteData";

export function useSiteData() {
  const [siteData, setSiteData] = useState<SiteData>(defaultSiteData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/site-data")
      .then((r) => r.json())
      .then((data: Partial<SiteData>) => {
        if (data && Object.keys(data).length > 0) {
          setSiteData({ ...defaultSiteData, ...data });
        }
      })
      .catch(() => {
        // fallback to default
      })
      .finally(() => setLoading(false));
  }, []);

  const saveSiteData = useCallback(async (data: SiteData): Promise<boolean> => {
    try {
      const res = await fetch("/api/site-data", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (json.ok) {
        setSiteData(data);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }, []);

  return { siteData, setSiteData, saveSiteData, loading };
}
