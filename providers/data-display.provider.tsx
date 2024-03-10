"use client";

import { createContext, useContext, useState } from "react";

export enum Display {
  table = "table",
  grid = "grid",
}

interface DisplayProviderProps {
  children: React.ReactNode;
  type: string;
}

type DisplayProviderState = {
  displayType: Display;
  setDisplay: (theme: Display) => void;
};

const initialState = {
  displayType: Display.table,
  setDisplay: () => null,
};

const DisplayProviderContext =
  createContext<DisplayProviderState>(initialState);

export function DisplayProvider({ children, type }: DisplayProviderProps) {
  const [displayType, setDisplay] = useState<Display>(Display.table);

  const value = {
    displayType,
    setDisplay: (displayType: Display) => {
      setDisplay(displayType);
    },
  };

  return (
    <DisplayProviderContext.Provider value={value}>
      {children}
    </DisplayProviderContext.Provider>
  );
}

export const useDisplay = () => {
  const context = useContext(DisplayProviderContext);

  if (context === undefined)
    throw new Error("useDisplay must be used within a ThemeProvider");

  return context;
};
