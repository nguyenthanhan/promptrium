import React from "react";
import { Tag } from "lucide-react";
import { cn } from "@/utils/helpers";

interface PromptCardTagsProps {
  tags: string[];
  maxTags?: number;
  className?: string;
}

export const PromptCardTags: React.FC<PromptCardTagsProps> = ({
  tags,
  maxTags = 3,
  className = "",
}) => {
  if (tags.length === 0) {
    return null;
  }

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {tags.slice(0, maxTags).map((tag, i) => (
        <span
          key={`${tag}-${i}`}
          className="inline-flex items-center px-3 py-1.5 text-sm bg-blue-50 text-blue-700 rounded-full border border-blue-200 shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          <Tag className="w-4 h-4 mr-1.5" />
          {tag}
        </span>
      ))}
      {tags.length > maxTags && (
        <span className="inline-flex items-center px-3 py-1.5 text-sm text-gray-500 bg-gray-50 rounded-full border border-gray-200">
          +{tags.length - maxTags} more
        </span>
      )}
    </div>
  );
};
