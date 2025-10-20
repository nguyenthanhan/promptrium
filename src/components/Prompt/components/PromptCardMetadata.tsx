import React from "react";
import { Calendar, BarChart3 } from "lucide-react";
import { formatDate } from "@/utils/helpers";

interface PromptCardMetadataProps {
  updatedAt: number;
  usageCount: number;
  variant?: "grid" | "list";
  className?: string;
}

export const PromptCardMetadata: React.FC<PromptCardMetadataProps> = ({
  updatedAt,
  usageCount,
  variant = "grid",
  className = "",
}) => {
  const getUsageText = (count: number) => {
    return count === 1 ? "1 use" : `${count} uses`;
  };
  if (variant === "list") {
    return (
      <div
        className={`flex items-center space-x-6 text-sm text-gray-text ${className}`}
      >
        <div className="flex items-center space-x-2">
          <Calendar className="w-5 h-5" />
          <span>{formatDate(updatedAt)}</span>
        </div>
        <div className="flex items-center space-x-2">
          <BarChart3 className="w-5 h-5" />
          <span>{getUsageText(usageCount)}</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex items-center justify-between text-sm text-gray-text ${className}`}
    >
      <div className="flex items-center space-x-2">
        <Calendar className="w-5 h-5" />
        <span>{formatDate(updatedAt)}</span>
      </div>
      <div className="flex items-center space-x-2">
        <BarChart3 className="w-5 h-5" />
        <span>{getUsageText(usageCount)}</span>
      </div>
    </div>
  );
};
