import { useState, useMemo, useEffect, useCallback } from "react";
import { usePrompts } from "@/contexts/PromptContext";
import { useToast } from "@/components/ui/use-toast";
import { getAllTags } from "@/utils/helpers";
import { Prompt, ModalType, PromptFormData } from "@/types";

export const usePageLogic = () => {
  const {
    prompts,
    settings,
    filteredPrompts,
    addPrompt,
    updatePrompt,
    deletePrompt,
    toggleFavorite,
    incrementUsage,
    updateSettings,
    setSearchQuery,
    setSelectedTags,
    setShowFavorites,
    setSortOptions,
    exportData,
    importData,
  } = usePrompts();

  const { toast } = useToast();

  // Local state
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
  const [modalType, setModalType] = useState<ModalType>(null);
  const [searchQuery, setSearchQueryLocal] = useState("");
  const [selectedTags, setSelectedTagsLocal] = useState<string[]>([]);
  const [showFavorites, setShowFavoritesLocal] = useState(false);
  const [sortBy, setSortBy] = useState("updated");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [mounted, setMounted] = useState(false);

  // Get available tags
  const availableTags = useMemo(() => {
    if (!mounted) return [];
    return getAllTags(prompts);
  }, [prompts, mounted]);

  // Set mounted state after component mounts to prevent hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle search and filter changes
  const handleSearchChange = useCallback((query: string) => {
    setSearchQueryLocal(query);
    setSearchQuery(query);
  }, [setSearchQuery]);

  const handleTagsChange = useCallback((tags: string[]) => {
    setSelectedTagsLocal(tags);
    setSelectedTags(tags);
  }, [setSelectedTags]);

  const handleFavoritesChange = useCallback((show: boolean) => {
    setShowFavoritesLocal(show);
    setShowFavorites(show);
  }, [setShowFavorites]);

  const handleSortChange = useCallback((
    newSortBy: string,
    newSortOrder: "asc" | "desc"
  ) => {
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
    setSortOptions(newSortBy, newSortOrder);
  }, [setSortOptions]);

  // Import handler
  const handleImport = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        await importData(file);
      } catch {
        toast({
          title: "Import failed",
          description: "Failed to import data. Please check the file format.",
        });
      }
    }
    // Reset file input
    event.target.value = "";
  }, [importData, toast]);

  const handleViewModeChange = useCallback((viewMode: string) => {
    if (viewMode === "grid" || viewMode === "list") {
      updateSettings({ view_mode: viewMode });
    }
  }, [updateSettings]);

  const handleLayoutDensityChange = useCallback((density: string) => {
    if (density === "compact" || density === "comfortable" || density === "expanded") {
      updateSettings({ layout_density: density });
    }
  }, [updateSettings]);

  // Modal handlers
  const openCreateModal = useCallback(() => {
    setSelectedPrompt(null);
    setModalType("create");
  }, []);

  const openEditModal = useCallback((prompt: Prompt) => {
    setSelectedPrompt(prompt);
    setModalType("edit");
  }, []);

  const openDeleteModal = useCallback((prompt: Prompt) => {
    setSelectedPrompt(prompt);
    setModalType("delete");
  }, []);

  const closeModal = useCallback(() => {
    setModalType(null);
    setSelectedPrompt(null);
  }, []);

  // Prompt handlers
  const handlePromptSubmit = useCallback((formData: PromptFormData) => {
    if (modalType === "create") {
      addPrompt(formData);
    } else if (modalType === "edit" && selectedPrompt) {
      updatePrompt(selectedPrompt.id, formData);
    }
    closeModal();
  }, [modalType, selectedPrompt, addPrompt, updatePrompt, closeModal]);

  const handlePromptDelete = useCallback(() => {
    if (selectedPrompt) {
      deletePrompt(selectedPrompt.id);
      closeModal();
    }
  }, [selectedPrompt, deletePrompt, closeModal]);

  const handlePromptCopy = useCallback((prompt: Prompt) => {
    incrementUsage(prompt.id);
  }, [incrementUsage]);

  const handlePromptFavorite = useCallback((prompt: Prompt) => {
    toggleFavorite(prompt.id);
  }, [toggleFavorite]);

  return {
    // Data
    prompts,
    settings,
    filteredPrompts,
    availableTags,
    mounted,
    
    // State
    selectedPrompt,
    modalType,
    searchQuery,
    selectedTags,
    showFavorites,
    sortBy,
    sortOrder,
    
    // Handlers
    handleSearchChange,
    handleTagsChange,
    handleFavoritesChange,
    handleSortChange,
    handleImport,
    handleViewModeChange,
    handleLayoutDensityChange,
    openCreateModal,
    openEditModal,
    openDeleteModal,
    closeModal,
    handlePromptSubmit,
    handlePromptDelete,
    handlePromptCopy,
    handlePromptFavorite,
    exportData,
  };
};
