"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from "react";
import { Prompt, Settings, PromptContextType, PromptFormData } from "@/types";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { searchPrompts, downloadFile, validatePrompt } from "@/utils/helpers";
import { useToast } from "@/components/ui/use-toast";
import { v4 as uuidv4 } from "uuid";

const PromptContext = createContext<PromptContextType | undefined>(undefined);

export const usePrompts = () => {
  const context = useContext(PromptContext);
  if (!context) {
    throw new Error("usePrompts must be used within a PromptProvider");
  }
  return context;
};

const defaultSettings: Settings = {
  theme: "light",
  view_mode: "grid",
  last_backup: Date.now(),
};

export const PromptProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { success, error } = useToast();
  const [mounted, setMounted] = useState(false);

  const [prompts, setPrompts] = useLocalStorage<Prompt[]>(
    "promptrium_prompts",
    []
  );
  const [settings, setSettings] = useLocalStorage<Settings>(
    "promptrium_settings",
    defaultSettings
  );

  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [sortBy, setSortBy] = useState<string>("updated");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

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
        case "name":
          comparison = a.title.localeCompare(b.title);
          break;
        case "created":
          comparison = a.created_at - b.created_at;
          break;
        case "updated":
          comparison = a.updated_at - b.updated_at;
          break;
        case "usage":
          comparison = a.usage_count - b.usage_count;
          break;
        default:
          comparison = a.updated_at - b.updated_at;
      }
      return sortOrder === "asc" ? comparison : -comparison;
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

  const addPrompt = useCallback(
    (promptData: PromptFormData) => {
      const validation = validatePrompt(promptData);
      if (!validation.isValid) {
        error("Validation failed", validation.errors.join(", "));
        return;
      }

      const newPrompt: Prompt = {
        id: uuidv4(),
        title: promptData.title.trim(),
        content: promptData.content.trim(),
        description: promptData.description.trim(),
        tags: Array.from(
          new Set(promptData.tags.map((t) => t.trim()).filter(Boolean))
        ),
        created_at: Date.now(),
        updated_at: Date.now(),
        usage_count: 0,
        is_favorite: false,
      };

      setPrompts((prev) => [...prev, newPrompt]);
      success("Prompt created successfully!");
    },
    [setPrompts]
  );

  const updatePrompt = useCallback(
    (id: string, promptData: PromptFormData) => {
      const validation = validatePrompt(promptData);
      if (!validation.isValid) {
        error("Validation failed", validation.errors.join(", "));
        return;
      }

      setPrompts((prev) =>
        prev.map((prompt) =>
          prompt.id === id
            ? {
                ...prompt,
                title: promptData.title.trim(),
                content: promptData.content.trim(),
                description: promptData.description.trim(),
                tags: Array.from(
                  new Set(promptData.tags.map((t) => t.trim()).filter(Boolean))
                ),
                updated_at: Date.now(),
              }
            : prompt
        )
      );

      success("Prompt updated successfully!");
    },
    [setPrompts]
  );

  const deletePrompt = useCallback(
    (id: string) => {
      setPrompts((prev) => prev.filter((prompt) => prompt.id !== id));
      if (selectedPrompt?.id === id) setSelectedPrompt(null);
      success("Prompt deleted successfully!");
    },
    [setPrompts, selectedPrompt]
  );

  const toggleFavorite = useCallback(
    (id: string) => {
      setPrompts((prev) =>
        prev.map((prompt) =>
          prompt.id === id
            ? {
                ...prompt,
                is_favorite: !prompt.is_favorite,
                updated_at: Date.now(),
              }
            : prompt
        )
      );
    },
    [setPrompts]
  );

  const incrementUsage = useCallback(
    (id: string) => {
      setPrompts((prev) =>
        prev.map((prompt) =>
          prompt.id === id
            ? {
                ...prompt,
                usage_count: prompt.usage_count + 1,
                updated_at: Date.now(),
              }
            : prompt
        )
      );
    },
    [setPrompts]
  );

  const selectPrompt = useCallback((prompt: Prompt | null) => {
    setSelectedPrompt(prompt);
  }, []);

  const updateSettings = useCallback(
    (newSettings: Partial<Settings>) => {
      setSettings((prev) => ({ ...prev, ...newSettings }));
    },
    [setSettings]
  );

  const setSortOptions = useCallback(
    (newSortBy: string, newSortOrder: "asc" | "desc") => {
      setSortBy(newSortBy);
      setSortOrder(newSortOrder);
    },
    []
  );

  const handleExportData = useCallback(() => {
    const jsonData = JSON.stringify(
      {
        prompts,
        settings,
        exportDate: new Date().toISOString(),
        version: "1.0.0",
      },
      null,
      2
    );

    const filename = `promptrium-export-${
      new Date().toISOString().split("T")[0]
    }.json`;
    downloadFile(jsonData, filename, "application/json");

    setSettings((prev) => ({ ...prev, last_backup: Date.now() }));
    success("Data exported successfully!");
  }, [prompts, settings, setSettings]);

  const handleImportData = useCallback(
    async (file: File) => {
      try {
        setIsLoading(true);
        const text = await file.text();
        const data = JSON.parse(text);

        if (!data.prompts || !Array.isArray(data.prompts)) {
          throw new Error("Invalid data format");
        }

        setPrompts(data.prompts);
        if (data.settings) {
          setSettings((prev) => ({ ...prev, ...data.settings }));
        }

        success("Data imported successfully!");
      } catch {
        error("Import failed", "Please check the file format.");
      } finally {
        setIsLoading(false);
      }
    },
    [setPrompts, setSettings]
  );

  const clearAllData = useCallback(() => {
    setPrompts([]);
    setSettings(defaultSettings);
    setSelectedPrompt(null);
    setSearchQuery("");
    setSelectedTags([]);
    setShowFavorites(false);
    success("All data cleared successfully!");
  }, [setPrompts, setSettings]);

  const contextValue: PromptContextType = {
    prompts,
    settings,
    filteredPrompts,
    selectedPrompt,
    isLoading,
    addPrompt,
    updatePrompt,
    deletePrompt,
    toggleFavorite,
    incrementUsage,
    selectPrompt,
    updateSettings,
    setSearchQuery,
    setSelectedTags,
    setShowFavorites,
    setSortOptions,
    exportData: handleExportData,
    importData: handleImportData,
    clearAllData,
  };

  return (
    <PromptContext.Provider value={contextValue}>
      {children}
    </PromptContext.Provider>
  );
};
