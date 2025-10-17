import React from "react";
import { Tag } from "lucide-react";
import { cn } from "@/utils/helpers";

interface PromptCardTagsProps {
  tags: string[];
  className?: string;
}

export const PromptCardTags: React.FC<PromptCardTagsProps> = ({
  tags,
  className = "",
}) => {
  if (tags.length === 0) {
    return null;
  }

  return (
    <div
      className={cn(
        "flex gap-2 overflow-x-auto scrollbar-thin-horizontal pb-2",
        className
      )}
    >
      {tags.map((tag, i) => (
        <span
          key={`${tag}-${i}`}
          className="inline-flex items-center px-3 py-1.5 text-sm bg-blue-50 text-blue-700 rounded-full border border-blue-200 hover:bg-blue-100 transition-all duration-200 whitespace-nowrap flex-shrink-0"
        >
          <Tag className="w-4 h-4 mr-1.5" />
          {tag}
        </span>
      ))}
    </div>
  );
};
