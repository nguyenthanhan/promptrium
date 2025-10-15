"use client";

import React from "react";
import TagsPanel from "@/components/Search/TagsPanel";

interface PageSidebarProps {
  availableTags: string[];
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
}

export const PageSidebar: React.FC<PageSidebarProps> = ({
  availableTags,
  selectedTags,
  onTagsChange,
}) => {
  return (
    <aside className="w-full lg:w-1/4 flex-shrink-0">
      <TagsPanel
        availableTags={availableTags}
        selectedTags={selectedTags}
        onTagsChange={onTagsChange}
      />
    </aside>
  );
};
