import { useState, useCallback } from "react";
import type { Dispatch, SetStateAction } from "react";
import { Prompt, Settings } from "@/types";
import { downloadFile } from "@/utils/helpers";
import { useToast } from "@/components/ui/use-toast";
import {
  SUCCESS_MESSAGES,
  ERROR_MESSAGES,
  EXPORT,
  DEFAULT_SETTINGS,
} from "@/constants";

interface UsePromptDataOperationsProps {
  prompts: Prompt[];
  settings: Settings;
  setPrompts: Dispatch<SetStateAction<Prompt[]>>;
  setSettings: Dispatch<SetStateAction<Settings>>;
}

export const usePromptDataOperations = ({
  prompts,
  settings,
  setPrompts,
  setSettings,
}: UsePromptDataOperationsProps) => {
  const { success, error } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const getDefaultSettings = (): Settings => ({
    theme: DEFAULT_SETTINGS.THEME,
    view_mode: DEFAULT_SETTINGS.VIEW_MODE,
    layout_density: DEFAULT_SETTINGS.LAYOUT_DENSITY,
    last_backup: 0, // Will be updated when actually needed
  });

  const validateSettings = (importedSettings: any): Partial<Settings> => {
    const validSettings: Partial<Settings> = {};

    // Validate theme
    if (
      importedSettings.theme === "light" ||
      importedSettings.theme === "dark"
    ) {
      validSettings.theme = importedSettings.theme;
    }

    // Validate view_mode
    if (
      importedSettings.view_mode === "grid" ||
      importedSettings.view_mode === "list"
    ) {
      validSettings.view_mode = importedSettings.view_mode;
    }

    // Validate layout_density
    if (
      importedSettings.layout_density === "compact" ||
      importedSettings.layout_density === "comfortable" ||
      importedSettings.layout_density === "expanded"
    ) {
      validSettings.layout_density = importedSettings.layout_density;
    }

    // Validate last_backup (must be a number)
    if (
      typeof importedSettings.last_backup === "number" &&
      importedSettings.last_backup > 0
    ) {
      validSettings.last_backup = importedSettings.last_backup;
    }

    return validSettings;
  };

  const handleExportData = useCallback(() => {
    const jsonData = JSON.stringify(
      {
        prompts,
        settings,
        exportDate: new Date().toISOString(),
        version: EXPORT.VERSION,
      },
      null,
      2
    );

    const filename = `promptrium-export-${
      new Date().toISOString().split("T")[0]
    }.json`;
    downloadFile(jsonData, filename, EXPORT.MIME_TYPE);

    setSettings((prev) => ({ ...prev, last_backup: Date.now() }));
    success(SUCCESS_MESSAGES.DATA_EXPORTED);
  }, [prompts, settings, setSettings, success]);

  const handleImportData = useCallback(
    async (file: File) => {
      try {
        setIsLoading(true);
        const text = await file.text();
        const data = JSON.parse(text);

        if (!data.prompts || !Array.isArray(data.prompts)) {
          throw new Error(ERROR_MESSAGES.OPERATIONS.INVALID_DATA_FORMAT);
        }

        setPrompts(data.prompts);
        if (data.settings) {
          const validatedSettings = validateSettings(data.settings);
          setSettings((prev) => ({ ...prev, ...validatedSettings }));
        }

        success(SUCCESS_MESSAGES.DATA_IMPORTED);
      } catch {
        error(
          ERROR_MESSAGES.OPERATIONS.IMPORT_FAILED,
          "Please check the file format."
        );
      } finally {
        setIsLoading(false);
      }
    },
    [setPrompts, setSettings, success, error]
  );

  const clearAllData = useCallback(() => {
    setPrompts([]);
    setSettings(getDefaultSettings());
    success(SUCCESS_MESSAGES.ALL_DATA_CLEARED);
  }, [setPrompts, setSettings, success]);

  return {
    isLoading,
    exportData: handleExportData,
    importData: handleImportData,
    clearAllData,
  };
};
