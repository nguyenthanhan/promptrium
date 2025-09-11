import React from "react";
import { FilterPanelProps, SortKey } from "@/types";
import {
  Filter,
  Heart,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const FilterPanel: React.FC<FilterPanelProps> = ({
  availableTags,
  selectedTags,
  onTagsChange,
  showFavorites,
  onFavoritesChange,
  sortBy,
  sortOrder,
  onSortChange,
}) => {
  const handleTagToggle = (tag: string) => {
    if (selectedTags.includes(tag)) {
      onTagsChange(selectedTags.filter((t) => t !== tag));
    } else {
      onTagsChange([...selectedTags, tag]);
    }
  };

  const handleSortChange = (newSortBy: SortKey) => {
    if (sortBy === newSortBy) {
      onSortChange(newSortBy, sortOrder === "asc" ? "desc" : "asc");
    } else {
      onSortChange(newSortBy, "desc");
    }
  };

  const isTagSelected = (tag: string) => selectedTags.includes(tag);

  const sortOptions: { key: SortKey; label: string }[] = [
    { key: "updated", label: "Last Updated" },
    { key: "created", label: "Created Date" },
    { key: "name", label: "Name" },
    { key: "usage", label: "Usage Count" },
  ];

  const getSortIcon = (optionKey: SortKey) => {
    if (sortBy !== optionKey) return <ArrowUpDown className="w-4 h-4" />;
    return sortOrder === "asc" ? (
      <ArrowUp className="w-4 h-4" />
    ) : (
      <ArrowDown className="w-4 h-4" />
    );
  };

  return (
    <div className="space-y-6 p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
      <div className="flex items-center space-x-2">
        <Filter className="w-6 h-6 text-gray-600" />
        <h3 className="text-lg font-medium text-gray-900">Filters</h3>
      </div>

      {availableTags.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-gray-700">Tags</h4>
            {selectedTags.length > 0 && (
              <button
                type="button"
                onClick={() => onTagsChange([])}
                className="text-xs text-gray-500 hover:text-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 rounded"
                aria-label="Clear all selected tags"
              >
                Clear all
              </button>
            )}
          </div>

          {selectedTags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-2">
              {selectedTags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-3 py-1.5 text-sm bg-blue-50 text-blue-700 rounded-full border border-blue-200 shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleTagToggle(tag)}
                    className="ml-1 hover:text-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 rounded"
                    aria-label={`Remove ${tag} tag`}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </span>
              ))}
            </div>
          )}

          <div className="max-h-40 overflow-y-auto space-y-1">
            {availableTags
              .filter((tag) => !selectedTags.includes(tag))
              .map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleTagToggle(tag)}
                  className="block w-full text-left px-3 py-2.5 text-sm text-gray-600 hover:bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
                  aria-label={`Toggle tag ${tag}`}
                  aria-pressed={isTagSelected(tag)}
                >
                  {tag}
                </button>
              ))}
          </div>
        </div>
      )}

      <div className="space-y-2">
        <h4 className="text-sm font-medium text-gray-700">Quick Filter</h4>
        <Button
          type="button"
          variant={showFavorites ? "default" : "ghost"}
          size="sm"
          onClick={() => onFavoritesChange(!showFavorites)}
          className="w-full justify-start"
          aria-pressed={showFavorites}
        >
          <Heart
            className={`w-6 h-6 mr-2 ${showFavorites ? "fill-current" : ""}`}
            aria-hidden="true"
          />
          Favorites Only
        </Button>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium text-gray-700">Sort By</h4>
        <div className="space-y-1" role="radiogroup" aria-label="Sort options">
          {sortOptions.map((option) => (
            <button
              key={option.key}
              onClick={() => handleSortChange(option.key)}
              type="button"
              role="radio"
              aria-checked={sortBy === option.key}
              aria-label={`${option.label}, ${sortBy === option.key ? (sortOrder === "asc" ? "ascending" : "descending") : "not selected"}`}
              className={`w-full flex items-center justify-between px-3 py-2.5 text-sm rounded-lg shadow-sm hover:shadow-md transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${
                sortBy === option.key
                  ? "bg-blue-50 text-blue-700 border border-blue-200"
                  : "hover:bg-gray-50 text-gray-600 border border-transparent"
              }`}
            >
              <span>{option.label}</span>
              <span className="flex items-center gap-2">
                {getSortIcon(option.key)}
                <span className="sr-only">
                  {sortBy === option.key
                    ? sortOrder === "asc"
                      ? "Ascending"
                      : "Descending"
                    : ""}
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
