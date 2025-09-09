"use client";

import React from "react";
import { usePageLogic } from "@/hooks/usePageLogic";
import { PageHeader } from "@/components/Layout/PageHeader";
import { PageSidebar } from "@/components/Layout/PageSidebar";
import { PageMainContent } from "@/components/Layout/PageMainContent";
import { PageModals } from "@/components/Layout/PageModals";

export default function Home() {
  const {
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
  } = usePageLogic();

  return (
    <div className="min-h-screen">
      <PageHeader
        settings={settings}
        showFavorites={showFavorites}
        sortBy={sortBy}
        sortOrder={sortOrder}
        onCreateClick={openCreateModal}
        onViewModeChange={handleViewModeChange}
        onLayoutDensityChange={handleLayoutDensityChange}
        onFavoritesChange={handleFavoritesChange}
        onSortChange={handleSortChange}
        onExport={exportData}
        onImport={handleImport}
      />

      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          <PageSidebar
            prompts={prompts}
            availableTags={availableTags}
            searchQuery={searchQuery}
            selectedTags={selectedTags}
            mounted={mounted}
            onSearchChange={handleSearchChange}
            onTagsChange={handleTagsChange}
          />

          <PageMainContent
            prompts={prompts}
            filteredPrompts={filteredPrompts}
            settings={settings}
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
