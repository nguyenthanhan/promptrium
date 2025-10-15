import React, { useState } from "react";
import { Tag, Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";

interface TagsDropdownProps {
  availableTags: string[];
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
}

const TagsDropdown: React.FC<TagsDropdownProps> = ({
  availableTags,
  selectedTags,
  onTagsChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tempSelectedTags, setTempSelectedTags] = useState<string[]>(selectedTags);

  // Sync temp tags with actual selected tags when dropdown opens
  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (open) {
      setTempSelectedTags(selectedTags);
    }
  };

  const handleTagToggle = (tag: string) => {
    if (tempSelectedTags.includes(tag)) {
      setTempSelectedTags(tempSelectedTags.filter((t) => t !== tag));
    } else {
      setTempSelectedTags([...tempSelectedTags, tag]);
    }
  };

  const handleApply = () => {
    onTagsChange(tempSelectedTags);
    setIsOpen(false);
  };

  const handleClearAll = () => {
    setTempSelectedTags([]);
  };

  return (
    <DropdownMenu onOpenChange={handleOpenChange}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="default"
          className="shadow-sm hover:shadow-md transition-all duration-200 relative"
        >
          <Tag className="w-5 h-5 mr-2" />
          Filter by Tags
          {selectedTags.length > 0 && (
            <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">
              {selectedTags.length}
            </span>
          )}
          <ChevronDown
            className={`w-4 h-4 ml-2 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="w-64 bg-white shadow-lg border border-gray-200"
      >
        <DropdownMenuLabel className="flex items-center justify-between px-3 py-2">
          <button
            onClick={handleApply}
            className="text-xs text-blue-600 hover:text-blue-700 font-semibold"
          >
            Apply
          </button>
          {tempSelectedTags.length > 0 && (
            <button
              onClick={handleClearAll}
              className="text-xs text-gray-500 hover:text-gray-700 font-normal"
            >
              Clear all
            </button>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="max-h-80 overflow-y-auto">
          {availableTags.length > 0 ? (
            availableTags.map((tag) => (
              <DropdownMenuCheckboxItem
                key={tag}
                checked={tempSelectedTags.includes(tag)}
                onCheckedChange={() => handleTagToggle(tag)}
                className="cursor-pointer"
              >
                <div className="flex items-center justify-between w-full">
                  <span className="flex items-center">
                    <Tag className="w-3 h-3 mr-2" />
                    {tag}
                  </span>
                  {tempSelectedTags.includes(tag) && (
                    <Check className="w-4 h-4 text-blue-600" />
                  )}
                </div>
              </DropdownMenuCheckboxItem>
            ))
          ) : (
            <div className="px-2 py-8 text-center text-sm text-gray-500">
              <Tag className="w-8 h-8 mx-auto mb-2 opacity-40" />
              <p>No tags available</p>
            </div>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TagsDropdown;
