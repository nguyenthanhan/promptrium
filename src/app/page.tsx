"use client";

import React, { useState, useMemo, useEffect } from "react";
import { usePrompts } from "@/contexts/PromptContext";
import { useToast } from "@/components/ui/use-toast";
import { getAllTags } from "@/utils/helpers";
import { Prompt, ModalType, PromptFormData } from "@/types";

// Components
import SearchBar from "@/components/Search/SearchBar";
import FilterPanel from "@/components/Search/FilterPanel";
import PromptCard from "@/components/Prompt/PromptCard";
import PromptForm from "@/components/Prompt/PromptForm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

// Icons
import {
  Plus,
  Grid,
  List,
  Download,
  Upload,
  FileText,
  Trash2,
  Github,
} from "lucide-react";

export default function Home() {
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
  const handleSearchChange = (query: string) => {
    setSearchQueryLocal(query);
    setSearchQuery(query);
  };

  const handleTagsChange = (tags: string[]) => {
    setSelectedTagsLocal(tags);
    setSelectedTags(tags);
  };

  const handleFavoritesChange = (show: boolean) => {
    setShowFavoritesLocal(show);
    setShowFavorites(show);
  };

  const handleSortChange = (
    newSortBy: string,
    newSortOrder: "asc" | "desc"
  ) => {
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
    setSortOptions(newSortBy, newSortOrder);
  };

  // Import handler
  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
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
  };

  const handleViewModeToggle = () => {
    const newViewMode = settings.view_mode === "grid" ? "list" : "grid";
    updateSettings({ view_mode: newViewMode });
  };

  // Modal handlers
  const openCreateModal = () => {
    setSelectedPrompt(null);
    setModalType("create");
  };

  const openEditModal = (prompt: Prompt) => {
    setSelectedPrompt(prompt);
    setModalType("edit");
  };

  const openDeleteModal = (prompt: Prompt) => {
    setSelectedPrompt(prompt);
    setModalType("delete");
  };

  const closeModal = () => {
    setModalType(null);
    setSelectedPrompt(null);
  };

  // Prompt handlers
  const handlePromptSubmit = (formData: PromptFormData) => {
    if (modalType === "create") {
      addPrompt(formData);
    } else if (modalType === "edit" && selectedPrompt) {
      updatePrompt(selectedPrompt.id, formData);
    }
    closeModal();
  };

  const handlePromptDelete = () => {
    if (selectedPrompt) {
      deletePrompt(selectedPrompt.id);
      closeModal();
    }
  };

  const handlePromptCopy = (prompt: Prompt) => {
    incrementUsage(prompt.id);
  };

  const handlePromptFavorite = (prompt: Prompt) => {
    toggleFavorite(prompt.id);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <FileText className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Promptrium</h1>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" onClick={handleViewModeToggle}>
                {settings.view_mode === "grid" ? (
                  <List className="w-4 h-4" />
                ) : (
                  <Grid className="w-4 h-4" />
                )}
              </Button>

              <Button variant="ghost" size="sm" onClick={exportData}>
                <Download className="w-4 h-4 mr-1" />
                Export
              </Button>

              <div className="relative">
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImport}
                  className="sr-only"
                  id="import-file"
                  ref={(input) => {
                    if (input) {
                      // Store reference for click handling
                      (
                        window as Window & {
                          importFileInput?: HTMLInputElement;
                        }
                      ).importFileInput = input;
                    }
                  }}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    const input = document.getElementById(
                      "import-file"
                    ) as HTMLInputElement;
                    if (input) {
                      input.click();
                    }
                  }}
                >
                  <Upload className="w-4 h-4 mr-1" />
                  Import
                </Button>
              </div>

              <a
                href="https://github.com/nguyenthanhan/promptrium"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 px-3 py-2 text-sm bg-transparent hover:bg-gray-100 text-gray-700 focus:ring-gray-500"
              >
                <Github className="w-4 h-4" />
              </a>

              <Button
                variant="default"
                onClick={openCreateModal}
                aria-label="Create a new prompt"
              >
                <Plus className="w-4 h-4" />
                New Prompt
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="w-80 flex-shrink-0">
            <div className="space-y-6">
              {/* Search */}
              <SearchBar
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search prompts..."
              />

              {/* Filters */}
              <FilterPanel
                availableTags={availableTags}
                selectedTags={selectedTags}
                onTagsChange={handleTagsChange}
                showFavorites={showFavorites}
                onFavoritesChange={handleFavoritesChange}
                sortBy={sortBy}
                sortOrder={sortOrder}
                onSortChange={handleSortChange}
              />

              {/* Stats */}
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-3">
                  Statistics
                </h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Total Prompts:</span>
                    <span className="font-medium">
                      {mounted ? prompts.length : 0}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Favorites:</span>
                    <span className="font-medium">
                      {mounted
                        ? prompts.filter((p) => p.is_favorite).length
                        : 0}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tags:</span>
                    <span className="font-medium">{availableTags.length}</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1">
            {!mounted ? (
              // Loading state during hydration
              <div className="text-center py-12">
                <div className="animate-pulse">
                  <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-48 mx-auto mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-32 mx-auto"></div>
                </div>
              </div>
            ) : filteredPrompts.length === 0 ? (
              <div className="text-center py-12">
                {prompts.length === 0 ? (
                  // Empty state - no prompts
                  <div className="space-y-4">
                    <FileText className="w-16 h-16 text-gray-400 mx-auto" />
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        No prompts yet
                      </h3>
                      <p className="text-gray-500 mt-2">
                        Create your first prompt to get started.
                      </p>
                    </div>
                    <Button
                      variant="default"
                      onClick={openCreateModal}
                      aria-label="Create your first prompt"
                    >
                      <Plus className="w-4 h-4" />
                      Create Your First Prompt
                    </Button>
                  </div>
                ) : (
                  // No search results
                  <div className="space-y-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto">
                      <FileText className="w-8 h-8 text-gray-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        No prompts found
                      </h3>
                      <p className="text-gray-500 mt-2">
                        Try adjusting your search or filters.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              // Prompt grid/list
              <div
                className={
                  settings.view_mode === "grid"
                    ? "grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
                    : "space-y-4"
                }
              >
                {filteredPrompts.map((prompt) => (
                  <PromptCard
                    key={prompt.id}
                    prompt={prompt}
                    viewMode={settings.view_mode}
                    onEdit={openEditModal}
                    onDelete={openDeleteModal}
                    onCopy={handlePromptCopy}
                    onToggleFavorite={handlePromptFavorite}
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Create/Edit Dialog */}
      <Dialog
        open={modalType === "create" || modalType === "edit"}
        onOpenChange={(open) => {
          if (!open) closeModal();
        }}
      >
        <DialogContent className="max-w-[95vw] sm:max-w-[85vw] md:max-w-[70vw] lg:max-w-[60vw] xl:max-w-[50vw] max-h-[90vh] flex flex-col p-0 [&>button]:z-20">
          <DialogHeader className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 sm:px-6 py-4 rounded-t-lg">
            <DialogTitle>
              {modalType === "create" ? "Create New Prompt" : "Edit Prompt"}
            </DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-y-auto">
            <PromptForm
              prompt={selectedPrompt || undefined}
              onSubmit={handlePromptSubmit}
              onCancel={closeModal}
            />
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog
        open={modalType === "delete"}
        onOpenChange={(open) => {
          if (!open) closeModal();
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Prompt</DialogTitle>
          </DialogHeader>
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <Trash2 className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                Delete &ldquo;{selectedPrompt?.title}&rdquo;
              </h3>
              <p className="text-sm text-gray-500">
                This action cannot be undone.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={closeModal}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handlePromptDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
