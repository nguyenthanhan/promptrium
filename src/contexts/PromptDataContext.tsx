"use client";

import React, { createContext, useContext, useCallback, useMemo } from "react";
import { Prompt, PromptFormData } from "@/types";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { validatePrompt, deduplicateTags } from "@/utils/helpers";
import { useToast } from "@/components/ui/use-toast";
import { v4 as uuidv4 } from "uuid";
import { STORAGE_KEYS, SUCCESS_MESSAGES, ERROR_MESSAGES } from "@/constants";

interface PromptDataContextType {
  prompts: Prompt[];
  addPrompt: (promptData: PromptFormData) => void;
  updatePrompt: (id: string, promptData: PromptFormData) => void;
  deletePrompt: (id: string) => void;
  toggleFavorite: (id: string) => void;
  incrementUsage: (id: string) => void;
  setPrompts: React.Dispatch<React.SetStateAction<Prompt[]>>;
}

const PromptDataContext = createContext<PromptDataContextType | undefined>(
  undefined
);

export const usePromptData = () => {
  const context = useContext(PromptDataContext);
  if (!context) {
    throw new Error("usePromptData must be used within a PromptDataProvider");
  }
  return context;
};

export const PromptDataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { success, error } = useToast();
  const [prompts, setPrompts] = useLocalStorage<Prompt[]>(
    STORAGE_KEYS.PROMPTS,
    []
  );

  const addPrompt = useCallback(
    (promptData: PromptFormData) => {
      const validation = validatePrompt(promptData);
      if (!validation.isValid) {
        error(
          ERROR_MESSAGES.OPERATIONS.VALIDATION_FAILED,
          validation.errors.join(", ")
        );
        return;
      }

      const newPrompt: Prompt = {
        id: uuidv4(),
        title: promptData.title.trim(),
        content: promptData.content.trim(),
        description: "",
        tags: deduplicateTags(promptData.tags),
        created_at: Date.now(),
        updated_at: Date.now(),
        usage_count: 0,
        is_favorite: false,
      };

      setPrompts((prev) => [...prev, newPrompt]);
      success(SUCCESS_MESSAGES.PROMPT_CREATED);
    },
    [setPrompts, success, error]
  );

  const updatePrompt = useCallback(
    (id: string, promptData: PromptFormData) => {
      const validation = validatePrompt(promptData);
      if (!validation.isValid) {
        error(
          ERROR_MESSAGES.OPERATIONS.VALIDATION_FAILED,
          validation.errors.join(", ")
        );
        return;
      }

      setPrompts((prev) =>
        prev.map((prompt) =>
          prompt.id === id
            ? {
                ...prompt,
                title: promptData.title.trim(),
                content: promptData.content.trim(),
                tags: deduplicateTags(promptData.tags),
                updated_at: Date.now(),
              }
            : prompt
        )
      );

      success(SUCCESS_MESSAGES.PROMPT_UPDATED);
    },
    [setPrompts, success, error]
  );

  const deletePrompt = useCallback(
    (id: string) => {
      setPrompts((prev) => prev.filter((prompt) => prompt.id !== id));
      success(SUCCESS_MESSAGES.PROMPT_DELETED);
    },
    [setPrompts, success]
  );

  const toggleFavorite = useCallback(
    (id: string) => {
      setPrompts((prev) =>
        prev.map((prompt) =>
          prompt.id === id
            ? {
                ...prompt,
                is_favorite: !prompt.is_favorite,
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
              }
            : prompt
        )
      );
    },
    [setPrompts]
  );

  const contextValue: PromptDataContextType = useMemo(
    () => ({
      prompts,
      addPrompt,
      updatePrompt,
      deletePrompt,
      toggleFavorite,
      incrementUsage,
      setPrompts,
    }),
    [
      prompts,
      addPrompt,
      updatePrompt,
      deletePrompt,
      toggleFavorite,
      incrementUsage,
      setPrompts,
    ]
  );

  return (
    <PromptDataContext.Provider value={contextValue}>
      {children}
    </PromptDataContext.Provider>
  );
};
