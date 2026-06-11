"use client";

import { useEffect, useState } from "react";

type UseScrollSpyOptions = {
  /** Fixed header offset in px */
  offset?: number;
  /** Only run when enabled (e.g. homepage) */
  enabled?: boolean;
};

export function useScrollSpy(
  sectionIds: string[],
  { offset = 100, enabled = true }: UseScrollSpyOptions = {}
) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled || sectionIds.length === 0) {
      return;
    }

    const updateActiveSection = () => {
      const scrollPosition = window.scrollY + offset;
      const documentBottom =
        window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;

      let current: string | null = null;

      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (!element) continue;

        if (element.offsetTop <= scrollPosition) {
          current = id;
        }
      }

      if (documentBottom) {
        current = sectionIds[sectionIds.length - 1] ?? current;
      }

      setActiveId(current);
    };

    updateActiveSection();

    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [sectionIds, offset, enabled]);

  return enabled ? activeId : null;
}
