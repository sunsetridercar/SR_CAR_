"use client";
import React, { useState, useContext, useEffect } from "react";
import { GlobalQuery } from "@/tina/__generated__/types";

interface LayoutState {
  globalSettings: GlobalQuery["global"];
  setGlobalSettings: React.Dispatch<
    React.SetStateAction<GlobalQuery["global"]>
  >;
  pageData: {};
  setPageData: React.Dispatch<React.SetStateAction<{}>>;
  lang: string;
}

const LayoutContext = React.createContext<LayoutState | undefined>(undefined);

export const useLayout = () => {
  const context = useContext(LayoutContext);
  return (
    context || {
      globalSettings: undefined,
      pageData: undefined,
      lang: "en",
    }
  );
};

interface LayoutProviderProps {
  children: React.ReactNode;
  globalSettings: GlobalQuery["global"];
  pageData: {};
  lang: string;
}

export const LayoutProvider: React.FC<LayoutProviderProps> = ({
  children,
  globalSettings: initialGlobalSettings,
  pageData: initialPageData,
  lang,
}) => {
  const [globalSettings, setGlobalSettings] =
    useState<GlobalQuery["global"]>(initialGlobalSettings);
  const [pageData, setPageData] = useState<{}>(initialPageData);

  // Met à jour l'attribut lang du document pour les lecteurs d'écran.
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  return (
    <LayoutContext.Provider
      value={{
        globalSettings,
        setGlobalSettings,
        pageData,
        setPageData,
        lang,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
};
