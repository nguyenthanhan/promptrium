"use client";

import React, { createContext, useContext, useState, useCallback, useMemo, useEffect } from "react";
import { Prompt } from "@/types";
import { searchPrompts } from "@/utils/helpers";
import { SORT_KEYS, SORT_ORDER } from "@/constants";

interface PromptFiltersContextType {
  searchQuery: string;
  selectedTags: string[];
  showFavorites: boolean;
  sortBy: string;
  sortOrder: "asc" | "desc";
  filteredPrompts: Prompt[];
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>;
  setShowFavorites: React.Dispatch<React.SetStateAction<boolean>>;
  setSortOptions: (newSortBy: string, newSortOrder: "asc" | "desc") => void;
}

const PromptFiltersContext = createContext<PromptFiltersContextType | undefined>(undefined);

export const usePromptFilters = () => {
  const context = useContext(PromptFiltersContext);
  if (!context) {
    throw new Error("usePromptFilters must be used within a PromptFiltersProvider");
  }
  return context;
};

interface PromptFiltersProviderProps {
  children: React.ReactNode;
  prompts: Prompt[];
}

export const PromptFiltersProvider: React.FC<PromptFiltersProviderProps> = ({
  children,
  prompts,
}) => {
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [sortBy, setSortBy] = useState<string>(SORT_KEYS.UPDATED);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">(SORT_ORDER.DESC);

  // Set mounted state after component mounts to prevent hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredPrompts = useMemo(() => {
    // Return empty array until mounted to prevent hydration mismatch
    if (!mounted) return [];

    let filtered = [...prompts];

    if (searchQuery.trim()) {
      filtered = searchPrompts(filtered, searchQuery);
    }

    if (selectedTags.length > 0) {
      filtered = filtered.filter((prompt) =>
        selectedTags.every((tag) => prompt.tags.includes(tag))
      );
    }

    if (showFavorites) {
      filtered = filtered.filter((prompt) => prompt.is_favorite);
    }

    filtered.sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case SORT_KEYS.NAME:
          comparison = a.title.localeCompare(b.title);
          break;
        case SORT_KEYS.CREATED:
          comparison = a.created_at - b.created_at;
          break;
        case SORT_KEYS.UPDATED:
          comparison = a.updated_at - b.updated_at;
          break;
        case SORT_KEYS.USAGE:
          comparison = a.usage_count - b.usage_count;
          break;
        default:
          comparison = a.updated_at - b.updated_at;
      }
      return sortOrder === SORT_ORDER.ASC ? comparison : -comparison;
    });

    return filtered;
  }, [
    prompts,
    searchQuery,
    selectedTags,
    showFavorites,
    sortBy,
    sortOrder,
    mounted,
  ]);

  const setSortOptions = useCallback(
    (newSortBy: string, newSortOrder: "asc" | "desc") => {
      setSortBy(newSortBy);
      setSortOrder(newSortOrder);
    },
    []
  );

  const contextValue: PromptFiltersContextType = {
    searchQuery,
    selectedTags,
    showFavorites,
    sortBy,
    sortOrder,
    filteredPrompts,
    setSearchQuery,
    setSelectedTags,
    setShowFavorites,
    setSortOptions,
  };

  return (
    <PromptFiltersContext.Provider value={contextValue}>
      {children}
    </PromptFiltersContext.Provider>
  );
};
