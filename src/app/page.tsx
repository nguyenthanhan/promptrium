"use client";

import React from "react";
import { usePageLogic } from "@/hooks/usePageLogic";
import { PageHeader } from "@/components/Layout/PageHeader";
import { PageMainContent } from "@/components/Layout/PageMainContent";
import { PageModals } from "@/components/Layout/PageModals";
import { FilterSidebar } from "@/components/Search/FilterSidebar";

export default function Home() {
  const {
    // Data
    prompts,
    filteredPrompts,
    availableTags,
    mounted,

    // State
    selectedPrompt,
    modalType,
    searchQuery,
    selectedTags,
    sortBy,
    sortOrder,

    // Handlers
    handleSearchChange,
    handleTagsChange,
    handleSortChange,
    handleImport,
    openCreateModal,
    openEditModal,
    openDeleteModal,
    closeModal,
    handlePromptSubmit,
    handlePromptDelete,
    handlePromptCopy,
    handlePromptFavorite,
    exportData,
  } = usePageLogic();

  return (
    <div className="min-h-screen bg-background">
      <PageHeader
        searchQuery={searchQuery}
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSearchChange={handleSearchChange}
        onCreateClick={openCreateModal}
        onSortChange={handleSortChange}
        onExport={exportData}
        onImport={handleImport}
      />

      <div className="px-4 py-4 flex flex-col lg:flex-row gap-4">
        <FilterSidebar
          availableTags={availableTags}
          selectedTags={selectedTags}
          prompts={prompts}
          onTagsChange={handleTagsChange}
        />

        <div className="flex-1">
          <PageMainContent
            prompts={prompts}
            filteredPrompts={filteredPrompts}
            mounted={mounted}
            onCreateClick={openCreateModal}
            onEditPrompt={openEditModal}
            onDeletePrompt={openDeleteModal}
            onCopyPrompt={handlePromptCopy}
            onToggleFavorite={handlePromptFavorite}
          />
        </div>
      </div>

      <PageModals
        modalType={modalType}
        selectedPrompt={selectedPrompt}
        onCloseModal={closeModal}
        onSubmitPrompt={handlePromptSubmit}
        onDeletePrompt={handlePromptDelete}
      />
    </div>
  );
}
