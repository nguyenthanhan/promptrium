import React, { useMemo } from "react";
import { Tag } from "lucide-react";
import { Prompt } from "@/types";

interface FilterSidebarProps {
  availableTags: string[];
  selectedTags: string[];
  prompts: Prompt[];
  onTagsChange: (tags: string[]) => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  availableTags,
  selectedTags,
  prompts,
  onTagsChange,
}) => {
  const handleTagClick = (tag: string) => {
    if (selectedTags.includes(tag)) {
      onTagsChange(selectedTags.filter((t) => t !== tag));
    } else {
      onTagsChange([...selectedTags, tag]);
    }
  };

  // Count prompts per tag
  const tagCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    prompts.forEach((prompt) => {
      prompt.tags.forEach((tag) => {
        counts[tag] = (counts[tag] || 0) + 1;
      });
    });
    return counts;
  }, [prompts]);

  const getTagCount = (tag: string) => {
    return tagCounts[tag] || 0;
  };

  return (
    <aside className="w-64 bg-white border border-gray-200 p-4 rounded-lg sticky top-4 flex flex-col max-h-[calc(100vh-6rem)]">
      <h2 className="text-lg font-semibold mb-4 text-gray-900 flex-shrink-0">
        Tags
      </h2>

      <div className="space-y-0.5 overflow-y-auto flex-1 pr-2 scrollbar-custom min-h-0">
        {availableTags.map((tag) => {
          const isSelected = selectedTags.includes(tag);
          const count = getTagCount(tag);

          return (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              className={`w-full flex items-center justify-between px-4 py-2 rounded-lg transition-all duration-200 ${
                isSelected
                  ? "bg-blue-50 text-blue-700 border border-blue-200"
                  : "text-gray-600 hover:bg-gray-50 border border-transparent"
              }`}
            >
              <div className="flex items-center gap-3">
                <Tag className="w-4 h-4" />
                <span className="text-sm">{tag}</span>
              </div>
              {count > 0 && (
                <span
                  className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                    isSelected
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {selectedTags.length > 0 && (
        <button
          onClick={() => onTagsChange([])}
          className="w-full mt-4 px-4 py-2 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors flex-shrink-0"
        >
          Clear all filters
        </button>
      )}
    </aside>
  );
};
