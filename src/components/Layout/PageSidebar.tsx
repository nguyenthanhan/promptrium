"use client";

import React from "react";
import SearchBar from "@/components/Search/SearchBar";
import TagsPanel from "@/components/Search/TagsPanel";
import { Prompt } from "@/types";

interface PageSidebarProps {
  prompts: Prompt[];
  availableTags: string[];
  searchQuery: string;
  selectedTags: string[];
  mounted: boolean;
  onSearchChange: (query: string) => void;
  onTagsChange: (tags: string[]) => void;
}

export const PageSidebar: React.FC<PageSidebarProps> = ({
  prompts,
  availableTags,
  searchQuery,
  selectedTags,
  mounted,
  onSearchChange,
  onTagsChange,
}) => {
  return (
    <aside className="w-full lg:w-1/4 flex-shrink-0">
      <div className="space-y-6">
        {/* Search */}
        <SearchBar
          value={searchQuery}
          onChange={onSearchChange}
          placeholder="Search prompts..."
        />

        {/* Stats */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Statistics</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Total Prompts:</span>
              <span className="font-medium">
                {mounted && Array.isArray(prompts) ? prompts.length : 0}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Favorites:</span>
              <span className="font-medium">
                {mounted && Array.isArray(prompts)
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

        {/* Tags */}
        <TagsPanel
          availableTags={availableTags}
          selectedTags={selectedTags}
          onTagsChange={onTagsChange}
        />
      </div>
    </aside>
  );
};
