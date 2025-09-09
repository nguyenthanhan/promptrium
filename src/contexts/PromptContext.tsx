"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { Prompt, Settings, PromptContextType } from "@/types";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { usePromptDataOperations } from "@/hooks/usePromptDataOperations";
import { PromptDataProvider, usePromptData } from "./PromptDataContext";
import { PromptFiltersProvider, usePromptFilters } from "./PromptFiltersContext";
import { STORAGE_KEYS, DEFAULT_SETTINGS } from "@/constants";

const PromptContext = createContext<PromptContextType | undefined>(undefined);

export const usePrompts = () => {
  const context = useContext(PromptContext);
  if (!context) {
    throw new Error("usePrompts must be used within a PromptProvider");
  }
  return context;
};

const defaultSettings: Settings = {
  theme: DEFAULT_SETTINGS.THEME,
  view_mode: DEFAULT_SETTINGS.VIEW_MODE,
  layout_density: DEFAULT_SETTINGS.LAYOUT_DENSITY,
  last_backup: Date.now(),
};

// Internal provider that combines all contexts
const InternalPromptProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [settings, setSettings] = useLocalStorage<Settings>(
    STORAGE_KEYS.SETTINGS,
    defaultSettings
  );
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);

  // Get prompt data operations
  const {
    prompts,
    addPrompt,
    updatePrompt,
    deletePrompt,
    toggleFavorite,
    incrementUsage,
    setPrompts,
  } = usePromptData();

  // Get filter operations
  const {
    filteredPrompts,
    setSearchQuery,
    setSelectedTags,
    setShowFavorites,
    setSortOptions,
  } = usePromptFilters();

  // Get data operations (export, import, clear)
  const { isLoading, exportData, importData, clearAllData } =
    usePromptDataOperations({
      prompts,
      settings,
      setPrompts,
      setSettings,
    });

  const selectPrompt = useCallback((prompt: Prompt | null) => {
    setSelectedPrompt(prompt);
  }, []);

  const updateSettings = useCallback(
    (newSettings: Partial<Settings>) => {
      setSettings((prev) => ({ ...prev, ...newSettings }));
    },
    [setSettings]
  );

  const handleDeletePrompt = useCallback(
    (id: string) => {
      deletePrompt(id);
      if (selectedPrompt?.id === id) {
        setSelectedPrompt(null);
      }
    },
    [deletePrompt, selectedPrompt]
  );

  const contextValue: PromptContextType = {
    prompts,
    settings,
    filteredPrompts,
    selectedPrompt,
    isLoading,
    addPrompt,
    updatePrompt,
    deletePrompt: handleDeletePrompt,
    toggleFavorite,
    incrementUsage,
    selectPrompt,
    updateSettings,
    setSearchQuery,
    setSelectedTags,
    setShowFavorites,
    setSortOptions,
    exportData,
    importData,
    clearAllData,
  };

  return (
    <PromptContext.Provider value={contextValue}>
      {children}
    </PromptContext.Provider>
  );
};

// Intermediate component to get prompts data and pass to filters
const PromptProviderWithData: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { prompts } = usePromptData();
  return (
    <PromptFiltersProvider prompts={prompts}>
      <InternalPromptProvider>{children}</InternalPromptProvider>
    </PromptFiltersProvider>
  );
};

// Main provider that wraps everything
export const PromptProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <PromptDataProvider>
      <PromptProviderWithData>{children}</PromptProviderWithData>
    </PromptDataProvider>
  );
};
