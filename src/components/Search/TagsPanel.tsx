import React from "react";
import { Tag, X } from "lucide-react";

interface TagsPanelProps {
  availableTags: string[];
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
}

const TagsPanel: React.FC<TagsPanelProps> = ({
  availableTags,
  selectedTags,
  onTagsChange,
}) => {
  const handleTagToggle = (tag: string) => {
    if (selectedTags.includes(tag)) {
      onTagsChange(selectedTags.filter((t) => t !== tag));
    } else {
      onTagsChange([...selectedTags, tag]);
    }
  };

  return (
    <div className="space-y-6 p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Tag className="w-6 h-6 text-gray-600" />
          <h3 className="text-lg font-medium text-gray-900">Tags</h3>
        </div>
        {selectedTags.length > 0 && (
          <button
            onClick={() => onTagsChange([])}
            className="text-xs text-gray-500 hover:text-gray-700 transition-colors duration-200"
          >
            Clear all
          </button>
        )}
      </div>

      {availableTags.length > 0 ? (
        <div className="flex flex-wrap gap-2 max-h-60 overflow-y-auto">
            {availableTags.map((tag) => {
              const isSelected = selectedTags.includes(tag);
              return (
                <button
                  key={tag}
                  onClick={() => handleTagToggle(tag)}
                  className={`inline-flex items-center px-3 py-1.5 text-sm rounded-full border transition-all duration-200 hover:shadow-md ${
                    isSelected
                      ? "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100"
                      : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                  }`}
                >
                  <Tag className="w-3 h-3 mr-1.5" />
                  {tag}
                  {isSelected && (
                    <X className="w-3 h-3 ml-1.5 hover:text-blue-600" />
                  )}
                </button>
              );
            })}
          </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <Tag className="w-12 h-12 mx-auto mb-3 opacity-40" />
          <p className="text-sm">No tags available</p>
          <p className="text-xs mt-1">Tags will appear here when you create prompts with tags</p>
        </div>
      )}
    </div>
  );
};

export default TagsPanel;
